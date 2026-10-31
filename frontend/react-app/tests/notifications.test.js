import test from 'node:test';
import assert from 'node:assert/strict';
import { accountNotifications, cleanNotification, notificationCopy, notificationKey, notificationUnread, recentNotifications } from '../src/notifications-model.js';

const row = (id, extra = {}) => ({ id, kind: 'like', sourceId: id, parentId: 'post', actorId: 'alice', actorName: 'Alice', createdAt: 1000, readAt: 0, ...extra });
test('notification kinds map to the right workspace without inventing a read status', () => {
  assert.equal(cleanNotification(row('like')).workspace, 'feed');
  assert.equal(cleanNotification(row('save', { kind: 'event-saved', parentId: 'dashboard' })).workspace, 'community');
  assert.equal(notificationUnread(row('one')), true);
  assert.equal(notificationUnread(row('one', { readAt: 1000 })), false);
  assert.equal(notificationUnread(row('one', { readAt: 500, createdAt: 2000 })), true);
});
test('source keys are deterministic and reject unknown kinds and path traversal', () => {
  assert.equal(notificationKey({ kind: 'message', sourceId: 'm1', parentId: 'alice_bob' }), 'message_alice_bob_m1');
  for (const source of [{ kind: '__proto__', sourceId: 'a' }, { kind: 'message', sourceId: '../x' }, { kind: 'like', sourceId: 'x', parentId: 'a/b' }]) assert.throws(() => notificationKey(source));
});
test('malformed stored records and missing server timestamps are not rendered', () => {
  for (const input of [null, {}, row('x', { kind: 'admin' }), row('x', { createdAt: null }), row('x', { actorId: '' }), row('x', { sourceId: 'a/b' })]) assert.equal(cleanNotification(input), null);
  assert.equal(cleanNotification(row('x', { actorName: 'x'.repeat(300) })).actorName.length, 120);
});
test('workspace and unread filters do not lose independent event IDs', () => {
  const rows = [row('a'), row('b', { kind: 'event-saved', parentId: 'dashboard', createdAt: 3000 }), row('c', { readAt: 1000 }), row('a', { createdAt: 2000 })];
  assert.deepEqual(recentNotifications(rows).map(item => item.id), ['b','a','c']);
  assert.deepEqual(recentNotifications(rows, 'feed', true).map(item => item.id), ['a']);
  assert.deepEqual(recentNotifications(rows, 'community').map(item => item.id), ['b']);
});
test('the recent inbox is bounded to 50 rows', () => {
  assert.equal(recentNotifications(Array.from({ length: 70 }, (_, i) => row(`n${i}`, { createdAt: i + 1 }))).length, 50);
});
test('saved-event alerts are new real activity, not migrations, unknown titles or removals', () => {
  const saved = { type: 'saved', title: 'Study group', at: '2026-10-31T01:00:00.000Z' };
  const events = [{ id: 4, title: 'Study group' }];
  const next = { activity: [saved, { ...saved, type: 'removed' }, { ...saved, title: 'Unknown' }] };
  assert.deepEqual(accountNotifications('dashboard', null, next, events), [{ kind: 'event-saved', parentId: 'dashboard', sourceId: '4_1793408400000', title: 'Study group' }]);
  assert.deepEqual(accountNotifications('dashboard', { activity: [saved] }, next, events), []);
});
test('only newly earned milestones above the initial badge generate alerts', () => {
  const next = { earned: [{ id: 'explorer' }, { id: 'scout' }, { id: 'unknown' }] };
  assert.deepEqual(accountNotifications('badges', null, next, []), [{ kind: 'badge', parentId: 'badges', sourceId: 'scout', title: 'Campus Scout' }]);
  assert.deepEqual(accountNotifications('badges', next, next, []), []);
  assert.deepEqual(accountNotifications('profile', null, {}, []), []);
});
test('notification text does not expose a private message body or anonymous suggestion owner', () => {
  assert.equal(notificationCopy(cleanNotification(row('m', { kind: 'message', body: 'private text' }))).detail, 'Private conversation');
  const review = notificationCopy(cleanNotification(row('s', { kind: 'suggestion-approved', title: 'Film night' })));
  assert.equal(review.heading, 'Your suggestion was approved'); assert.equal(review.detail, 'Film night');
});
