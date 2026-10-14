import { after, before, beforeEach, test } from "node:test";
import { readFileSync } from "node:fs";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";

let env;
before(async () => {
  env = await initializeTestEnvironment({ projectId: "demo-campusvibe-feed", firestore: { host: "127.0.0.1", port: 8080, rules: readFileSync(new URL("../../../firestore.rules", import.meta.url), "utf8") } });
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

test("public feed profiles expose only bounded display data and are owner-written", async () => {
  const profile = doc(db('alice'), 'campusFeedProfiles', 'alice');
  const value = { name: 'Alice', college: 'Test Campus', updatedAt: serverTimestamp() };
  await assertSucceeds(setDoc(profile, value));
  await assertSucceeds(getDoc(doc(db('bob'), 'campusFeedProfiles', 'alice')));
  await assertFails(setDoc(doc(db('bob'), 'campusFeedProfiles', 'alice'), value));
  await assertFails(setDoc(profile, { ...value, email: 'private@example.com' }));
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'campusFeedProfiles', 'alice')));
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
  await assertFails(deleteDoc(comment(db('mallory'))));
  await assertFails(setDoc(comment(db('bob')), { ...value, body: 'x'.repeat(501) }));
  await assertSucceeds(deleteDoc(comment(db('alice'))));
});

test('saved posts belong only to their owner and require an existing post', async () => {
  await setDoc(ref(db('alice')), post());
  const saved = database => doc(database, 'campusFeedProfiles', 'bob', 'savedPosts', 'post');
  await assertSucceeds(setDoc(saved(db('bob')), { createdAt: serverTimestamp() }));
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
  await assertFails(getDoc(request(db('mallory'))));
  await assertFails(updateDoc(request(db('alice')), { status: 'accepted', updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(request(db('bob')), { members: ['bob','mallory'], status: 'accepted', updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(request(db('bob')), { status: 'accepted', updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(request(db('mallory'))));
  await assertSucceeds(deleteDoc(request(db('alice'))));
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
  await assertSucceeds(deleteDoc(ref(alice)));
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
