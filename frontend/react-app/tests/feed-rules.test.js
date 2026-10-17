import { after, before, beforeEach, test } from "node:test";
import { readFileSync } from "node:fs";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore";

let env;
before(async () => {
  const endpoint=new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080'}`);
  env = await initializeTestEnvironment({ projectId: "demo-campusvibe-feed", firestore: { host: endpoint.hostname, port: Number(endpoint.port), rules: readFileSync(new URL("../../../firestore.rules", import.meta.url), "utf8") } });
});
beforeEach(async () => env.clearFirestore());
after(async () => {
  if (!env) return;
  try { await env.clearFirestore(); }
  finally { await env.cleanup(); }
});
const db = uid => env.authenticatedContext(uid).firestore();
const ref = (database, id = "post") => doc(database, "campusFeedPosts", id);
const post = (uid = "alice", extra = {}) => ({ authorId: uid, authorName: "Alice", college: "Ulsan College", body: "A real shared text post", event: null, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), ...extra });

const suggestion = (extra = {}) => ({ name: 'Campus film night', host: 'Film Club', authorName: 'Alice', anonymous: false, category: 'Arts', date: '2026-11-10', location: 'Campus lawn', description: 'A student film night.', createdAt: serverTimestamp(), status: 'pending', reviewNote: '', reviewerId: '', reviewedAt: null, ...extra });
function suggest(database, uid = 'alice', extra = {}, id = 'idea') {
  const batch = writeBatch(database);
  batch.set(doc(database, 'campusSuggestionOwners', id), { uid, createdAt: serverTimestamp() });
  batch.set(doc(database, 'campusSuggestions', id), suggestion(extra));
  return batch.commit();
}
async function grantReviewer(uid = 'reviewer') {
  await env.withSecurityRulesDisabled(context => setDoc(doc(context.firestore(), 'campusSuggestionReviewers', uid), { enabled: true }));
}

test('private account records survive owner reads but cannot be accessed by another account or guest',async()=>{
  const path=database=>doc(database,'campusAccountData','alice','state','profile');
  const value={version:1,value:JSON.stringify({bio:'Private profile'}),updatedAt:serverTimestamp()};
  await assertSucceeds(setDoc(path(db('alice')),value));
  await assertSucceeds(getDoc(path(db('alice'))));
  await assertFails(getDoc(path(db('bob'))));
  await assertFails(setDoc(path(db('bob')),value));
  await assertFails(getDoc(path(env.unauthenticatedContext().firestore())));
  await assertFails(getDoc(path(env.authenticatedContext('alice',{firebase:{sign_in_provider:'anonymous'}}).firestore())));
});

test('account records reject unknown sections, oversized values, extra fields, fake timestamps, listing and deletion',async()=>{
  const database=db('alice'),base=['campusAccountData','alice','state'];
  const value={version:1,value:'{}',updatedAt:serverTimestamp()};
  await assertFails(setDoc(doc(database,...base,'roles'),value));
  await assertFails(setDoc(doc(database,...base,'saved'),{...value,admin:true}));
  await assertFails(setDoc(doc(database,...base,'saved'),{...value,value:'x'.repeat(20001)}));
  await assertFails(setDoc(doc(database,...base,'assistant'),{...value,value:'x'.repeat(200001)}));
  await assertFails(setDoc(doc(database,...base,'profile'),{...value,updatedAt:Timestamp.fromMillis(1)}));
  for(const name of ['profile','saved','dashboard','badges','suggestion','assistant'])await assertSucceeds(setDoc(doc(database,...base,name),value));
  await assertFails(getDocs(collection(database,...base)));
  await assertFails(deleteDoc(doc(database,...base,'profile')));
});

test('suggestions require an authenticated owner and an atomic private receipt', async () => {
  await assertSucceeds(getDoc(doc(db('alice'), 'campusSuggestionOwners', 'missing')));
  await assertFails(setDoc(doc(db('alice'), 'campusSuggestions', 'unpaired'), suggestion()));
  await assertFails(suggest(db('mallory'), 'alice'));
  await assertFails(suggest(env.unauthenticatedContext().firestore()));
  await assertFails(suggest(env.authenticatedContext('guest', { firebase: { sign_in_provider: 'anonymous' } }).firestore(), 'guest'));
  await assertFails(suggest(db('alice'), 'alice', { ownerId: 'alice' }));
  await assertFails(suggest(db('alice'), 'alice', { description: 'x'.repeat(501) }));
  await assertFails(suggest(db('alice'), 'alice', { status: 'approved' }));
  await assertFails(suggest(db('alice'), 'alice', { anonymous: true }));
  await assertSucceeds(suggest(db('alice')));
  await assertFails(suggest(db('alice')));
});

