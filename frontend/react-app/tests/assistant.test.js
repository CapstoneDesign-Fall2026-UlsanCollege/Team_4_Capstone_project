import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createAssistant } from '../src/assistant/engine.js';
import { todayInSeoul, validDate } from '../src/assistant/dates.js';
import { createEventSearch, knownEvents } from '../src/assistant/search.js';
import { assistantSessionKey, cleanSession, loadSession, MAX_MESSAGES, saveSession } from '../src/assistant/session.js';
import { createAssistantRunner } from '../src/assistant/runner.js';

const events = JSON.parse(readFileSync(new URL('../../events.json',import.meta.url),'utf8'));
const answer = createAssistant(events);
const ask = (text,extra = {}) => answer({ text, today:'2026-10-16', ...extra });
const fakeStorage = () => { const rows = new Map(); return { getItem:key => rows.get(key) || null, setItem:(key,value) => rows.set(key,value) }; };

test('shared catalog preserves nine distinct sample event identities', () => {
  assert.equal(events.length,9);
  assert.equal(new Set(events.map(event => event.id)).size,9);
  assert.equal(new Set(events.map(event => event.photo)).size,9);
  assert.ok(events.every(event => validDate(event.date)));
});
test('fuzzy search finds a misspelled event and a partial title', () => {
  const search = createEventSearch(events);
  assert.equal(search('hacknigt')[0].id,1);
  assert.equal(search('jazz')[0].id,8);
  assert.equal(search('botanical garden')[0].id,8);
});
test('unknown questions never invent records', () => {
  assert.deepEqual(ask('quantum-teleportation-zqx').eventIds,[]);
  assert.match(ask('what can you do').text,/not a generative AI/);
});
test('event lookup is grounded in known records', () => {
  assert.deepEqual(ask('Where is the Indie Game Showcase?').eventIds,[7]);
  assert.equal(knownEvents(events,[7,1,7,999,'2']).map(event => event.id).join(','),'7,1');
});
test('all events are not mistaken for one matching the word all', () => {
  assert.deepEqual(ask('show all events').eventIds,[1,2,3,4]);
});
test('music and multiple-interest filters stay deterministic', () => {
  assert.deepEqual(ask('show me music events').eventIds,[2,8]);
  assert.deepEqual(ask('music or sports').eventIds,[2,4,8]);
  assert.ok(ask('not music events').eventIds.every(id => events.find(event => event.id === id).interest !== 'Music'));
});
test('two-event comparisons do not invent availability', () => {
  assert.deepEqual(ask('compare jazz and open mic').eventIds,[8,2]);
  assert.match(ask('compare jazz and open mic').text,/not verified/);
});
test('saved lists filter the latest supplied saved IDs', () => {
  assert.deepEqual(ask('show my saved music events',{ savedIds:[1,2,8,999] }).eventIds,[2,8]);
  assert.deepEqual(ask('saved photography',{ savedIds:[] }).eventIds,[]);
});
test('unsaved recommendations exclude every saved candidate', () => {
  assert.deepEqual(ask('show music not saved',{ savedIds:[2] }).eventIds,[8]);
  assert.deepEqual(ask('recommend music',{ savedIds:[2,8] }).eventIds,[]);
});
test('saved instructions have no write action', () => {
  const result = ask('How do I save an event?');
  assert.match(result.text,/only change.*choose/);
  assert.deepEqual(result.pages,['saved','discover']);
  assert.equal(result.action,undefined);
});
test('suggestion guidance distinguishes real submission from demo drafts', () => {
  assert.match(ask('how do I suggest an event').text,/demo drafts stay/);
  assert.deepEqual(ask('how do I suggest an event').pages,['suggest']);
});
test('booking and live availability are never promised', () => {
  assert.match(ask('book tickets for Jazz Under the Stars').text,/cannot book/);
  assert.match(ask('show upcoming events').text,/No sample events/);
});
test('calendar dates are validated and timezone changes use Seoul', () => {
  assert.equal(validDate('2026-02-30'),false);
  assert.equal(validDate('2028-02-29'),true);
  assert.equal(todayInSeoul(new Date('2026-10-15T16:00:00Z')),'2026-10-16');
  assert.match(ask('events on 2026-02-30').text,/valid calendar date/);
});
test('explicit dates combine category and saved restrictions', () => {
  assert.deepEqual(ask('events on 2026-10-03').eventIds,[6]);
  assert.deepEqual(ask('music after 2026-10-01').eventIds,[8]);
  assert.deepEqual(ask('my saved music after 2026-10-01',{ savedIds:[2] }).eventIds,[]);
});
test('this weekend uses the real date while sample weekend is explicit', () => {
  assert.deepEqual(ask('this weekend').eventIds,[]);
  assert.deepEqual(ask('sample weekend').eventIds,[1,2]);
});
test('ambiguous follow-ups ask rather than guessing', () => {
  const music = ask('music events');
  assert.match(ask('where is it',{ context:music.context }).text,/More than one/);
  assert.deepEqual(ask('where is the second one',{ context:music.context }).eventIds,[8]);
  assert.match(ask('where is it').text,/Which event/);
});
test('result continuation terminates and retains visible ordering', () => {
  const first = ask('all events'), second = ask('more',{ context:first.context }), third = ask('more',{ context:second.context });
  assert.deepEqual(second.eventIds,[5,6,7,8]);
  assert.deepEqual(third.eventIds,[9]);
  assert.deepEqual(ask('more',{ context:third.context }).eventIds,[]);
  assert.deepEqual(ask('first one',{ context:{ eventIds:[8,2] } }).eventIds,[8]);
});
test('empty and oversized requests are rejected', () => {
  for (const value of ['', '   ', 'x'.repeat(501), null]) assert.throws(() => answer({ text:value }));
});
test('conversation persistence is isolated by account key', () => {
  const storage = fakeStorage(), a = assistantSessionKey('alice'), b = assistantSessionKey('bob');
  assert.notEqual(a,b);
  saveSession(storage,a,{ messages:[{ id:'one',role:'user',text:'My private question' }],draft:'Draft' },events);
  assert.equal(loadSession(storage,a,events).messages[0].text,'My private question');
  assert.equal(loadSession(storage,b,events).messages.length,0);
});
test('malformed sessions and blocked storage do not crash the assistant', () => {
  const storage = fakeStorage(); storage.setItem('bad','{nope');
  assert.deepEqual(loadSession(storage,'bad',events).messages,[]);
  assert.equal(saveSession(null,'key',{},events),false);
  assert.equal(loadSession(null,'key',events).messages.length,0);
});
test('history and restored capabilities are bounded to known values', () => {
  const value = cleanSession({ messages:Array.from({length:100},(_,index) => ({ id:`id-${index}`,role:'assistant',text:'Sample',eventIds:[1,999,'2'],pages:['saved','javascript:alert(1)'] })),draft:'x'.repeat(800),context:{ eventIds:[999,1], candidates:[999,1], offset:100 } },events);
  assert.equal(value.messages.length,MAX_MESSAGES);
  assert.equal(value.draft.length,500);
  assert.deepEqual(value.messages[0].eventIds,[1]);
  assert.deepEqual(value.messages[0].pages,['saved']);
  assert.equal(value.context.offset,1);
});

