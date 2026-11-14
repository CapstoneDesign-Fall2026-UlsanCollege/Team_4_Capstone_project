import { verifyEmulatorEmail } from './verify-emulator-email.js';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir,writeFile } from 'node:fs/promises';

const url=process.env.PUBLISHED_EVENTS_TEST_URL || 'http://127.0.0.1:5188';
if(!/^http:\/\/(localhost|127\.0\.0\.1):\d+\/?$/.test(url))throw new Error('Use an isolated emulator-backed localhost preview.');
const project='demo-campusvibe-feed';
const rest=`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/projects/${project}/databases/(default)/documents`;
const output=process.env.PUBLISHED_EVENTS_OUTPUT || 'test-results/published-events';
const browser=await chromium.launch({channel:'chrome',headless:true});
const contexts=[],users=[],ids=[],errors=[],results=[];
async function admin(path,fields) {
  const target=new URL(`${rest}/${path}`);
  if(fields)for(const field of Object.keys(fields))target.searchParams.append('updateMask.fieldPaths',field);
  const response=await fetch(target,{method:fields ? 'PATCH' : 'DELETE',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},...(fields ? {body:JSON.stringify({fields})} : {})});
  assert.ok(response.ok || (!fields && response.status===404),`Emulator operation failed: ${path}`);
  return fields ? response.json() : null;
}
async function read(path) {
  const response=await fetch(`${rest}/${path}`,{headers:{Authorization:'Bearer owner'}});
  assert.ok(response.ok);return (await response.json()).fields;
}
async function create(name,viewport) {
  const context=await browser.newContext({viewport});contexts.push(context);
  const page=await context.newPage();page.setDefaultTimeout(25000);page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url);await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
  assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
  assert.ok(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));
  await page.locator('.auth-signup-small').click();
  await page.locator('#suName').fill(name);await page.locator('#suEmail').fill(`publish-${randomBytes(7).toString('hex')}@example.com`);
  const password=`Cv!${randomBytes(12).toString('hex')}A1`;
  await page.locator('#suPass').fill(password);await page.locator('#suPass2').fill(password);await page.locator('#suInterest').selectOption('Tech');
  await page.locator('#signupForm button[type=submit]').click();await verifyEmulatorEmail(page);await expect(page.locator('#appMain')).toBeVisible();
  const user=await page.evaluate(async()=>({uid:window.campusFirebaseAuth.auth.currentUser.uid,token:await window.campusFirebaseAuth.auth.currentUser.getIdToken()}));
  users.push(user);await page.waitForFunction(()=>window.campusAccount?.ready());return {page,context,...user};
}
async function submit(page,title,anonymous=false) {
  await page.locator('#mainNav [data-page=suggest]').click();await page.getByRole('button',{name:'New idea',exact:true}).click();
  await page.locator('#suggestName').fill(title);await page.locator('#suggestHost').fill('Film Guild');
  await page.locator('#suggestDescription').fill('Student films <img src=x onerror="window.__eventXss=1"> and discussion.');
  if(anonymous)await page.locator('#suggestAnonymous').check();
  await page.getByRole('button',{name:'Send suggestion',exact:true}).click();
  const item=page.locator('.suggestion-receipt').filter({has:page.getByRole('heading',{name:title,exact:true})});
  await expect(item).toBeVisible();const id=await item.getAttribute('data-suggestion-id');ids.push(id);return {item,id};
}
try {
  await mkdir(output,{recursive:true});
  await writeFile(`${output}/results.json`,JSON.stringify({status:'RUNNING',project})+'\n');
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]) {
    const author=await create('Publication Student',viewport),reviewer=await create('Publication Reviewer',viewport);
    await admin(`campusSuggestionReviewers/${reviewer.uid}`,{enabled:{booleanValue:true}});
    const title=`Shared film night ${viewport.width}`;
    const {item,id}=await submit(author.page,title,true);
    await expect(author.page.getByRole('button',{name:'Team review',exact:true})).toHaveCount(0);
    await reviewer.page.locator('#mainNav [data-page=suggest]').click();await reviewer.page.getByRole('button',{name:'Team review',exact:true}).click();
    const queue=reviewer.page.locator(`[data-suggestion-id="${id}"]`);
    await expect(queue).toBeVisible();await queue.getByRole('button',{name:'Approve and publish',exact:true}).click();
    await expect(queue.getByRole('alert')).toContainText('valid event date');
    assert.equal((await read(`campusSuggestions/${id}`)).status.stringValue,'pending');
    await queue.getByLabel(`Event date for ${title}`,{exact:true}).fill('2026-11-20');
    await queue.getByLabel(`Event location for ${title}`,{exact:true}).fill('Campus lawn');
    await reviewer.context.setOffline(true);await queue.getByRole('button',{name:'Approve and publish',exact:true}).click();
    await expect(queue.getByRole('alert')).toContainText('Reconnect');
    await reviewer.context.setOffline(false);
    assert.equal((await read(`campusSuggestions/${id}`)).status.stringValue,'pending');
    await queue.getByRole('button',{name:'Approve and publish',exact:true}).click();
    await expect(item).toContainText('Published in Events');
    await author.page.locator('#mainNav [data-page=discover]').click();await author.page.locator('#filterBar [data-interest=all]').click();
    await author.page.locator('#eventSearch').fill(title);
    const card=author.page.locator('#eventsGrid .discover-event-card');await expect(card).toHaveCount(1);
    await expect(card).toContainText('Published campus event');await expect(card).toContainText('Campus community');await expect(card).toContainText('Time to be confirmed');
    const eventId=Number(await card.getAttribute('data-event-id'));assert.ok(eventId>=1000);
    await card.locator('[data-discover-event]').click();await expect(author.page.locator('#dashboardDialogTitle')).toHaveText(title);
    await expect(author.page.locator('#dashboardDialog')).toContainText('Campus lawn');
    assert.equal(await author.page.evaluate(()=>window.__eventXss || 0),0);
    await author.page.locator('#closeDashboardDialog').click();await card.locator('[data-save]').click();
    await expect(card.locator('[data-save]')).toHaveAttribute('aria-pressed','true');
    await author.page.reload();await author.page.waitForFunction(()=>window.campusAccount?.ready());
    await author.page.locator('#mainNav [data-page=saved]').click();await expect(author.page.locator('#savedGrid')).toContainText(title);
    await author.page.locator('#mainNav [data-page=profile]').click();await expect(author.page.locator('#profileMount')).toContainText(title);
    assert.equal(await author.page.evaluate(()=>window.__eventXss || 0),0);
    await author.page.locator('#mainNav [data-page=discover]').click();await author.page.locator('#filterBar [data-interest=all]').click();await author.page.locator('#eventSearch').fill(title);
    await expect(author.page.locator('#eventsGrid .discover-event-card')).toHaveCount(1);
    assert.ok(await author.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await author.page.screenshot({path:`${output}/published-${viewport.width}.png`,fullPage:true});

    const legacyTitle=`Previously approved workshop ${viewport.width}`;
    const legacy=await submit(author.page,legacyTitle);
    await admin(`campusSuggestions/${legacy.id}`,{status:{stringValue:'approved'},reviewerId:{stringValue:reviewer.uid},reviewedAt:{timestampValue:'2026-10-20T12:00:00Z'},reviewNote:{stringValue:'Original approval retained'}});
    await reviewer.page.getByRole('combobox',{name:'Review status',exact:true}).selectOption('approved');
    const legacyQueue=reviewer.page.locator(`[data-suggestion-id="${legacy.id}"]`);
    await expect(legacyQueue.getByRole('button',{name:'Publish to Events',exact:true})).toBeVisible();
    await legacyQueue.getByLabel(`Event date for ${legacyTitle}`,{exact:true}).fill('2026-11-22');
    await legacyQueue.getByLabel(`Event location for ${legacyTitle}`,{exact:true}).fill('Student centre');
    await legacyQueue.getByLabel(`Event time for ${legacyTitle}`,{exact:true}).fill('18:30');
    await legacyQueue.getByRole('button',{name:'Publish to Events',exact:true}).click();
    await expect(legacy.item).toContainText('Published in Events');
    const source=await read(`campusSuggestions/${legacy.id}`);assert.equal(source.reviewNote.stringValue,'Original approval retained');
    const legacyId=Number(source.publishedEventId.integerValue);
    const retries=await reviewer.page.evaluate(async ({id})=>{const {publishSuggestion}=await import('/src/published-events-store.js');return Promise.all([publishSuggestion(window.campusAccount.user,id,'',{}),publishSuggestion(window.campusAccount.user,id,'',{})]);},{id:legacy.id});
    assert.deepEqual(retries,[legacyId,legacyId]);
    await author.page.waitForFunction(id=>window.campusEventCatalog.some(event=>event.id===id),legacyId);
    await legacy.item.getByRole('button',{name:'View event',exact:true}).click();await expect(author.page.locator('#dashboardDialogTitle')).toHaveText(legacyTitle);
    await author.page.locator('#closeDashboardDialog').click();
    await author.page.getByRole('button',{name:'Log out',exact:true}).click();await author.page.locator('#landingDemo').click();
    await author.page.locator('#filterBar [data-interest=all]').click();await author.page.locator('#eventSearch').fill('');await expect(author.page.locator('#eventsGrid .discover-event-card')).toHaveCount(9);
    assert.ok(await author.page.evaluate(()=>window.campusEventCatalog.every(event=>event.source==='sample')));
    const guestContext=await browser.newContext({viewport});contexts.push(guestContext);const guest=await guestContext.newPage();
    await guest.goto(url);await guest.locator('#landingDemo').click();await guest.locator('#filterBar [data-interest=all]').click();await expect(guest.locator('#eventsGrid .discover-event-card')).toHaveCount(9);
    await guest.locator('#eventSearch').fill(title);await expect(guest.locator('#eventsGrid .discover-event-card')).toHaveCount(0);
    const result={viewport,result:'PASS',checks:['reviewer-only publication','missing-date recovery','offline approval leaves pending','student cross-account live Events','event details','anonymous attribution','safe literal rendering','save/reload/profile','legacy approved publication','idempotent retry','logout clears shared catalogue','demo sample boundary'],eventId};
    results.push(result);console.log(JSON.stringify(result));
  }
  assert.deepEqual(errors,[]);
} finally {
  await browser.close();
  for(const id of ids){await admin(`campusPublishedEvents/${id}`);await admin(`campusSuggestions/${id}`);await admin(`campusSuggestionOwners/${id}`);}
  for(const {uid,token} of users){
    await admin(`campusSuggestionReviewers/${uid}`);await admin(`campusFeedProfiles/${uid}`);
    for(const section of ['profile','saved','dashboard','badges','suggestion','assistant'])await admin(`campusAccountData/${uid}/state/${section}`);
    await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9199'}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token})});
  }
}
await writeFile(`${output}/results.json`,JSON.stringify({status:'PASS',checkedAt:new Date().toISOString(),execution:'Automated Chrome with two isolated emulator accounts per viewport',project,results,pageErrors:errors,cleanup:'PASS',scope:'Auth/Firestore emulators; fictional data; not independent human testing or proof of live campus announcements.'},null,2)+'\n');