test('anonymous queue records hide ownership from reviewers and other students', async () => {
  await grantReviewer();
  await assertSucceeds(suggest(db('alice'), 'alice', { anonymous: true, host: '', authorName: '' }));
  await assertSucceeds(getDoc(doc(db('reviewer'), 'campusSuggestions', 'idea')));
  await assertFails(getDoc(doc(db('reviewer'), 'campusSuggestionOwners', 'idea')));
  await assertFails(getDoc(doc(db('bob'), 'campusSuggestionOwners', 'idea')));
  await assertFails(getDoc(doc(db('bob'), 'campusSuggestions', 'idea')));
  await assertSucceeds(getDoc(doc(db('alice'), 'campusSuggestions', 'idea')));
  await assertSucceeds(getDocs(query(collection(db('alice'), 'campusSuggestionOwners'), where('uid','==','alice'), limit(50))));
  await assertFails(getDocs(query(collection(db('bob'), 'campusSuggestionOwners'), limit(50))));
  await assertFails(deleteDoc(doc(db('alice'), 'campusSuggestionOwners', 'idea')));
});

test('reviewer roles cannot be self-granted and queue reads are bounded', async () => {
  await assertFails(setDoc(doc(db('alice'), 'campusSuggestionReviewers', 'alice'), { enabled: true }));
  await grantReviewer();
  await suggest(db('alice'));
  await assertSucceeds(getDoc(doc(db('reviewer'), 'campusSuggestionReviewers', 'reviewer')));
  await assertFails(getDoc(doc(db('alice'), 'campusSuggestionReviewers', 'reviewer')));
  await assertSucceeds(getDocs(query(collection(db('reviewer'), 'campusSuggestions'), orderBy('createdAt','desc'), limit(100))));
  await assertFails(getDocs(query(collection(db('reviewer'), 'campusSuggestions'), limit(101))));
  await assertFails(getDocs(collection(db('reviewer'), 'campusSuggestions')));
  await assertFails(getDocs(query(collection(db('alice'), 'campusSuggestions'), limit(100))));
});

test('only reviewers decide once and cannot rewrite an idea or its identity', async () => {
  await grantReviewer();
  await suggest(db('alice'));
  const target = database => doc(database, 'campusSuggestions', 'idea');
  const decision = { status: 'approved', reviewNote: 'Ready for planning', reviewerId: 'reviewer', reviewedAt: serverTimestamp() };
  await assertFails(updateDoc(target(db('alice')), decision));
  await assertFails(updateDoc(target(db('reviewer')), { ...decision, name: 'Changed idea' }));
  await assertFails(updateDoc(target(db('reviewer')), { ...decision, reviewerId: 'alice' }));
  await assertFails(updateDoc(target(db('reviewer')), { ...decision, reviewNote: 'x'.repeat(501) }));
  await assertSucceeds(updateDoc(target(db('reviewer')), decision));
  await assertSucceeds(getDoc(target(db('alice'))));
  await assertFails(updateDoc(target(db('reviewer')), { ...decision, status: 'declined' }));
  await assertFails(deleteDoc(target(db('alice'))));
});

test("public feed profiles expose only bounded display data and are owner-written", async () => {
  const profile = doc(db('alice'), 'campusFeedProfiles', 'alice');
  const value = { name: 'Alice', college: 'Test Campus', updatedAt: serverTimestamp() };
  await assertSucceeds(setDoc(profile, value));
  await assertSucceeds(getDoc(doc(db('bob'), 'campusFeedProfiles', 'alice')));
  await assertFails(setDoc(doc(db('bob'), 'campusFeedProfiles', 'alice'), value));
  await assertFails(setDoc(profile, { ...value, email: 'private@example.com' }));
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'campusFeedProfiles', 'alice')));
});

