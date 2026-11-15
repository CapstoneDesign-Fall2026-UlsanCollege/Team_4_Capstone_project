import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../src/shared-friends-store.js', import.meta.url), 'utf8');
const watcherSource = source.slice(source.indexOf('export function watchConnections'), source.indexOf('export function requestFriend')).replace('export function', 'function');
function setup() {
  const listeners = [], results = [], failures = [];
  const context = vm.createContext({
    db: {}, account: user => user.id, feedError: error => error.message,
    collection: () => 'connections', where: (...args) => ({ where: args }), orderBy: field => ({ orderBy: field }), documentId: () => '__name__', startAfter: cursor => ({ cursor }), limit: count => ({ limit: count }), query: (...parts) => parts,
    onSnapshot: (query, _options, receive, fail) => { const listener = { query, receive, fail, stopped: false }; listeners.push(listener); return () => { listener.stopped = true; }; },
  });
  vm.runInContext(watcherSource, context);
  const stop = context.watchConnections({ id: 'owner' }, (items, metadata) => results.push({ ids: Array.from(items, item => item.id), fromCache: metadata.fromCache }), error => failures.push(error));
  const emit = (index, ids, fromCache = false) => listeners[index].receive({ docs: ids.map(id => ({ id, data: () => ({ members: ['owner', id], status: 'accepted' }) })), size: ids.length, metadata: { fromCache } });
  return { listeners, results, failures, stop, emit };
}
const ids = (start, count) => Array.from({ length: count }, (_, i) => String(start + i).padStart(4, '0'));

test('loads more than 100 connections while every query stays bounded, then unsubscribes all pages', () => {
  const s = setup(); s.emit(0, ids(0, 100));
  assert.equal(s.results.at(-1).fromCache, true);
  assert.equal(s.listeners[1].query.find(p => p?.cursor).cursor, '0099');
  s.emit(1, ids(100, 100)); s.emit(2, ids(200, 25));
  assert.equal(s.results.at(-1).ids.length, 225);
  assert.equal(s.results.at(-1).fromCache, false);
  assert.ok(s.listeners.every(l => l.query.some(p => p?.limit === 100)));
  s.stop(); assert.ok(s.listeners.every(l => l.stopped));
  const count = s.results.length; s.emit(2, []); assert.equal(s.results.length, count);
});

test('rebuilds later pages when removals shift a boundary and ignores stale callbacks', () => {
  const s = setup(); s.emit(0, ids(0, 100)); s.emit(1, ids(100, 25));
  s.emit(0, ids(1, 100));
  assert.equal(s.listeners[1].stopped, true);
  assert.equal(s.listeners[2].query.find(p => p?.cursor).cursor, '0100');
  const count = s.results.length; s.emit(1, ids(100, 25)); assert.equal(s.results.length, count);
  s.emit(2, ids(101, 24));
  assert.deepEqual(s.results.at(-1).ids, ids(1, 124));
  s.emit(0, ids(1, 99)); assert.equal(s.listeners[2].stopped, true);
  assert.equal(s.results.at(-1).ids.length, 99); s.stop();
});

test('waits for server metadata on all pages and forwards page errors', () => {
  const s = setup(); s.emit(0, ids(0, 100)); s.emit(1, ids(100, 25), true);
  assert.equal(s.results.at(-1).fromCache, true);
  s.emit(1, ids(100, 25)); assert.equal(s.results.at(-1).fromCache, false);
  s.listeners[1].fail(new Error('Permission denied')); assert.deepEqual(s.failures, ['Permission denied']); s.stop();
});
