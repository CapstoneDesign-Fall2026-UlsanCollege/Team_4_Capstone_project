import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

const url=process.env.EVENT_LINKS_TEST_URL || 'http://127.0.0.1:5188';
const host=process.env.FIRESTORE_EMULATOR_HOST;
assert.equal(process.env.EVENT_LINKS_TEST_ISOLATED,'1','Use a dedicated empty demo emulator, not a shared instance.');
assert.match(url,/^http:\/\/(localhost|127\.0\.0\.1):\d+$/);
assert.match(host || '',/^127\.0\.0\.1:\d+$/);
const project='demo-campusvibe-feed',rest=`http://${host}/v1/projects/${project}/databases/(default)/documents`;
const output=process.env.EVENT_LINKS_OUTPUT || 'test-results/event-links';
const runId=randomBytes(6).toString('hex'),prefix=`link-${runId}`,records=[];
function event(id,title,published) {
  const sourceSuggestionId=`${prefix}-${id}`;
  const plain={id,sourceSuggestionId,title,interest:'Tech',host:'Fixture Club',desc:'Local shared-link test event.',date:'2026-11-11',time:'10:00',location:'Test Campus Hall'};
  const fields=Object.fromEntries(Object.entries(plain).map(([key,value])=>[key,typeof value==='number'?{integerValue:String(value)}:{stringValue:value}]));
  fields.publishedAt={timestampValue:new Date(published).toISOString()};
  const name=`projects/${project}/databases/(default)/documents/campusPublishedEvents/${sourceSuggestionId}`;
  records.push(name);return {update:{name,fields}};
}
async function commit(writes) {
  const response=await fetch(`${rest}:commit`,{method:'POST',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({writes})});
  assert.equal(response.status,200,'Local emulator fixture operation failed.');
}
const browser=await chromium.launch({channel:'chrome',headless:true});
const contexts=[],results=[],errors=[];
try {
  await mkdir(output,{recursive:true});
  await commit(Array.from({length:101},(_,index)=>event(900000+index,index===0?'Older shared event':`Recent fixture ${index}`,Date.parse('2026-11-01T00:00:00Z')+index*1000)));
  for(const [index,viewport] of [{width:1440,height:900},{width:390,height:844}].entries()) {
    const context=await browser.newContext({viewport});contexts.push(context);
    const page=await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${url}/#/community/events/900000`);await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
    assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
    assert.ok(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));
    await expect(page.locator('#authLanding')).toBeVisible();await expect(page.locator('#appMain')).not.toBeVisible();
    const checks=['Signed-out link keeps account guard'];
    await page.locator('.auth-signup-small').click();
    await page.locator('#suName').fill('Shared Event Tester');await page.locator('#suEmail').fill(`event-link-${randomBytes(6).toString('hex')}@example.com`);
    const password=`Cv!${randomBytes(12).toString('hex')}A1`;
    await page.locator('#suPass').fill(password);await page.locator('#suPass2').fill(password);await page.locator('#suInterest').selectOption('Tech');
    await page.locator('#signupForm button[type=submit]').click();
    await expect(page.locator('#dashboardDialogTitle')).toHaveText('Older shared event');
    await page.waitForFunction(()=>window.campusAccount?.ready());
    await expect(page.locator('#eventCatalogStatus')).toContainText('Latest 100 published campus events + 1 linked event');
    checks.push('Signup restores a linked Firestore event outside the latest 100');
    await page.locator('#dashboardDialog [data-save="900000"]').click();
    await expect(page.locator('#dashboardDialog [data-save="900000"]')).toHaveAttribute('aria-pressed','true');
    await page.waitForFunction(()=>!window.campusAccount.status().pending);
    await page.reload();await expect(page.locator('#dashboardDialogTitle')).toHaveText('Older shared event');
    checks.push('Authenticated reload restores the event and saved state');
    await page.locator('#closeDashboardDialog').click();
    await page.locator('#mainNav [data-page=saved]').click();await expect(page.locator('#savedGrid')).toContainText('Older shared event');
    checks.push('Fetched older event remains available in Saved for this session');
    await page.evaluate(()=>{location.hash='#/community/events/999999';});
    await expect(page.locator('#dashboardDialogTitle')).toHaveText('Event unavailable');
    checks.push('Server-confirmed missing ID shows unavailable');
    const recoveryId=990100+index;
    await context.setOffline(true);
    await page.evaluate(id=>{location.hash=`#/community/events/${id}`;},recoveryId);
    await expect(page.locator('#dashboardDialogTitle')).toHaveText('Event could not be loaded',{timeout:25000});
    await expect(page.locator('#dashboardDialog')).toContainText('not been confirmed as missing');
    await page.screenshot({path:`${output}/offline-${viewport.width}.png`});
    checks.push('Empty offline cache reports retryable loading error, not false missing');
    await commit([event(recoveryId,'Recovered shared event',Date.parse('2026-10-01T00:00:00Z'))]);
    await context.setOffline(false);
    await page.evaluate(()=>document.querySelector('[data-retry-event-link]')?.click());
    await expect(page.locator('#dashboardDialogTitle')).toHaveText('Recovered shared event');
    await expect(page.getByRole('button',{name:'Share event',exact:true})).toBeVisible();
    await page.screenshot({path:`${output}/shared-event-${viewport.width}.png`});
    checks.push('Reconnect/retry fetches the actual event by bounded ID query');
    await page.locator('#closeDashboardDialog').click();
    await page.getByRole('button',{name:'Log out',exact:true}).click();
    await expect(page.locator('#authLanding')).toBeVisible();
    assert.equal(await page.evaluate(()=>window.campusEventCatalog.some(item=>item.source==='published')),false);
    checks.push('Logout clears linked event records and restores account guard');
    results.push({viewport,checks,passed:checks.length});
    console.log(JSON.stringify({viewport,passed:checks.length}));
    await context.close();contexts.pop();
  }
  assert.deepEqual(errors,[]);
} finally {
  for(const context of contexts)await context.close();await browser.close();
  if(records.length)await commit(records.map(name=>({delete:name})));
}
await writeFile(`${output}/results.json`,JSON.stringify({checkedAt:new Date().toISOString(),status:'PASS',project,results,
  scope:'Local Auth/Firestore emulators with fictional accounts and fixture events. No production identity or database writes; no provider upload.'},null,2)+'\n');
