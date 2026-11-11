import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { eventCatalog, replacePublishedEvents, rememberLinkedEvent, clearLinkedEvents, linkedEventCount } from '../src/event-catalog.js';
import { catalogStatusText } from '../src/event-catalog-status.js';
afterEach(() => { clearLinkedEvents();replacePublishedEvents([]); });

test('a linked event outside the latest catalogue remains accessible during the account session', () => {
  const older = { id: 1000, source: 'published', title: 'Linked older event' };
  rememberLinkedEvent(older);
  replacePublishedEvents([{ id: 1001, source: 'published', title: 'Newest event' }]);
  assert.ok(eventCatalog.includes(older));
  assert.equal(linkedEventCount(), 1);
  assert.equal(eventCatalog.filter(event => event.source === 'sample').length, 9);
});

test('current catalogue data wins over a remembered event without duplicating its numeric ID', () => {
  rememberLinkedEvent({ id: 1000, source: 'published', title: 'Cached title' });
  replacePublishedEvents([{ id: 1000, source: 'published', title: 'Current title' }]);
  assert.equal(eventCatalog.filter(event => event.id === 1000).length, 1);
  assert.equal(eventCatalog.find(event => event.id === 1000).title, 'Current title');
  assert.equal(linkedEventCount(), 0);
});

test('clearing linked events at the account boundary drops records outside the latest catalogue', () => {
  rememberLinkedEvent({ id: 1000, source: 'published' });
  replacePublishedEvents([{ id: 1001, source: 'published' }]);
  clearLinkedEvents();
  assert.ok(!eventCatalog.some(event => event.id === 1000));
  assert.ok(eventCatalog.some(event => event.id === 1001));
});

test('catalogue status distinguishes extra linked records from the latest-100 query', () => {
  assert.match(catalogStatusText({ count: 100, linkedCount: 1 }), /Latest 100 published campus events \+ 1 linked event/);
});
