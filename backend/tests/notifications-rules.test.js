import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';

let env;
before(async () => {
  const endpoint = new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}`);
  env = await initializeTestEnvironment({ projectId: 'demo-campusvibe-feed', firestore: { host: endpoint.hostname, port: Number(endpoint.port), rules: readFileSync(new URL('../firebase/firestore.rules', import.meta.url), 'utf8') } });
});
beforeEach(() => env.clearFirestore());
after(async () => { if (env) { await env.clearFirestore(); await env.cleanup(); } });
const db = uid => env.authenticatedContext(uid).firestore();
const notification = (kind = 'like', sourceId = 'alice_like', parentId = 'p', extra = {}) => ({ kind, sourceId, parentId, actorId: 'alice', actorName: 'Alice', title: '', createdAt: serverTimestamp(), ...extra });
const inbox = (database, uid, data) => doc(database, 'campusAccountData', uid, 'notifications', `${data.kind}_${data.parentId}_${data.sourceId}`);
const post = (uid = 'bob') => ({ authorId: uid, authorName: uid, college: 'Test College', body: 'Test post', event: null, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
async function seed(path, value) { await env.withSecurityRulesDisabled(context => setDoc(doc(context.firestore(), ...path), value)); }
async function makePost(uid = 'bob') { await setDoc(doc(db(uid), 'campusFeedPosts', 'p'), post(uid)); }
function reaction(database = db('alice'), recipient = 'bob', extra = {}) {
  const batch = writeBatch(database), data = notification('like', 'alice_like', 'p', extra);
  batch.set(doc(database, 'campusFeedPosts', 'p', 'reactions', 'alice_like'), { uid: 'alice', kind: 'like', createdAt: serverTimestamp() });
  batch.set(inbox(database, recipient, data), data, { merge: true });
  return batch.commit();
}

test('recipient can read bounded private notifications; sender, strangers and guests cannot', async () => {
  await makePost(); await assertSucceeds(reaction());
  const data = notification();
  await assertSucceeds(getDoc(inbox(db('bob'), 'bob', data)));
  for (const database of [db('alice'), db('mallory'), env.unauthenticatedContext().firestore(), env.authenticatedContext('bob', { firebase: { sign_in_provider: 'anonymous' } }).firestore()]) await assertFails(getDoc(inbox(database, 'bob', data)));
  await assertSucceeds(getDocs(query(collection(db('bob'), 'campusAccountData', 'bob', 'notifications'), limit(50))));
  await assertFails(getDocs(collection(db('bob'), 'campusAccountData', 'bob', 'notifications')));
  await assertFails(getDocs(query(collection(db('bob'), 'campusAccountData', 'bob', 'notifications'), limit(51))));
});
test('notification cannot be forged without its new atomic source or addressed to a third party', async () => {
  await makePost();
  await assertFails(setDoc(inbox(db('alice'), 'bob', notification()), notification()));
  await assertFails(reaction(db('alice'), 'mallory'));
  assert.equal((await getDoc(doc(db('bob'), 'campusFeedPosts', 'p', 'reactions', 'alice_like'))).exists(), false);
  await assertFails(reaction(db('alice'), 'bob', { actorId: 'bob' }));
  await assertFails(reaction(db('alice'), 'bob', { body: 'private message preview' }));
  await assertFails(reaction(db('alice'), 'bob', { readAt: Timestamp.fromMillis(1) }));
  await assertFails(reaction(db('alice'), 'bob', { kind: 'admin' }));
});
test('only recipient marks read; future times, content changes and read-state rollback are rejected', async () => {
  await makePost(); await reaction();
  const data = notification(), own = inbox(db('bob'), 'bob', data), stamp = (await getDoc(own)).data().createdAt;
  await assertFails(updateDoc(inbox(db('alice'), 'bob', data), { readAt: stamp }));
  await assertFails(updateDoc(own, { title: 'Rewritten', readAt: stamp }));
  await assertFails(updateDoc(own, { readAt: Timestamp.fromMillis(Date.now() + 86400000) }));
  await assertSucceeds(updateDoc(own, { readAt: stamp }));
  await assertFails(updateDoc(own, { readAt: Timestamp.fromMillis(1) }));
  await assertFails(deleteDoc(inbox(db('alice'), 'bob', data)));
});
test('fresh activity updates one deterministic row without clearing recipient readAt', async () => {
  await makePost(); await reaction();
  const data = notification(), own = inbox(db('bob'), 'bob', data), before = (await getDoc(own)).data().createdAt;
  await updateDoc(own, { readAt: before });
  await assertFails(setDoc(inbox(db('alice'), 'bob', data), data, { merge: true }));
  await deleteDoc(doc(db('alice'), 'campusFeedPosts', 'p', 'reactions', 'alice_like'));
  await reaction();
  const after = (await getDoc(own)).data();
  assert.equal(after.readAt.isEqual(before), true); assert.ok(after.createdAt.toMillis() > after.readAt.toMillis());
  await assertSucceeds(updateDoc(own, { readAt: before }));
  assert.equal((await getDocs(query(collection(db('bob'), 'campusAccountData', 'bob', 'notifications'), limit(50)))).size, 1);
});
test('comment receipt must match the current comment author and post owner', async () => {
  await makePost(); const database = db('alice'), batch = writeBatch(database), data = notification('comment', 'c1');
  batch.set(doc(database, 'campusFeedPosts', 'p', 'comments', 'c1'), { uid: 'alice', name: 'Alice', body: 'A comment', createdAt: serverTimestamp() });
  batch.set(inbox(database, 'bob', data), data);
  await assertSucceeds(batch.commit());
  await assertFails(setDoc(inbox(db('mallory'), 'bob', { ...data, sourceId: 'c2' }), { ...data, sourceId: 'c2', actorId: 'mallory' }));
});
test('friend request and acceptance alert only the correct participants', async () => {
  await seed(['campusFeedProfiles','bob'], { name: 'Bob', college: '', updatedAt: Timestamp.now() });
  const database = db('alice'), batch = writeBatch(database), data = notification('friend-request','alice_bob','');
  batch.set(doc(database,'campusFeedConnections','alice_bob'), { senderId:'alice',recipientId:'bob',members:['alice','bob'],status:'pending',createdAt:serverTimestamp(),updatedAt:serverTimestamp() });
  batch.set(inbox(database,'bob',data),data); await assertSucceeds(batch.commit());
  const bob = db('bob'), accepted = notification('friend-accepted','alice_bob','',{ actorId:'bob',actorName:'Bob' }), acceptance = writeBatch(bob);
  acceptance.update(doc(bob,'campusFeedConnections','alice_bob'),{status:'accepted',updatedAt:serverTimestamp()});
  acceptance.set(inbox(bob,'alice',accepted),accepted); await assertSucceeds(acceptance.commit());
  await assertFails(setDoc(inbox(db('bob'),'mallory',accepted),accepted));
});
test('message notification is private, atomic and limited to accepted conversation members', async () => {
  await seed(['campusFeedConnections','alice_bob'], { senderId:'alice',recipientId:'bob',members:['alice','bob'],status:'accepted',createdAt:Timestamp.now(),updatedAt:Timestamp.now() });
  const database = db('alice'), batch = writeBatch(database), data = notification('message','m1','alice_bob');
  batch.set(doc(database,'campusFeedConnections','alice_bob','messages','m1'),{senderId:'alice',body:'Private message',createdAt:serverTimestamp()});
  batch.set(inbox(database,'bob',data),data); await assertSucceeds(batch.commit());
  const forged = writeBatch(database), wrong = notification('message','m2','alice_bob');
  forged.set(doc(database,'campusFeedConnections','alice_bob','messages','m2'),{senderId:'alice',body:'Not for Mallory',createdAt:serverTimestamp()});
  forged.set(inbox(database,'mallory',wrong),wrong); await assertFails(forged.commit());
});
test('own post confirmation requires a new real post from the same owner', async () => {
  const database=db('alice'), batch=writeBatch(database), data=notification('post-published','p','');
  batch.set(doc(database,'campusFeedPosts','p'),post('alice'));batch.set(inbox(database,'alice',data),data);
  await assertSucceeds(batch.commit());
  await assertFails(setDoc(inbox(database,'bob',data),data));
});
test('Community save and badge receipts require same-owner account writes', async () => {
  for(const [kind,section] of [['event-saved','dashboard'],['badge','badges']]) {
    const database=db('alice'), data=notification(kind,'milestone',section,{title:'My progress'});
    await assertFails(setDoc(inbox(database,'alice',data),data));
    const batch=writeBatch(database);batch.set(doc(database,'campusAccountData','alice','state',section),{version:1,value:'{}',updatedAt:serverTimestamp()});
    batch.set(inbox(database,'alice',data),data);await assertSucceeds(batch.commit());
    await assertFails(setDoc(inbox(database,'bob',data),data));
  }
});
test('suggestion receipts preserve anonymous ownership and follow an actual review decision', async () => {
  const database=db('alice'), batch=writeBatch(database), data=notification('suggestion-sent','idea','suggestion',{title:'Film night'});
  batch.set(doc(database,'campusSuggestionOwners','idea'),{uid:'alice',createdAt:serverTimestamp()});
  batch.set(doc(database,'campusSuggestions','idea'),{name:'Film night',host:'',authorName:'',anonymous:true,category:'Arts',date:'',location:'',description:'A film night',createdAt:serverTimestamp(),status:'pending',reviewNote:'',reviewerId:'',reviewedAt:null});
  batch.set(inbox(database,'alice',data),data);await assertSucceeds(batch.commit());
  const approved=notification('suggestion-approved','idea','suggestion',{title:'Film night'});
  await assertFails(setDoc(inbox(database,'alice',approved),approved));
  await seed(['campusSuggestionReviewers','reviewer'],{enabled:true});
  await updateDoc(doc(db('reviewer'),'campusSuggestions','idea'),{status:'approved',reviewNote:'Good idea',reviewerId:'reviewer',reviewedAt:serverTimestamp()});
  await assertFails(getDoc(doc(db('reviewer'),'campusSuggestionOwners','idea')));
  const reviewedAt=(await getDoc(doc(database,'campusSuggestions','idea'))).data().reviewedAt;
  await assertSucceeds(setDoc(inbox(database,'alice',approved),{...approved,createdAt:reviewedAt}));
  await assertFails(setDoc(inbox(db('reviewer'),'alice',approved),{...approved,actorId:'reviewer',createdAt:reviewedAt}));
  const wrong=notification('suggestion-declined','idea','suggestion',{title:'Film night',createdAt:reviewedAt});
  await assertFails(setDoc(inbox(database,'alice',wrong),wrong));
});
