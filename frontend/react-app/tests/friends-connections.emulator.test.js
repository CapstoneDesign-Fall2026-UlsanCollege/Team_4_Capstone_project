import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { initializeTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import * as firestore from 'firebase/firestore';

const source = await readFile(new URL('../src/shared-friends-store.js', import.meta.url), 'utf8');
const watcherSource = source.slice(source.indexOf('export function watchConnections'), source.indexOf('export function requestFriend')).replace('export function', 'function');

test('real Firestore watcher includes 225 private connections, follows page-boundary changes, and enforces rules', { timeout: 45000 }, async () => {
  const endpoint = new URL(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}`);
  const env = await initializeTestEnvironment({ projectId: 'demo-campusvibe-friends', firestore: { host: endpoint.hostname, port: Number(endpoint.port), rules: await readFile(new URL('../../../backend/firebase/firestore.rules', import.meta.url), 'utf8') } });
  let stop;
  try {
    await env.clearFirestore();
    await env.withSecurityRulesDisabled(async context => {
      const db = context.firestore(), batch = firestore.writeBatch(db);
      for (let i = 0; i < 225; i++) {
        const contact = `contact-${String(i).padStart(4, '0')}`;
        batch.set(firestore.doc(db, 'campusFeedConnections', `owner_${contact}`), { members: ['owner', contact], senderId: 'owner', recipientId: contact, status: i === 224 ? 'pending' : 'accepted', createdAt: firestore.serverTimestamp(), updatedAt: firestore.serverTimestamp() });
      }
      batch.set(firestore.doc(db, 'campusFeedConnections', 'private_other'), { members: ['private', 'other'], status: 'accepted' });
      await batch.commit();
    });
    const db = env.authenticatedContext('owner', { email_verified: true }).firestore();
    let latest, failure;
    const context = vm.createContext({ ...firestore, db, account: user => user.id, feedError: error => error });
    vm.runInContext(watcherSource, context);
    stop = context.watchConnections({ id: 'owner' }, (items, metadata) => { latest = { items: Array.from(items), metadata }; }, error => { failure = error; });
    const waitFor = async predicate => { const deadline = Date.now() + 15000; while (!predicate()) { if (failure) throw failure; if (Date.now() > deadline) throw new Error(`Timed out; received ${latest?.items.length} records`); await new Promise(resolve => setTimeout(resolve, 50)); } };
    await waitFor(() => latest?.items.length === 225 && !latest.metadata.fromCache);
    assert.equal(latest.items.filter(item => item.status === 'accepted').length, 224);
    assert.equal(latest.items.find(item => item.id === 'owner_contact-0224').status, 'pending');
    assert.ok(latest.items.every(item => item.members.includes('owner')));
    await firestore.deleteDoc(firestore.doc(db, 'campusFeedConnections', 'owner_contact-0000'));
    await waitFor(() => latest?.items.length === 224 && !latest.metadata.fromCache && !latest.items.some(item => item.id === 'owner_contact-0000'));
    assert.equal(new Set(latest.items.map(item => item.id)).size, 224);
    await assertFails(firestore.getDocs(firestore.query(firestore.collection(db, 'campusFeedConnections'), firestore.where('members', 'array-contains', 'owner'))));
    await assertFails(firestore.getDoc(firestore.doc(db, 'campusFeedConnections', 'private_other')));
    assert.equal(failure, undefined);
  } finally { stop?.(); await env.clearFirestore(); await env.cleanup(); }
});
