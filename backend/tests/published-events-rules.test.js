import { before,after,beforeEach,test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertFails,assertSucceeds,initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection,doc,getDoc,getDocs,limit,orderBy,query,setDoc,serverTimestamp,Timestamp,updateDoc,deleteDoc } from 'firebase/firestore';
import { publicationBatch } from './published-event-fixture.js';
let env;
before(async()=>{
  const endpoint=new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080'}`);
  env=await initializeTestEnvironment({projectId:'demo-campusvibe-feed',firestore:{host:endpoint.hostname,port:Number(endpoint.port),rules:readFileSync(new URL('../firebase/firestore.rules',import.meta.url),'utf8')}});
});
beforeEach(async()=>{
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async context=>{
    const database=context.firestore();
    await setDoc(doc(database,'campusSuggestionReviewers','reviewer'),{enabled:true});
    await setDoc(doc(database,'campusSuggestions','idea'),{name:'Campus film night',category:'Arts',host:'Film Club',authorName:'Alice',anonymous:false,description:'A student film night.',date:'',location:'',createdAt:Timestamp.fromMillis(100),status:'pending',reviewNote:'',reviewerId:'',reviewedAt:null});
    await setDoc(doc(database,'campusSuggestionOwners','idea'),{uid:'alice',createdAt:Timestamp.fromMillis(100)});
  });
});
after(async()=>{if(env){await env.clearFirestore();await env.cleanup();}});
const db=uid=>env.authenticatedContext(uid).firestore();
const publication=database=>doc(database,'campusPublishedEvents','idea');

test('reviewer publication is atomic, visible to another student, and omits private fields',async()=>{
  await assertSucceeds(publicationBatch(db('reviewer')).commit());
  const published=(await assertSucceeds(getDoc(publication(db('bob'))))).data();
  assert.equal(published.title,'Campus film night');assert.equal(published.id,1000);
  assert.ok(!('authorName' in published) && !('reviewerId' in published) && !('reviewNote' in published));
  assert.equal((await getDoc(doc(db('alice'),'campusSuggestions','idea'))).data().publishedEventId,1000);
  await assertSucceeds(getDocs(query(collection(db('bob'),'campusPublishedEvents'),orderBy('publishedAt','desc'),limit(100))));
  await assertFails(getDoc(doc(db('bob'),'campusSuggestions','idea')));
  await assertFails(getDoc(publication(env.unauthenticatedContext().firestore())));
  await assertFails(getDoc(publication(env.authenticatedContext('guest',{firebase:{sign_in_provider:'anonymous'}}).firestore())));
  await assertFails(getDocs(collection(db('bob'),'campusPublishedEvents')));
});
test('ordinary students cannot publish, self-approve, or access allocation metadata',async()=>{
  await assertFails(publicationBatch(db('alice'),{reviewer:'alice'}).commit());
  await assertFails(getDoc(doc(db('alice'),'campusEventMetadata','publication')));
  await assertFails(setDoc(doc(db('alice'),'campusSuggestionReviewers','alice'),{enabled:true}));
  assert.equal((await getDoc(doc(db('alice'),'campusSuggestions','idea'))).data().status,'pending');
});
test('review decisions and catalogue writes must be paired with a unique allocated ID',async()=>{
  const reviewer=db('reviewer');
  await assertFails(updateDoc(doc(reviewer,'campusSuggestions','idea'),{status:'approved',reviewNote:'',reviewerId:'reviewer',reviewedAt:serverTimestamp()}));
  await assertFails(publicationBatch(reviewer,{decision:false}).commit());
  await assertFails(publicationBatch(reviewer,{allocate:false}).commit());
  await assertFails(publicationBatch(reviewer,{eventId:1001}).commit());
  assert.equal((await getDoc(doc(db('alice'),'campusSuggestions','idea'))).data().status,'pending');
  assert.equal((await getDoc(publication(reviewer))).exists(),false);
});
test('publication rejects altered suggestion content, leaked metadata, invalid dates/times and blank venues',async()=>{
  for(const event of [{title:'Different title'},{desc:'Different description'},{host:'Impersonated host'},{authorName:'Private name'},{reviewNote:'Private review'},{date:'2026-13-40'},{time:'25:60'},{location:''},{sourceSuggestionId:'elsewhere'},{id:4}]) {
    await assertFails(publicationBatch(db('reviewer'),{event}).commit());
  }
});
test('legacy approved suggestions can be published without rewriting their review; anonymous authors stay hidden',async()=>{
  const reviewedAt=Timestamp.fromMillis(200);
  await env.withSecurityRulesDisabled(async context=>updateDoc(doc(context.firestore(),'campusSuggestions','idea'),{status:'approved',anonymous:true,host:'',authorName:'',reviewerId:'previous-reviewer',reviewNote:'Original decision',reviewedAt}));
  await assertSucceeds(publicationBatch(db('reviewer'),{alreadyApproved:true,source:{anonymous:true,host:''}}).commit());
  const source=(await getDoc(doc(db('alice'),'campusSuggestions','idea'))).data();
  assert.equal(source.reviewNote,'Original decision');assert.equal(source.reviewerId,'previous-reviewer');assert.equal(source.reviewedAt.toMillis(),200);
  assert.equal((await getDoc(publication(db('bob')))).data().host,'Campus community');
});
test('published events and allocation IDs cannot be overwritten, deleted, or reused',async()=>{
  await publicationBatch(db('reviewer')).commit();
  await assertFails(publicationBatch(db('reviewer')).commit());
  await assertFails(updateDoc(publication(db('reviewer')),{title:'Changed'}));
  await assertFails(deleteDoc(publication(db('reviewer'))));
  await assertFails(setDoc(doc(db('reviewer'),'campusEventMetadata','publication'),{nextId:1001,lastSuggestionId:'unpaired',updatedAt:serverTimestamp()}));
});
