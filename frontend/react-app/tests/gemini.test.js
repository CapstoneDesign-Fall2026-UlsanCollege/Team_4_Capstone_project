import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { aiHistory, cleanAiReply, sensitivePrompt } from '../src/assistant/ai-contract.js';
import { createRemoteAssistantRunner } from '../src/assistant/remote-runner.js';
import { cleanSession } from '../src/assistant/session.js';

const events = JSON.parse(readFileSync(new URL('../../events.json',import.meta.url),'utf8'));
const question = { text:'How can I prepare for my first campus event?', history:[], filters:{}, consent:true, adult:true };

test('AI history forwards only complete explicitly Gemini-tagged exchanges',()=>{
  const message=(role,text,source)=>({role,text,source});
  const values=[message('user','Old local private question','local'),message('assistant','Local answer','local'),message('user','First AI question','gemini'),message('assistant','AI answer','gemini'),message('user','A quota failure','gemini'),message('assistant','Local fallback','local'),message('user','Unanswered question','gemini')];
  assert.deepEqual(aiHistory(values),[{role:'user',text:'First AI question'},{role:'assistant',text:'AI answer'}]);
  assert.equal(aiHistory(Array.from({length:20},(_,index)=>message(index%2?'assistant':'user',String(index),'gemini'))).length,6);
});

test('reply references are limited to known sample events and allowed navigation',()=>{
  const value=cleanAiReply({text:'Some sample ideas.',eventIds:[2,999,2,'1'],pages:['discover','javascript:evil','discover'],source:'forged'},events);
  assert.deepEqual(value.eventIds,[2]);assert.deepEqual(value.pages,['discover']);assert.equal(value.source,'gemini');
  assert.throws(()=>cleanAiReply({text:''},events));assert.throws(()=>cleanAiReply({text:'x'.repeat(6001)},events));
  const session=cleanSession({messages:[{id:'answer',role:'assistant',...value}]},events);assert.equal(session.messages[0].source,'gemini');
});

test('obvious credentials and contact information are rejected before provider submission',()=>{
  for(const value of ['email me at private@example.com','My phone is +82 10 1234 5678','password=private-secret','AIza'+'A'.repeat(32),'AQ.'+'A'.repeat(40),'Bearer '+ 'A'.repeat(30)])assert.equal(sensitivePrompt(value),true);
  assert.equal(sensitivePrompt('What sample events were listed on 2026-10-05?'),false);
});

test('remote runner sends only its bounded body and handles quota fallback without leaking tokens into JSON',async()=>{
  let submitted;
  const runner=createRemoteAssistantRunner({getToken:async()=>'test-token',request:async(url,options)=>{submitted={url,options};return Response.json({error:'AI quota used.',fallback:true},{status:429});}});
  await assert.rejects(runner.ask(question),failure=>failure.fallback===true);
  assert.equal(submitted.url,'/api/assistant');assert.equal(submitted.options.headers.Authorization,'Bearer test-token');assert.equal(submitted.options.body.includes('test-token'),false);
});

test('remote runner rejects duplicate sends, stops in-flight work and can answer a later request',async()=>{
  let pending=true;
  const runner=createRemoteAssistantRunner({getToken:async()=>'token',request:async(url,options)=>pending?new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(options.signal.reason),{once:true})):Response.json({text:'A later reply.',eventIds:[],pages:[]})});
  const first=runner.ask(question);await new Promise(resolve=>setImmediate(resolve));await assert.rejects(runner.ask(question),/already/);runner.stop();await assert.rejects(first,failure=>failure.name==='AbortError');
  pending=false;assert.equal((await runner.ask(question)).text,'A later reply.');
});
