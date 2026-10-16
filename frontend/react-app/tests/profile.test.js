import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanActivity, cleanProfile, loadProfile, profileCompletion, profileKey, profileSummary, saveProfile } from '../src/profile-store.js';
const user = { id:'alice',name:'Alice Example',email:'alice@example.com',interest:'Tech' };
const hosts = ['Code Collective','Campus Orchestra'];
const storage = () => { const data=new Map(); return { getItem:key => data.get(key) || null,setItem:(key,value) => data.set(key,value) }; };

test('missing profiles do not invent a degree, campus, bio, or membership', () => {
  const profile=cleanProfile(null,user,hosts);
  assert.equal(profile.program,''); assert.equal(profile.bio,''); assert.equal(profile.campus,'');
  assert.equal(profile.year,''); assert.deepEqual(profile.followedHosts,[]);
  assert.deepEqual(profile.interests,['Tech']);
});
test('legacy program and bio edits remain readable under the same account key', () => {
  const store=storage(); store.setItem(profileKey(user),JSON.stringify({ program:'Computer Science',bio:'Builder' }));
  assert.equal(loadProfile(store,user,hosts).data.program,'Computer Science');
  assert.equal(loadProfile(store,user,hosts).data.bio,'Builder');
});
test('account keys isolate browser-local edits', () => {
  const store=storage(); saveProfile(store,user,{ program:'Private details' },hosts);
  assert.equal(loadProfile(store,{ ...user,id:'bob',email:'bob@example.com' },hosts).data.program,'');
  assert.notEqual(profileKey(user),profileKey({ id:'another' }));
});
test('profile text and interests are bounded and deduplicated', () => {
  const value=cleanProfile({ program:'x'.repeat(100),bio:'x'.repeat(300),interests:['Coding','coding','   ',...Array.from({length:30},(_,i) => `Interest ${i}`)] },user,hosts);
  assert.equal(value.program.length,80); assert.equal(value.bio.length,240); assert.equal(value.interests.length,12);
  assert.equal(value.interests.filter(item => item.toLowerCase() === 'coding').length,1);
});
test('an explicitly empty interest list is preserved', () => {
  assert.deepEqual(cleanProfile({ interests:[] },user,hosts).interests,[]);
});
test('host follows accept only distinct catalog hosts, never membership claims', () => {
  const value=cleanProfile({ followedHosts:['Code Collective','Unknown club','Code Collective'],clubsJoined:12 },user,hosts);
  assert.deepEqual(value.followedHosts,['Code Collective']); assert.equal(value.clubsJoined,undefined);
});
test('study year and graduation month reject invalid values', () => {
  const value=cleanProfile({ year:'Fictional year',graduation:'2028-99' },user,hosts);
  assert.equal(value.year,''); assert.equal(value.graduation,'');
  assert.equal(cleanProfile({ year:'2nd Year',graduation:'2028-05' },user,hosts).graduation,'2028-05');
});
test('completion is calculated from actual details and saves', () => {
  assert.equal(profileCompletion(cleanProfile({},{}),0).percent,0);
  assert.equal(profileCompletion(cleanProfile(null,user),0).percent,17);
  const full=cleanProfile({ program:'CS',bio:'Builder',interests:['Tech'],campus:'North',year:'2nd Year' },user);
  assert.equal(profileCompletion(full,1).percent,100); assert.equal(profileCompletion(full,0).percent,83);
});
test('malformed and blocked storage are surfaced without crashing', () => {
  const store=storage(); store.setItem(profileKey(user),'{invalid');
  assert.match(loadProfile(store,user,hosts).warning,/unavailable or unreadable/);
  assert.match(loadProfile(null,user,hosts).warning,/unavailable/);
  assert.throws(() => saveProfile(null,user,{},hosts),/not been applied/);
});
test('activity retains real supported actions and timestamps only', () => {
  assert.deepEqual(cleanActivity([{ type:'joined',title:'Invented',at:'2026-10-17' },{ type:'saved',title:'Sample event',at:'invalid' },{ type:'removed',title:'Jazz',at:'2026-10-17T01:00:00Z' }]),[{ type:'removed',title:'Jazz',at:'2026-10-17T01:00:00Z' }]);
  assert.equal(cleanActivity(Array.from({ length:50 },() => ({ type:'saved',title:'Sample',at:'2026-10-17T01:00:00Z' }))).length,30);
});
test('sharing excludes email by default and never invents a public profile URL', () => {
  const profile=cleanProfile({ program:'CS',bio:'Builder',interests:['Music'] },user,hosts);
  const summary=profileSummary(user,profile);
  assert.match(summary,/Alice Example/); assert.match(summary,/Music/); assert.ok(!summary.includes(user.email));
  assert.ok(!summary.includes('http')); assert.ok(profileSummary(user,profile,true).includes(user.email));
});
