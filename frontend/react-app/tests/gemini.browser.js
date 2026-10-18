import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const url=process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url))throw new Error('Use the local emulator preview.');
const expect=baseExpect.configure({timeout:30000}),browser=await chromium.launch({channel:'chrome'}),contexts=[],errors=[],sent=[];
const person=name=>({name,email:`gemini-qa-${randomBytes(8).toString('hex')}@example.com`,password:`Cv!${randomBytes(12).toString('hex')}A1`});
const alice=person('Gemini QA Alice'),bob=person('Gemini QA Bob');
let quota=false,delayed=false,release;
async function setup(){
  const context=await browser.newContext({viewport:{width:1440,height:1000}});contexts.push(context);
  await context.route('**/api/assistant',async route=>{
    if(route.request().method()==='GET')return route.fulfill({contentType:'application/json',body:JSON.stringify({available:true,provider:'Gemini'})});
    const body=route.request().postDataJSON();sent.push(body);assert.match(route.request().headers().authorization,/^Bearer /);
    assert.deepEqual(Object.keys(body).sort(),['adult','consent','filters','history','text']);assert.equal(body.adult,true);assert.equal(body.consent,true);
    for(const forbidden of [alice.email,bob.email,'Gemini QA Alice','Gemini QA Bob','private-local@example.com'])assert.equal(JSON.stringify(body).includes(forbidden),false);
    if(quota)return route.fulfill({status:429,contentType:'application/json',body:JSON.stringify({error:'Free AI quota used.',fallback:true})});
    const wait=delayed;
    if(wait)await new Promise(resolve=>{release=resolve;});
    try{await route.fulfill({contentType:'application/json',body:JSON.stringify({text:wait?'This old response must never enter the new conversation.':body.history.length?'A short follow-up based on our AI conversation.':'A conversational AI answer about planning your study week.',eventIds:[],pages:[],source:'gemini'})});}catch{if(!wait)throw new Error('Unexpected route failure.');}
  });
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));return page;
}
async function enter(page,user,signup=true){
  await page.goto(url);await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
  assert.ok(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),'demo-campusvibe-feed');
  if(signup){await page.locator('.auth-signup-small').click();for(const [id,value]of[['suName',user.name],['suEmail',user.email],['suPass',user.password],['suPass2',user.password]])await page.locator(`#${id}`).fill(value);await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();}
  else{await page.locator('#landingEmail').fill(user.email);await page.locator('#landingPass').fill(user.password);await page.locator('#landingLoginForm button[type=submit]').click();}
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');await page.locator('#mainNav [data-page=chat]').click();
}
const send=async(page,text)=>{await page.locator('#chatInput').fill(text);await page.getByRole('button',{name:'Send message',exact:true}).click();};
async function consent(page){
  await page.getByRole('button',{name:'Gemini AI',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Use Gemini AI',exact:true});
  await expect(dialog.getByRole('button',{name:'Continue with Gemini',exact:true})).toBeDisabled();
  await dialog.getByRole('checkbox',{name:'I am 18 or older.',exact:true}).check();
  await expect(dialog.getByRole('button',{name:'Continue with Gemini',exact:true})).toBeDisabled();
  await dialog.getByRole('checkbox',{name:'I understand and agree to send my questions and recent AI replies to Google.',exact:true}).check();
  await dialog.getByRole('button',{name:'Continue with Gemini',exact:true}).click();
}
try{
  const page=await setup();await enter(page,alice);
  await send(page,'private-local@example.com');await expect(page.getByRole('log').locator('[data-response-source=local]')).toHaveCount(1);assert.equal(sent.length,0);
  await page.getByRole('button',{name:'Gemini AI',exact:true}).click();await page.getByRole('dialog',{name:'Use Gemini AI',exact:true}).getByRole('button',{name:'Cancel',exact:true}).click();assert.equal(sent.length,0);
  await consent(page);await send(page,'Help me plan a study week.');await expect(page.getByRole('log')).toContainText('conversational AI answer');
  assert.deepEqual(sent[0].history,[]);await expect(page.getByRole('log').locator('[data-response-source=gemini]')).toHaveCount(1);
  await send(page,'Can you make that shorter?');await expect(page.getByRole('log')).toContainText('short follow-up');assert.equal(sent[1].history.length,2);
  await page.getByRole('log').getByRole('button',{name:'Save answer',exact:true}).last().click();await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await page.reload();await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');await page.locator('#mainNav [data-page=chat]').click();
  await expect(page.getByRole('button',{name:'Gemini AI',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.getByRole('log').locator('[data-response-source=gemini]')).toHaveCount(2);
  quota=true;await send(page,'How do I save an event?');await expect(page.locator('.assistant-provider-notice')).toContainText('local-helper answer');
  await expect(page.getByRole('log').locator('[data-response-source=local]').last()).toContainText('only change your saved list');quota=false;
  delayed=true;await send(page,'A delayed reply.');await expect.poll(()=>!!release).toBe(true);await page.getByRole('button',{name:'Stop response',exact:true}).click();
  await page.getByRole('button',{name:'New chat',exact:true}).click();delayed=false;release();
  await send(page,'A new independent question.');await expect(page.getByRole('log')).toContainText('conversational AI answer');await expect(page.getByRole('log')).not.toContainText('old response');
  for(const width of[1440,390,320]){
    await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(process.env.CAMPUS_TEST_ARTIFACTS_URL){const output=new URL('gemini/',process.env.CAMPUS_TEST_ARTIFACTS_URL);await mkdir(output,{recursive:true});await page.screenshot({path:fileURLToPath(new URL(`assistant-${width}.png`,output)),fullPage:true});}
  }
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await page.getByRole('button',{name:'Log out',exact:true}).click();
  await expect(page.locator('.auth-signup-small')).toBeVisible();await enter(page,bob);
  await expect(page.getByRole('button',{name:'Local',exact:true})).toHaveAttribute('aria-pressed','true');await expect(page.getByRole('log')).not.toContainText('study week');
  assert.deepEqual(errors,[]);
  console.log('PASS: explicit age/privacy opt-in, no local/private history forwarding, AI follow-ups, saved source labels across reload, honest quota fallback, cancellation and stale-response isolation, account isolation and desktop/mobile fit. Gemini requests mocked: no model tokens consumed.');
}finally{release?.();await browser.close();}