function fakeWorker() { return { postMessage(value) { this.sent = value; }, terminate() { this.stopped = true; } }; }
const result = { text:'A local result',eventIds:[],context:{ eventIds:[],candidates:[],offset:0 } };
test('worker resolves only the matching request ID', async () => {
  const worker = fakeWorker(), runner = createAssistantRunner(() => worker);
  const pending = runner.ask({ text:'music' });
  worker.onmessage({ data:{ id:'wrong',result } });
  worker.onmessage({ data:{ id:worker.sent.id,result } });
  assert.equal((await pending).text,'A local result'); runner.stop();
});
test('stopping a response rejects it and allows a fresh worker', async () => {
  const workers = [], runner = createAssistantRunner(() => { const worker=fakeWorker(); workers.push(worker); return worker; });
  const first = runner.ask({ text:'music' }); runner.stop();
  await assert.rejects(first,{ name:'AbortError' });
  const second = runner.ask({ text:'jazz' });
  workers[0].onerror({ preventDefault() {} });
  assert.equal(workers[1].stopped,undefined);
  workers[1].onmessage({ data:{ id:workers[1].sent.id,result } });
  await second; assert.equal(workers[0].stopped,true); runner.stop();
});
test('worker failures, timeout, and duplicate sends are recoverable', async () => {
  const worker = fakeWorker(), runner = createAssistantRunner(() => worker,15);
  const pending = runner.ask({ text:'music' });
  await assert.rejects(runner.ask({ text:'other' }),/already/);
  await assert.rejects(pending,/too long/);
  assert.equal(worker.stopped,true);
  const next = runner.ask({ text:'jazz' });
  worker.onerror({ preventDefault() {} });
  await assert.rejects(next,/could not start/);
});
test('malformed worker replies fail visibly rather than adding an empty response', async () => {
  const worker = fakeWorker(), runner = createAssistantRunner(() => worker);
  const pending = runner.ask({ text:'music' });
  worker.onmessage({ data:{ id:worker.sent.id,result:{} } });
  await assert.rejects(pending,/invalid response/); runner.stop();
});
test('restored message keys cannot collide', () => {
  const result = cleanSession({ messages:[{ id:'same',role:'user',text:'one' },{ id:'same',role:'user',text:'two' }] },events);
  assert.notEqual(result.messages[0].id,result.messages[1].id);
});
