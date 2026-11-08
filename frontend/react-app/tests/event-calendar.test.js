import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../../dashboard.js', import.meta.url), 'utf8');
const samples = JSON.parse(readFileSync(new URL('../../events.json', import.meta.url), 'utf8'));
const today = new Date('2026-11-08T12:00:00').getTime();
function calendar(events) {
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [today])); } static now() { return today; } }
  const context = vm.createContext({ EVENTS: events, Date: Clock });
  vm.runInContext(source, context);
  return expression => vm.runInContext(expression, context);
}
test('sample-only calendar keeps its explicitly illustrative week', () => {
  const run = calendar(samples);
  assert.equal(run('dashboardDateKey(dashboardWeekStart())'), '2026-09-23');
  assert.equal(run('JSON.stringify(dashboardWeekendEvents().map(event => event.id))'), '[1,2]');
});
test('a published event uses the current Monday to Sunday week, independent of publication order', () => {
  for (const date of ['2026-11-20', '2026-11-04', '2025-01-01']) {
    const run = calendar([{ id: 1000, source: 'published', date }, ...samples]);
    assert.equal(run('dashboardDateKey(dashboardWeekStart())'), '2026-11-02');
    assert.equal(run('dashboardWeekStart().getDay()'), 1);
  }
});
test('published weekend includes Saturday and Sunday rather than Friday and Saturday', () => {
  const run = calendar([
    { id: 1000, source: 'published', date: '2026-11-06' },
    { id: 1001, source: 'published', date: '2026-11-07' },
    { id: 1002, source: 'published', date: '2026-11-08' }, ...samples,
  ]);
  assert.equal(run('JSON.stringify(dashboardWeekendEvents().map(event => event.id))'), '[1001,1002]');
});
