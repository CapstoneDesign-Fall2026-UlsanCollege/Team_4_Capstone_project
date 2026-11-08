import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicationDetails,publicationPayload,publishedEvent } from '../src/published-events-model.js';
import { cleanAccountSection } from '../src/account-data.js';
const idea={name:'Student film night',host:'Film Club',category:'Arts',description:'Films and discussion.',anonymous:false};
const date={date:'2026-11-20',time:'18:30',location:'Campus lawn'};
const timestamp={toMillis:()=>100};
test('publication needs a genuine calendar date and venue, with an optional truthful time',()=>{
  for(const value of [{...date,date:'2026-02-30'},{...date,date:''},{...date,location:' '},{...date,time:'25:00'}])assert.throws(()=>publicationDetails(value));
  assert.equal(publicationDetails({...date,time:''}).time,'');
});
test('publication preserves the idea and explicitly strips anonymous identity and private fields',()=>{
  const result=publicationPayload({...idea,anonymous:true,authorName:'Private name',host:'Private club',reviewNote:'Private note'},'idea',1000,date,timestamp);
  assert.equal(result.host,'Campus community');assert.equal(result.title,idea.name);
  assert.ok(!('authorName' in result) && !('reviewNote' in result));
  assert.throws(()=>publicationPayload(idea,'bad/id',1000,date,timestamp));
  assert.throws(()=>publicationPayload(idea,'idea',1,date,timestamp));
});
test('catalogue records have stable numeric IDs, a poster placeholder and no invented time',()=>{
  const raw=publicationPayload(idea,'idea',1000,{...date,time:''},timestamp);
  const result=publishedEvent('idea',raw);
  assert.equal(result.id,1000);assert.equal(result.source,'published');assert.equal(result.time,'Time to be confirmed');assert.equal(result.photo,'event-placeholder.svg');
  assert.equal(publishedEvent('another',raw),null);assert.equal(publishedEvent('idea',{...raw,date:'2026-02-30'}),null);
});
test('published saves survive loading, pagination and missing catalogue snapshots',()=>{
  assert.deepEqual(cleanAccountSection('saved',[1,1000,1001,99,NaN,'1000',1000],{},[{id:1}]),[1,1000,1001]);
  assert.deepEqual(cleanAccountSection('saved',[1000],{},[]),[1000]);
});
