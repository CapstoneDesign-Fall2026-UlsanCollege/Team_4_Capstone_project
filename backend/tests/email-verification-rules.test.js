import { before, beforeEach, after, test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc } from 'firebase/firestore';

let env;
before(async () => {
  const endpoint = new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080'}`);
  env = await initializeTestEnvironment({ projectId: 'demo-campusvibe-feed', firestore: {
    host: endpoint.hostname, port: Number(endpoint.port),
    rules: await readFile(new URL('../firebase/firestore.rules', import.meta.url), 'utf8'),
  } });
});
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async context => {
    const db = context.firestore();
    await setDoc(doc(db, 'campusPublishedEvents', 'published'), { id: 1000, title: 'Verification fixture' });
    await setDoc(doc(db, 'campusFeedProfiles', 'alice'), { name: 'Alice' });
    await setDoc(doc(db, 'campusAccountData', 'alice', 'state', 'profile'), { version: 1, value: '{}' });
    await setDoc(doc(db, 'campusSuggestionReviewers', 'alice'), { enabled: true });
  });
});
after(async () => { await env?.cleanup(); });

async function assertBlocked(db) {
  await assertFails(getDoc(doc(db, 'campusPublishedEvents', 'published')));
  await assertFails(getDocs(query(collection(db, 'campusPublishedEvents'), limit(1))));
  await assertFails(getDoc(doc(db, 'campusFeedProfiles', 'alice')));
  await assertFails(getDoc(doc(db, 'campusAccountData', 'alice', 'state', 'profile')));
  await assertFails(getDoc(doc(db, 'campusSuggestionReviewers', 'alice')));
  await assertFails(setDoc(doc(db, 'campusAccountData', 'alice', 'state', 'profile'), { version: 1, value: '{}', updatedAt: serverTimestamp() }));
  await assertFails(setDoc(doc(db, 'campusFeedPosts', 'verification-fixture'), {
    authorId: 'alice', authorName: 'Alice', college: 'Test College', body: 'Test post', event: null,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  }));
}

test('an unverified password account cannot read shared or private data, publish, or use its reviewer role', async () => {
  await assertBlocked(env.authenticatedContext('alice', { email_verified: false, firebase: { sign_in_provider: 'password' } }).firestore());
});
test('missing and truthy non-boolean verification claims fail closed', async () => {
  for (const claims of [{}, { email_verified: 'true' }, { email_verified: 1 }]) await assertBlocked(env.authenticatedContext('alice', claims).firestore());
});
test('an anonymous account remains blocked even with a verified claim', async () => {
  await assertBlocked(env.authenticatedContext('alice', { email_verified: true, firebase: { sign_in_provider: 'anonymous' } }).firestore());
});
test('verified password and Google accounts can use their own member data while ownership stays enforced', async () => {
  for (const provider of ['password', 'google.com']) {
    const db = env.authenticatedContext('alice', { email_verified: true, firebase: { sign_in_provider: provider } }).firestore();
    await assertSucceeds(getDoc(doc(db, 'campusPublishedEvents', 'published')));
    await assertSucceeds(getDoc(doc(db, 'campusAccountData', 'alice', 'state', 'profile')));
    await assertSucceeds(setDoc(doc(db, 'campusAccountData', 'alice', 'state', 'profile'), { version: 1, value: '{}', updatedAt: serverTimestamp() }));
    await assertFails(getDoc(doc(db, 'campusAccountData', 'bob', 'state', 'profile')));
  }
});
