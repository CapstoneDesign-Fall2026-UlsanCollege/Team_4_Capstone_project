import { test } from 'node:test';
import assert from 'node:assert/strict';
import { catalogSnapshotStatus, catalogStatusText } from '../src/event-catalog-status.js';

test('an initial read says loading until a snapshot is received', () => {
  assert.equal(catalogStatusText({ loading: true }), 'Loading shared campus events...');
});
test('an empty offline cache ends loading without claiming the live catalogue is empty', () => {
  const status = catalogSnapshotStatus([], true);
  assert.equal(status.loading, false);
  assert.match(catalogStatusText(status), /No shared campus events are cached/);
  assert.match(catalogStatusText(status), /Reconnect/);
  assert.match(catalogStatusText(status), /9 sample listings/);
  assert.doesNotMatch(catalogStatusText(status), /Loading|^0 published/);
});
test('cached publications remain visible with an explicit freshness limit', () => {
  const status = catalogSnapshotStatus([{}, {}], true);
  assert.equal(status.loading, false);
  assert.match(catalogStatusText(status), /^2 published campus events/);
  assert.match(catalogStatusText(status), /Cached results/);
});
test('a server-confirmed empty snapshot ends the cache warning', () => {
  const status = catalogSnapshotStatus([], false);
  assert.match(catalogStatusText(status), /^0 published campus events/);
  assert.doesNotMatch(catalogStatusText(status), /cached|Reconnect|Loading/);
});
test('the query window and error state retain explicit boundaries', () => {
  assert.match(catalogStatusText(catalogSnapshotStatus(Array(100).fill({}), false)), /^Latest 100/);
  const error = 'Shared events could not be refreshed. Previously loaded events may be out of date; sample listings are still available.';
  assert.equal(catalogStatusText({ loading: false, count: 2, cached: true, error }), error);
});
test('demo text stays separate from account cache state and errors', () => {
  assert.equal(catalogStatusText({ loading: true, error: 'Private account error' }, true), 'Demo: sample listings. Sign in to see published campus events.');
});
