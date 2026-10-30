import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getEventMapLinks } from '../src/event-maps.js';

const events = JSON.parse(readFileSync(new URL('../../events.json', import.meta.url), 'utf8'));

test('every current event has a venue-specific map search without a guessed pin', () => {
  for (const event of events) {
    const links = getEventMapLinks(event);
    const url = new URL(links.search);
    assert.equal(url.origin, 'https://www.google.com');
    assert.equal(url.pathname, '/maps/search/');
    assert.equal(url.searchParams.get('api'), '1');
    assert.equal(url.searchParams.get('query'), event.location);
    assert.equal(links.directions, null);
    assert.equal(links.status, 'Venue name only - address not confirmed');
  }
});

test('an organizer address provides a precise query and directions without asking for GPS', () => {
  const links = getEventMapLinks({ location: 'Library', mapLocation: { address: '  123 Campus Road, Test City  ' } });
  assert.equal(new URL(links.search).searchParams.get('query'), '123 Campus Road, Test City');
  const directions = new URL(links.directions);
  assert.equal(directions.pathname, '/maps/dir/');
  assert.equal(directions.searchParams.get('api'), '1');
  assert.equal(directions.searchParams.get('destination'), '123 Campus Road, Test City');
  assert.equal(directions.searchParams.has('origin'), false);
  assert.equal(links.status, 'Organizer-provided address');
});

test('a valid organizer pin takes precedence over a venue name or address', () => {
  const links = getEventMapLinks({ location: 'Test venue', mapLocation: { latitude: 35.5, longitude: 129.4, address: 'Test address' } });
  assert.equal(new URL(links.search).searchParams.get('query'), '35.5,129.4');
  assert.equal(new URL(links.directions).searchParams.get('destination'), '35.5,129.4');
  assert.equal(links.status, 'Organizer-provided pin');
});

test('zero coordinates and coordinate boundaries are valid', () => {
  for (const [latitude, longitude] of [[0,0], [90,180], [-90,-180]]) {
    const links = getEventMapLinks({ mapLocation: { latitude, longitude } });
    assert.equal(new URL(links.search).searchParams.get('query'), `${latitude},${longitude}`);
    assert.ok(links.directions);
  }
});

test('invalid, partial and string coordinates never become an invented pin', () => {
  for (const [latitude, longitude] of [[91,0], [0,181], [NaN,0], [0,Infinity], ['35','129'], [null,null], [undefined,5]]) {
    const links = getEventMapLinks({ location: 'Test venue', mapLocation: { latitude, longitude } });
    assert.equal(new URL(links.search).searchParams.get('query'), 'Test venue');
    assert.equal(links.directions, null);
  }
});

test('invalid coordinates can still use an explicitly supplied address', () => {
  const links = getEventMapLinks({ mapLocation: { latitude: 100, longitude: 200, address: 'Test campus, Test city' } });
  assert.equal(new URL(links.directions).searchParams.get('destination'), 'Test campus, Test city');
});

test('missing and whitespace-only venues have an unavailable state', () => {
  for (const value of [null, undefined, {}, { location: '  ' }, { location: 4 }]) assert.equal(getEventMapLinks(value), null);
});

test('query punctuation, Unicode and HTML cannot change the URL origin or parameters', () => {
  const location = 'Library & Arts #2 / \uC6B8\uC0B0 <img src=x onerror=alert(1)> ?api=0&origin=secret';
  const url = new URL(getEventMapLinks({ location }).search);
  assert.equal(url.origin, 'https://www.google.com');
  assert.equal(url.searchParams.get('query'), location);
  assert.deepEqual([...url.searchParams.keys()], ['api','query']);
  assert.equal(url.hash, '');
});

test('URL length limits fail safely instead of silently truncating an address', () => {
  assert.equal(getEventMapLinks({ location: 'x'.repeat(2100) }), null);
  assert.equal(getEventMapLinks({ location: '\uC6B8'.repeat(300) }), null);
});
