import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventLinkHash, eventShareUrl, parseEventLink } from '../src/event-links.js';

test('sample and published numeric IDs have stable event routes', () => {
  for (const id of [1, 9, 1000, 321654, Number.MAX_SAFE_INTEGER]) assert.equal(parseEventLink(eventLinkHash(id)), id);
});

test('malformed, ambiguous and unsafe event IDs are rejected before a lookup', () => {
  for (const id of [0, -1, 1.5, NaN, Infinity, '01', '1e3', '1/2', '%31', '<script>', Number.MAX_SAFE_INTEGER + 1, null, {}]) {
    assert.throws(() => eventLinkHash(id));
    assert.equal(parseEventLink(`#/community/events/${id}`), null);
  }
  for (const hash of ['#/feed', '#/community/events/1/extra', '#/community/events/1?next=https://evil.test', '#/community/events/']) assert.equal(parseEventLink(hash), null);
});

test('sharing drops query parameters and the old page while keeping the deployment origin/path', () => {
  assert.equal(eventShareUrl(1001, 'https://campus.test/app/?private=omit#/community/profile'), 'https://campus.test/app/#/community/events/1001');
  assert.equal(eventShareUrl(2, 'http://127.0.0.1:4178/'), 'http://127.0.0.1:4178/#/community/events/2');
});

test('sharing refuses executable URLs and embedded credentials', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,example', 'https://user:password@campus.test/']) assert.throws(() => eventShareUrl(1, url));
});