test('profile thumbnails allow member reads, owner replacement/removal, but no directory listing or impersonation', async () => {
  const photo = database => doc(database, 'campusProfilePhotos', 'alice');
  const value = { photo: 'data:image/jpeg;base64,/9j/AAAA==', updatedAt: serverTimestamp() };
  await assertSucceeds(setDoc(photo(db('alice')), value));
  await assertSucceeds(getDoc(photo(db('bob'))));
  await assertFails(setDoc(photo(db('bob')), value));
  await assertFails(deleteDoc(photo(db('bob'))));
  await assertFails(getDocs(query(collection(db('alice'), 'campusProfilePhotos'), limit(100))));
  await assertFails(getDoc(photo(env.unauthenticatedContext().firestore())));
  const anonymous = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'anonymous' } }).firestore();
  await assertFails(getDoc(photo(anonymous)));
  await assertFails(setDoc(photo(anonymous), value));
  for (const invalid of [42, 'https://example.com/photo.jpg', 'data:image/svg+xml;base64,AAAA', `data:image/jpeg;base64,/9j/${'A'.repeat(16384)}`]) await assertFails(setDoc(photo(db('alice')), { ...value, photo: invalid }));
  await assertFails(setDoc(photo(db('alice')), { ...value, email: 'private@example.com' }));
  await assertFails(setDoc(photo(db('alice')), { ...value, updatedAt: Timestamp.fromMillis(1) }));
  await assertSucceeds(setDoc(photo(db('alice')), { ...value, photo: 'data:image/jpeg;base64,/9j/BBBB==' }));
  await assertSucceeds(deleteDoc(photo(db('alice'))));
});

test("authenticated author publishes and another account reads the shared post", async () => {
  await assertSucceeds(setDoc(ref(db("alice")), post()));
  await assertSucceeds(getDoc(ref(db("bob"))));
  await assertSucceeds(getDocs(query(collection(db("bob"), "campusFeedPosts"), orderBy("createdAt", "desc"), limit(50))));
});

test('reactions are uniquely keyed to the actor and cannot alter another user reaction', async () => {
  await setDoc(ref(db('alice')), post());
  const reaction = database => doc(database, 'campusFeedPosts', 'post', 'reactions', 'bob_like');
  const value = { uid: 'bob', kind: 'like', createdAt: serverTimestamp() };
  await assertSucceeds(setDoc(reaction(db('bob')), value));
  await assertFails(setDoc(reaction(db('mallory')), value));
  await assertFails(deleteDoc(reaction(db('mallory'))));
  await assertFails(setDoc(doc(db('bob'), 'campusFeedPosts', 'post', 'reactions', 'duplicate'), value));
  await assertSucceeds(deleteDoc(reaction(db('bob'))));
});

test('comments reject impersonation and outsiders cannot delete them', async () => {
  await setDoc(ref(db('alice')), post());
  const comment = database => doc(database, 'campusFeedPosts', 'post', 'comments', 'comment');
  const value = { uid: 'bob', name: 'Bob', body: 'Real comment', createdAt: serverTimestamp() };
  await assertFails(setDoc(comment(db('mallory')), value));
  await assertSucceeds(setDoc(comment(db('bob')), value));
  await assertFails(updateDoc(comment(db('bob')), { uid: 'alice' }));
  await assertFails(deleteDoc(comment(db('mallory'))));
  await assertFails(setDoc(comment(db('bob')), { ...value, body: 'x'.repeat(501) }));
  await assertSucceeds(deleteDoc(comment(db('alice'))));
});

test('saved posts belong only to their owner and require an existing post', async () => {
  await setDoc(ref(db('alice')), post());
  const saved = database => doc(database, 'campusFeedProfiles', 'bob', 'savedPosts', 'post');
  await assertSucceeds(setDoc(saved(db('bob')), { createdAt: serverTimestamp() }));
  await assertFails(updateDoc(saved(db('bob')), { createdAt: serverTimestamp() }));
  await assertFails(getDoc(saved(db('alice'))));
  await assertFails(deleteDoc(saved(db('alice'))));
  await assertSucceeds(deleteDoc(saved(db('bob'))));
  await assertFails(setDoc(doc(db('bob'), 'campusFeedProfiles', 'bob', 'savedPosts', 'missing'), { createdAt: serverTimestamp() }));
});

