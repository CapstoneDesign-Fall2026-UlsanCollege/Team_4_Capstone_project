import { test } from 'node:test';
import assert from 'node:assert/strict';
import { campusDateKey, matchesEventDate } from '../src/event-dates.js';

test('campus dates change at Korean midnight regardless of browser timezone', () => {
  assert.equal(campusDateKey(new Date('2026-11-10T14:59:59Z')), '2026-11-10');
  assert.equal(campusDateKey(new Date('2026-11-10T15:00:00Z')), '2026-11-11');
  assert.equal(matchesEventDate('2026-11-11', 'today', new Date('2026-11-10T16:00:00Z')), true);
  assert.equal(matchesEventDate('2026-11-10', 'today', new Date('2026-11-10T16:00:00Z')), false);
});

test('upcoming includes today while past excludes today', () => {
  const now = new Date('2026-11-11T00:00:00Z');
  for (const [date, upcoming, past] of [['2026-11-10', false, true], ['2026-11-11', true, false], ['2026-11-12', true, false]]) {
    assert.equal(matchesEventDate(date, 'upcoming', now), upcoming);
    assert.equal(matchesEventDate(date, 'past', now), past);
  }
});

test('this weekend means Saturday and Sunday of the current campus week, including Sunday', () => {
  for (const day of ['2026-11-09', '2026-11-13', '2026-11-14', '2026-11-15']) {
    const now = new Date(`${day}T03:00:00Z`);
    for (const [date, expected] of [['2026-11-13', false], ['2026-11-14', true], ['2026-11-15', true], ['2026-11-16', false]]) {
      assert.equal(matchesEventDate(date, 'weekend', now), expected, `${day}: ${date}`);
    }
  }
});

test('weekend arithmetic crosses month and year boundaries', () => {
  const now = new Date('2027-01-01T03:00:00Z');
  assert.equal(matchesEventDate('2027-01-02', 'weekend', now), true);
  assert.equal(matchesEventDate('2027-01-03', 'weekend', now), true);
  assert.equal(matchesEventDate('2026-12-31', 'weekend', now), false);
});

test('invalid event dates cannot pass an active date filter', () => {
  for (const date of ['', undefined, '2026-02-30', '2026-13-01', '2026-1-01']) {
    for (const filter of ['today', 'weekend', 'upcoming', 'past']) assert.equal(matchesEventDate(date, filter), false);
  }
  assert.equal(matchesEventDate('2028-02-29', 'today', new Date('2028-02-29T03:00:00Z')), true);
  assert.equal(matchesEventDate('', 'all'), true);
});
