import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BADGES,badgeKey,badgeProgress,createBadgeTracker } from '../src/progress-badges.js';
const user={ id:'alice' }, now='2026-10-17T09:00:00.000Z';
function storage() { const rows=new Map(); return { getItem:key=>rows.get(key) || null,setItem:(key,value)=>rows.set(key,value) }; }

test('badge milestones follow existing 100-point levels',()=>{
  assert.deepEqual(BADGES.map(badge=>badge.level),[1,2,3,5,10]);
  assert.deepEqual(BADGES.map(badge=>badge.points),[0,100,200,400,900]);
  assert.equal(badgeProgress(20).level,1); assert.equal(badgeProgress(20).levelPercent,20);
  assert.equal(badgeProgress(100).level,2); assert.equal(badgeProgress(100).levelPercent,0);
});
test('exact threshold earns a badge once and preserves its earned date',()=>{
  const store=storage(),track=createBadgeTracker(()=>store);
  assert.equal(track(user,99,now).earnedCount,1);
  const earned=track(user,100,now);
  assert.deepEqual(earned.newlyEarned.map(badge=>badge.id),['scout']);
  assert.equal(earned.nextBadge.id,'pathfinder'); assert.equal(earned.pointsToNextBadge,100);
  assert.equal(track(user,100,'2026-10-18T09:00:00Z').newlyEarned.length,0);
  assert.equal(track(user,100).badges[1].earnedAt,now);
});
test('earned badges survive point loss and a fresh page tracker',()=>{
  const store=storage(); createBadgeTracker(()=>store)(user,200,now);
  const restored=createBadgeTracker(()=>store)(user,0,now);
  assert.equal(restored.level,1); assert.equal(restored.currentBadge.id,'explorer');
  assert.equal(restored.earnedCount,3); assert.equal(restored.nextBadge.id,'vibe-maker');
});
test('jumping levels grants every eligible milestone but not future badges',()=>{
  const result=createBadgeTracker(()=>storage())(user,400,now);
  assert.deepEqual(result.newlyEarned.map(badge=>badge.id),['explorer','scout','pathfinder','vibe-maker']);
  assert.equal(result.badges[4].earned,false);
});
test('the final milestone has no fake next badge or negative remaining count',()=>{
  const result=createBadgeTracker(()=>storage())(user,900,now);
  assert.equal(result.earnedCount,5); assert.equal(result.nextBadge,null); assert.equal(result.pointsToNextBadge,0);
});
test('badge history is isolated by account ID',()=>{
  const store=storage(),track=createBadgeTracker(()=>store); track(user,900,now);
  assert.equal(track({ id:'bob' },0,now).earnedCount,1);
  assert.notEqual(badgeKey('alice'),badgeKey('bob'));
});
test('signed-out boot never writes a badge ledger',()=>{
  const track=createBadgeTracker(()=>{ throw new Error('must not access storage'); });
  assert.equal(track(null,100,now).earnedCount,0);
});
test('invalid points cannot grant extra levels or badges',()=>{
  for (const points of [-1,NaN,Infinity,'900',1.5,Number.MAX_SAFE_INTEGER+1]) {
    const result=createBadgeTracker(()=>storage())(user,points,now);
    assert.equal(result.points,0); assert.equal(result.earnedCount,1);
  }
});
test('blocked storage warns honestly and retains in-memory awards',()=>{
  const track=createBadgeTracker(()=>{throw new Error('blocked');});
  assert.match(track(user,100,now).warning,/temporary/);
  assert.equal(track(user,0,now).earnedCount,2);
});
test('corrupt storage recovers current eligibility and warns',()=>{
  const store=storage(); store.setItem(badgeKey(user.id),'{broken');
  const result=createBadgeTracker(()=>store)(user,100,now);
  assert.equal(result.earnedCount,2); assert.match(result.warning,/could not be read/);
});
test('unknown IDs, duplicates, and invalid dates are removed from stored capabilities',()=>{
  const store=storage(); store.setItem(badgeKey(user.id),JSON.stringify({version:1,earned:[{id:'scout',earnedAt:now},{id:'scout',earnedAt:now},{id:'campus-legend',earnedAt:'invalid'},{id:'<script>',earnedAt:now}]}));
  const result=createBadgeTracker(()=>store)(user,0,now);
  assert.equal(result.earnedCount,2); assert.equal(result.badges[4].earned,false);
  assert.equal(JSON.parse(store.getItem(badgeKey(user.id))).earned.length,2);
});
test('repeated renders do not rewrite unchanged badge history',()=>{
  const store=storage(); let writes=0; const write=store.setItem; store.setItem=(...args)=>{writes++;write(...args);};
  const track=createBadgeTracker(()=>store); track(user,20,now); track(user,40,now); track(user,99,now);
  assert.equal(writes,1);
});
test('racing tabs converge on the earliest award without a storage write loop',()=>{
  let raw=null, deferred=true, writes=0; const pending=[];
  const store={ getItem:()=>raw,setItem:(key,value)=>{writes++;if(deferred)pending.push(value);else raw=value;} };
  const a=createBadgeTracker(()=>store), b=createBadgeTracker(()=>store);
  a(user,100,now); b(user,100,'2026-10-17T09:00:01.000Z');
  raw=pending[1]; deferred=false;
  a(user,100,now); b(user,100,now); a(user,100,now); b(user,100,now);
  assert.equal(writes,3);
  assert.equal(JSON.parse(raw).earned.find(badge=>badge.id==='scout').earnedAt,now);
});