test('friend requests require real recipients and only the recipient can accept', async () => {
  await setDoc(doc(db('bob'), 'campusFeedProfiles', 'bob'), { name: 'Bob', college: '', updatedAt: serverTimestamp() });
  const request = database => doc(database, 'campusFeedConnections', 'alice_bob');
  const value = { senderId: 'alice', recipientId: 'bob', members: ['alice','bob'], status: 'pending', createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  await assertFails(setDoc(request(db('mallory')), value));
  await assertSucceeds(setDoc(request(db('alice')), value));
  await assertFails(setDoc(doc(db('bob'), 'campusFeedConnections', 'bob_alice'), { ...value, senderId: 'bob', recipientId: 'alice', members: ['bob','alice'] }));
  await assertFails(getDoc(request(db('mallory'))));
  await assertFails(updateDoc(request(db('alice')), { status: 'accepted', updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(request(db('bob')), { members: ['bob','mallory'], status: 'accepted', updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(request(db('bob')), { status: 'accepted', updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(request(db('mallory'))));
  await assertSucceeds(deleteDoc(request(db('alice'))));
  await assertFails(setDoc(request(db('alice')), { ...value, status: 'accepted' }));
});

test('messages are private to accepted friends, actor-owned and immutable', async () => {
  await setDoc(doc(db('bob'), 'campusFeedProfiles', 'bob'), { name: 'Bob', college: '', updatedAt: serverTimestamp() });
  const connection = database => doc(database, 'campusFeedConnections', 'alice_bob');
  await setDoc(connection(db('alice')), { senderId: 'alice', recipientId: 'bob', members: ['alice','bob'], status: 'pending', createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  const message = database => doc(database, 'campusFeedConnections', 'alice_bob', 'messages', 'one');
  const value = { senderId: 'alice', body: 'Hello Bob', createdAt: serverTimestamp() };
  await assertFails(setDoc(message(db('alice')), value));
  await updateDoc(connection(db('bob')), { status: 'accepted', updatedAt: serverTimestamp() });
  await assertFails(setDoc(message(db('bob')), value));
  await assertSucceeds(setDoc(message(db('alice')), value));
  await assertSucceeds(getDoc(message(db('bob'))));
  await assertSucceeds(getDocs(query(collection(db('bob'), 'campusFeedConnections', 'alice_bob', 'messages'), orderBy('createdAt','desc'), limit(50))));
  await assertFails(getDocs(query(collection(db('mallory'), 'campusFeedConnections', 'alice_bob', 'messages'), limit(50))));
  await assertFails(getDocs(query(collection(db('bob'), 'campusFeedConnections', 'alice_bob', 'messages'), limit(51))));
  await assertFails(getDoc(message(db('mallory'))));
  await assertFails(getDoc(message(env.unauthenticatedContext().firestore())));
  await assertFails(updateDoc(message(db('alice')), { body: 'Edited' }));
  await assertFails(deleteDoc(message(db('bob'))));
  await assertFails(setDoc(doc(db('alice'), 'campusFeedConnections','alice_bob','messages','huge'), { ...value, body: 'x'.repeat(2001) }));
  const receipt = database => doc(database, 'campusFeedConnections', 'alice_bob', 'reads', 'bob');
  await assertFails(setDoc(receipt(db('alice')), { readAt: serverTimestamp() }));
  await assertSucceeds(setDoc(receipt(db('bob')), { readAt: serverTimestamp() }));
  await deleteDoc(connection(db('bob')));
  await assertFails(getDoc(message(db('alice'))));
  await assertFails(setDoc(message(db('alice')), value));
});
test("signed-out and anonymous clients cannot access shared posts", async () => {
  await assertFails(setDoc(ref(env.unauthenticatedContext().firestore()), post()));
  await assertFails(getDoc(ref(env.unauthenticatedContext().firestore())));
  const anonymous = env.authenticatedContext("guest", { firebase: { sign_in_provider: "anonymous" } }).firestore();
  await assertFails(setDoc(ref(anonymous), post("guest")));
  await assertFails(getDoc(ref(anonymous)));
});
test("author identity spoofing, extra fields, photos and oversized text are rejected", async () => {
  const alice = db("alice");
  await assertFails(setDoc(ref(alice), post("bob")));
  await assertFails(setDoc(ref(alice), post("alice", { images: [] })));
  await assertFails(setDoc(ref(alice), post("alice", { likes: ["bob"] })));
  await assertFails(setDoc(ref(alice), post("alice", { body: "x".repeat(2001) })));
  await assertFails(setDoc(ref(alice), post("alice", { college: "" })));
  await assertFails(setDoc(ref(alice), post("alice", { body: "" })));
});
test("only the author may edit or delete, and author/timestamps stay immutable", async () => {
  const alice = db("alice"), bob = db("bob");
  await assertSucceeds(setDoc(ref(alice), post()));
  await assertFails(updateDoc(ref(bob), { body: "Someone else's edit", updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(ref(bob)));
  await assertFails(updateDoc(ref(alice), { authorId: "bob", updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref(alice), { authorName: "Bob", updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref(alice), { createdAt: Timestamp.fromMillis(0), updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(ref(alice), { body: "Updated by Alice", updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(ref(alice)));
  await assertSucceeds(updateDoc(ref(alice), { deleting: true, updatedAt: serverTimestamp() }));
  await assertSucceeds(deleteDoc(ref(alice)));
});

test('post deletion is author-only, irreversible and blocks new child records, edits and bookmarks', async () => {
  const alice=db('alice'), bob=db('bob');
  await setDoc(ref(alice),post());
  const mark={deleting:true,updatedAt:serverTimestamp()};
  await assertFails(updateDoc(ref(bob),mark));
  await assertFails(setDoc(ref(alice,'new-deleting'),post('alice',{deleting:true})));
  await assertFails(updateDoc(ref(alice),{deleting:'yes',updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(ref(alice),{...mark,body:'Changed while marking'}));
  await assertSucceeds(updateDoc(ref(alice),mark));
  await assertFails(updateDoc(ref(alice),{deleting:false,updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(ref(alice),{body:'Too late',updatedAt:serverTimestamp()}));
  await assertFails(setDoc(doc(bob,'campusFeedPosts','post','comments','late'),{uid:'bob',name:'Bob',body:'Too late',createdAt:serverTimestamp()}));
  await assertFails(setDoc(doc(bob,'campusFeedPosts','post','reactions','bob_like'),{uid:'bob',kind:'like',createdAt:serverTimestamp()}));
  await assertFails(setDoc(doc(bob,'campusFeedProfiles','bob','savedPosts','post'),{createdAt:serverTimestamp()}));
  await assertSucceeds(getDocs(query(collection(alice,'campusFeedPosts','post','comments'),limit(100))));
  await assertSucceeds(deleteDoc(doc(alice,'campusFeedPosts','post','comments','already-cleaned')));
  await assertFails(deleteDoc(ref(bob)));
  await assertSucceeds(deleteDoc(ref(alice)));
});

test('atomic writes cannot add a comment, reaction or bookmark while freezing or deleting its parent', async () => {
  const alice=db('alice');await setDoc(ref(alice),post());
  for(const child of ['comment','reaction','saved']){
    const batch=writeBatch(alice);batch.update(ref(alice),{deleting:true,updatedAt:serverTimestamp()});
    if(child === 'comment')batch.set(doc(alice,'campusFeedPosts','post','comments','late'),{uid:'alice',name:'Alice',body:'Late',createdAt:serverTimestamp()});
    if(child === 'reaction')batch.set(doc(alice,'campusFeedPosts','post','reactions','alice_like'),{uid:'alice',kind:'like',createdAt:serverTimestamp()});
    if(child === 'saved')batch.set(doc(alice,'campusFeedProfiles','alice','savedPosts','post'),{createdAt:serverTimestamp()});
    await assertFails(batch.commit());
  }
  await updateDoc(ref(alice),{deleting:true,updatedAt:serverTimestamp()});
  const batch=writeBatch(alice);batch.delete(ref(alice));batch.set(doc(alice,'campusFeedPosts','post','comments','after-delete'),{uid:'alice',name:'Alice',body:'Late',createdAt:serverTimestamp()});
  await assertFails(batch.commit());
});
test("server timestamps and bounded queries are required", async () => {
  const alice = db("alice");
  await assertFails(setDoc(ref(alice), post("alice", { createdAt: Timestamp.fromMillis(0) })));
  await assertSucceeds(setDoc(ref(alice), post()));
  await assertFails(getDocs(collection(alice, "campusFeedPosts")));
  await assertFails(getDocs(query(collection(alice, "campusFeedPosts"), limit(101))));
});
test("event-only posts are accepted; malformed or unexpected event fields are rejected", async () => {
  const alice = db("alice");
  const event = { title: "Campus meetup", date: "2026-10-20", time: "17:00", location: "Student courtyard" };
  await assertSucceeds(setDoc(ref(alice), post("alice", { body: "", event })));
  await assertFails(setDoc(ref(alice, "invalid"), post("alice", { event: { ...event, date: "2026-13-01" } })));
  await assertFails(setDoc(ref(alice, "invalid"), post("alice", { event: { ...event, time: "27:00" } })));
  await assertFails(setDoc(ref(alice, "invalid"), post("alice", { event: { ...event, location: "" } })));
  await assertFails(setDoc(ref(alice, "invalid"), post("alice", { event: { ...event, privateEmail: "no-public-emails@example.com" } })));
});
