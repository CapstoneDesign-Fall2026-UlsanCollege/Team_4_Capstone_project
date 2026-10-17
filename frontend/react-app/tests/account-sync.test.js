import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ACCOUNT_SECTIONS,cleanAccountSection,encodeAccountSection,legacyAccountData,mergeBadges,mergeDashboard,mergeSavedEvents } from '../src/account-data.js';
import { createAccountSync } from '../src/account-sync.js';
const user={id:'alice',email:'alice@example.com'},events=[{id:1,host:'Club'},{id:2,host:'Other'}];
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
function fixture(t,extra={}) {
  const callbacks=new Map(),server=new Map(),writes=[];let connected=true;
  const store=createAccountSync({user,events,watch:(name,receive,fail)=>{callbacks.set(name,{receive,fail});return()=>callbacks.delete(name);},online:()=>connected,
    commit:async(name,value)=>{writes.push({name,value});server.set(name,structuredClone(value));return value;},...extra});
  t.after(()=>store.close());
  const send=(name,value=null,meta={})=>callbacks.get(name).receive({exists:value !== null,value:JSON.stringify(value),fromCache:false,pending:false,...meta});
  const load=async()=>{for(const name of ACCOUNT_SECTIONS)await send(name);};
  return {store,callbacks,server,writes,send,load,offline:()=>{connected=false;},online:()=>{connected=true;}};
}
test('account records sanitize known values without importing browser-wide saved events',()=>{
  assert.deepEqual(cleanAccountSection('saved',[1,1,2,'1',99],user,events),[1,2]);
  assert.equal(cleanAccountSection('profile',{bio:'x'.repeat(300)},user,events).bio.length,240);
  const local={getItem:()=>JSON.stringify([1,2])};
  assert.equal(legacyAccountData('saved',user,local,local),null);
  assert.deepEqual(legacyAccountData('badges',user,local,local),[1,2]);
  assert.throws(()=>encodeAccountSection('dashboard',{drafts:[{text:'x'.repeat(21000)}]},user,events),/too large/);
});
test('badges merge without revocation and converge on the earliest valid earn date',()=>{
  const a={earned:[{id:'scout',earnedAt:'2026-10-17T10:00:00Z'}]},b={earned:[{id:'scout',earnedAt:'2026-10-17T09:00:00Z'},{id:'explorer',earnedAt:'2026-10-17T09:00:00Z'},{id:'unknown',earnedAt:'invalid'}]};
  assert.equal(mergeBadges(a,b).earned.length,2);
  assert.equal(mergeBadges(a,b).earned[1].earnedAt,'2026-10-17T09:00:00.000Z');
});
test('concurrent event saves preserve other-device additions and apply only explicit removals',()=>{
  assert.deepEqual(mergeSavedEvents([], [1], [2]),[2,1]);
  assert.deepEqual(mergeSavedEvents([1], [1,2], []),[2]);
  assert.deepEqual(mergeSavedEvents([1], [], [1,2]),[2]);
  assert.deepEqual(mergeSavedEvents([1], [1], [1,2]),[1,2]);
});
test('dashboard activity merges and deduplicates without reverting recorded drafts',()=>{
  const row={type:'saved',title:'Event',at:'2026-10-17T09:00:00Z'};
  const result=mergeDashboard({activity:[row],drafts:[{title:'Existing'}]},{activity:[row,{...row,title:'Other'}],drafts:[]});
  assert.equal(result.activity.length,2);assert.equal(result.drafts.length,1);
});
test('offline retry retains the original base needed to merge a saved-event change',async t=>{
  const modes=[];const f=fixture(t,{commit:async(name,value,mode)=>{modes.push(mode);return value;}});await f.load();f.offline();
  await assert.rejects(f.store.write('saved',[1]),/Offline/);f.online();f.store.retry();await tick();assert.deepEqual(modes[0].base,[]);
});
test('initial account loading waits for server results, not optimistic or cached data',async t=>{
  const f=fixture(t);await f.send('saved',[1],{fromCache:true});assert.equal(f.store.ready(),false);assert.deepEqual(f.store.read('saved'),[]);
  await f.load();assert.equal(f.store.ready(),true);assert.deepEqual(f.writes,[]);
});
test('existing cloud data wins over stale browser data',async t=>{
  const f=fixture(t,{legacy:()=>({bio:'old'})});await f.send('profile',{bio:'new'});
  assert.equal(f.store.read('profile').bio,'new');assert.equal(f.writes.length,0);
});
test('an explicitly reset cloud profile does not resurrect older browser edits',async t=>{
  const f=fixture(t,{legacy:()=>({bio:'old'})});await f.send('profile',{});
  assert.equal(f.store.read('profile').bio,'');assert.equal(f.writes.length,0);
});
test('missing account-owned legacy data is imported conditionally, never by replacing an existing record',async t=>{
  const options=[];
  const f=fixture(t,{legacy:name=>name === 'profile' ? {bio:'old'} : null,commit:async(name,value,mode)=>{options.push(mode);return {bio:'concurrent newer profile'};}});
  await f.load();assert.deepEqual(options,[{ifMissing:true}]);assert.equal(f.store.read('profile').bio,'concurrent newer profile');
});
test('saving remains pending until the server acknowledges it',async t=>{
  let finish;const f=fixture(t,{commit:()=>new Promise(resolve=>{finish=resolve;})});await f.load();
  const task=f.store.write('saved',[1]);await tick();assert.equal(f.store.status().pending,true);
  finish([1]);await task;assert.equal(f.store.status().pending,false);assert.deepEqual(f.store.read('saved'),[1]);
});
test('oversized legacy data keeps its browser copy without blocking the new account',async t=>{
  const f=fixture(t,{legacy:name=>name === 'dashboard' ? {drafts:[{text:'x'.repeat(21000)}]} : null});await f.load();
  assert.equal(f.store.ready(),true);assert.match(f.store.status().error,/browser copy has been kept/);assert.equal(f.writes.length,0);
});
test('offline edits remain pending, reject false success, and retry after reconnect',async t=>{
  const f=fixture(t);await f.load();f.offline();
  await assert.rejects(f.store.write('saved',[2]),/Offline/);assert.equal(f.store.status().pending,true);assert.match(f.store.status().error,/Offline/);
  f.online();f.store.retry();await tick();assert.deepEqual(f.server.get('saved'),[2]);assert.equal(f.store.status().pending,false);
});
test('latest staged edit survives acknowledgement of an older in-flight save',async t=>{
  const resolvers=[];const f=fixture(t,{commit:()=>new Promise(resolve=>resolvers.push(resolve))});await f.load();
  const first=f.store.write('profile',{bio:'first'});await tick();f.store.stage('profile',{bio:'second'},10000);
  resolvers[0]({bio:'first'});await first;assert.equal(f.store.read('profile').bio,'second');assert.equal(f.store.status().pending,true);
  const last=f.store.write('profile',f.store.read('profile'));await tick();resolvers[1]({bio:'second'});await last;assert.equal(f.store.status().pending,false);
});
test('remote updates refresh clean records but cannot erase unsynced edits',async t=>{
  const f=fixture(t);await f.load();await f.send('profile',{bio:'remote'});assert.equal(f.store.read('profile').bio,'remote');
  f.store.stage('profile',{bio:'unsynced'},10000);await f.send('profile',{bio:'other device'});assert.equal(f.store.read('profile').bio,'unsynced');
});
test('closing an account cancels timers and stops listeners without exposing its state to a new account',async t=>{
  const f=fixture(t);await f.load();f.store.stage('suggestion',{name:'private'},10000);f.store.close();
  assert.equal(f.callbacks.size,0);await assert.rejects(f.store.write('saved',[1]),/loading|Sign in/);
});
