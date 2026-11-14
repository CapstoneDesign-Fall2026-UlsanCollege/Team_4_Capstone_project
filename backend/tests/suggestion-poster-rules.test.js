import {before,after,beforeEach,test} from 'node:test';
import {readFileSync} from 'node:fs';
import {assertFails,assertSucceeds,initializeTestEnvironment} from '@firebase/rules-unit-testing';
import {doc,getDoc,setDoc,updateDoc,serverTimestamp,writeBatch} from 'firebase/firestore';
import {publicationBatch} from './published-event-fixture.js';
let env;
const imageId='01234567890123456789',id='idea',publicId=`campusvibe-suggestions/${id}/${imageId}`;
const poster={id:imageId,publicId,src:`https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${publicId}.jpg`,width:800,height:600};
const idea={name:'Campus film night',category:'Arts',host:'',authorName:'',anonymous:true,description:'A student film night.',date:'',location:'',status:'pending',reviewNote:'',reviewerId:'',reviewedAt:null};
before(async()=>{const url=new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST||'127.0.0.1:8180'}`);env=await initializeTestEnvironment({projectId:'demo-campusvibe-feed',firestore:{host:url.hostname,port:Number(url.port),rules:readFileSync(new URL('../firebase/firestore.rules',import.meta.url),'utf8')}});});
beforeEach(async()=>{await env.clearFirestore();await env.withSecurityRulesDisabled(context=>setDoc(doc(context.firestore(),'campusSuggestionReviewers','reviewer'),{enabled:true}));});
after(async()=>{if(env){await env.clearFirestore();await env.cleanup();}});
const database=uid=>env.authenticatedContext(uid, { email_verified: true }).firestore();
const claim=db=>doc(db,'campusSuggestionPhotos',imageId);
const claimData=()=>({uid:'alice',suggestionId:id,status:'active',createdAt:serverTimestamp()});
function submit(db,photo=poster){const batch=writeBatch(db);batch.set(doc(db,'campusSuggestionOwners',id),{uid:'alice',createdAt:serverTimestamp()});batch.set(doc(db,'campusSuggestions',id),{...idea,createdAt:serverTimestamp(),poster:photo});return batch.commit();}
test('poster claims are private, immutable and restricted to the signed-in owner',async()=>{
 const alice=database('alice');await assertSucceeds(setDoc(claim(alice),claimData()));
 await assertSucceeds(getDoc(claim(alice)));await assertFails(getDoc(claim(database('bob'))));await assertFails(getDoc(claim(database('reviewer'))));
 await assertFails(setDoc(claim(database('bob')),{...claimData(),uid:'bob'}));await assertFails(updateDoc(claim(alice),{suggestionId:'another'}));
 await assertFails(setDoc(claim(env.unauthenticatedContext().firestore()),claimData()));
});
test('a suggestion can attach only its active owner-bound Cloudinary poster',async()=>{
 const alice=database('alice');await assertFails(submit(alice));await setDoc(claim(alice),claimData());
 for(const photo of [{...poster,src:'https://evil.test/photo.jpg'},{...poster,publicId:'campusvibe-feed/bob/image'},{...poster,width:1281},{...poster,id:'other'}])await assertFails(submit(alice,photo));
 await assertSucceeds(submit(alice));await assertFails(updateDoc(doc(alice,'campusSuggestions',id),{poster:{...poster,width:20}}));
});
test('discard and submission cannot race to remove an attached poster',async()=>{
 const alice=database('alice');await setDoc(claim(alice),claimData());await assertSucceeds(updateDoc(claim(alice),{status:'discarded'}));await assertFails(submit(alice));
 await env.clearFirestore();await setDoc(claim(alice),claimData());await assertSucceeds(submit(alice));await assertFails(updateDoc(claim(alice),{status:'discarded'}));
});
test('reviewer publication must preserve the poster and never expose its private ownership claim',async()=>{
 const alice=database('alice'),reviewer=database('reviewer');await setDoc(claim(alice),claimData());await submit(alice);
 await assertFails(publicationBatch(reviewer,{source:idea}).commit());
 await assertFails(publicationBatch(reviewer,{source:idea,event:{poster:{...poster,width:20}}}).commit());
 await assertSucceeds(publicationBatch(reviewer,{source:idea,event:{poster}}).commit());
 await assertSucceeds(getDoc(doc(database('bob'),'campusPublishedEvents',id)));await assertFails(getDoc(claim(database('bob'))));
});
