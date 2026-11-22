import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_EVENT_DATE, discoverEvents } from '../src/event-discovery.js';

const now = Date.parse('2026-11-21T16:00:00Z'); // November 22 in the campus zone.
const event = (id, date, source = 'sample', extra = {}) => ({ id, date, source, title: `Event ${id}`, host: 'Campus host', location: 'Ulsan', interest: 'Tech', ...extra });
const rows = [event(1,'2026-11-21'),event(2,'2026-11-22'),event(3,'2026-11-23'),event(1001,'2026-11-22','published'),event(1002,'2026-12-01','published')];

test('upcoming is the default and includes the current campus day', () => {
  assert.equal(DEFAULT_EVENT_DATE,'upcoming');
  assert.deepEqual(discoverEvents(rows,{},now).map(row=>row.id),[1001,1002,2,3]);
});
test('published records come first without relabelling or removing samples', () => {
  const result=discoverEvents(rows,{date:'all'},now);
  assert.deepEqual(result.map(row=>row.id),[1001,1002,1,2,3]);
  assert.equal(result.find(row=>row.id===1).source,'sample');
});
test('past and all dates remain explicit options', () => {
  assert.deepEqual(discoverEvents(rows,{date:'past'},now).map(row=>row.id),[1]);
  assert.equal(discoverEvents(rows,{date:'all'},now).length,5);
});
test('source filters independently exclude samples or published events', () => {
  assert.deepEqual(discoverEvents(rows,{source:'published'},now).map(row=>row.id),[1001,1002]);
  assert.deepEqual(discoverEvents(rows,{source:'sample'},now).map(row=>row.id),[2,3]);
});
test('source, date, category, search and saved filters combine', () => {
  assert.deepEqual(discoverEvents(rows,{source:'published',category:'Tech',search:' event 1002 ',savedOnly:true,saved:[1002]},now).map(row=>row.id),[1002]);
  assert.deepEqual(discoverEvents(rows,{source:'published',category:'Music'},now),[]);
});
test('explicit alphabetical or latest sorting respects the user choice', () => {
  const input=[event(2,'2026-11-24','published',{title:'Zebra'}),event(1,'2026-11-25','sample',{title:'Alpha'})];
  assert.deepEqual(discoverEvents(input,{sort:'title'},now).map(row=>row.id),[1,2]);
  assert.deepEqual(discoverEvents(input,{sort:'latest'},now).map(row=>row.id),[1,2]);
});
test('filtering is non-mutating and an invalid source does not invent a catalogue', () => {
  const before=structuredClone(rows);
  discoverEvents(rows,{source:'unknown'},now);
  assert.deepEqual(rows,before);
  assert.equal(discoverEvents([],{},now).length,0);
});
