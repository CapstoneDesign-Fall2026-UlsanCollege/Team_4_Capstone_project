import {verifyEmulatorEmail} from './verify-emulator-email.js';
import {chromium} from 'playwright';
import {expect as baseExpect} from '@playwright/test';
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';

const url=process.env.RSVP_TEST_URL;
const firestore=process.env.FIRESTORE_EMULATOR_HOST,authHost=process.env.FIREBASE_AUTH_EMULATOR_HOST;
assert.match(url||'',/^http:\/\/127\.0\.0\.1:\d+$/);
assert.match(firestore||'',/^127\.0\.0\.1:\d+$/);assert.match(authHost||'',/^127\.0\.0\.1:\d+$/);
const output=process.env.RSVP_TEST_OUTPUT;assert(output,'Use an explicit private artifact directory');
const project='demo-campusvibe-feed',expect=baseExpect.configure({timeout:25000});
const browser=await chromium.launch({channel:'chrome',headless:true}),contexts=[],users=[],errors=[],checks=[];
const credentials=name=>({name,email:`rsvp-${randomBytes(8).toString('hex')}@example.com`,password:`Cv!${randomBytes(12).toString('hex')}A1`});
async function enter(person,signup=false,viewport={width:1440,height:1000}) {
  const context=await browser.newContext({viewport});contexts.push(context);
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url+'/#/community/events/1');await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
  assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
  assert(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));
  if(signup) {
    await page.locator('.auth-signup-small').click();
    for(const [id,value] of [['suName',person.name],['suEmail',person.email],['suPass',person.password],['suPass2',person.password]])await page.locator('#'+id).fill(value);
    await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();await verifyEmulatorEmail(page);
  }else {
    await page.locator('#landingEmail').fill(person.email);await page.locator('#landingPass').fill(person.password);await page.locator('#landingLoginForm button[type=submit]').click();
  }
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await expect(page.locator('#rsvp-btn-1')).toBeEnabled();
  const identity=await page.evaluate(async()=>({uid:window.campusFirebaseAuth.auth.currentUser.uid,token:await window.campusFirebaseAuth.auth.currentUser.getIdToken()}));
  const entry={context,page,...identity};if(signup)users.push(entry);return entry;
}
async function stored(person) {
  const response=await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusAccountData/${person.uid}/state/saved_rsvps`,{headers:{Authorization:'Bearer owner'}});
  assert.equal(response.status,200);const data=await response.json();return JSON.parse(data.fields.value.stringValue);
}
async function event(person,id) {
  await person.page.evaluate(id=>{location.hash=`#/community/events/${id}`;},id);
  await expect(person.page.locator('#rsvp-btn-'+id)).toBeVisible();
}
try {
  await mkdir(output,{recursive:true});
  const alice=credentials('RSVP Alice'),bob=credentials('RSVP Bob');
  const first=await enter(alice,true);
  await first.page.locator('#rsvp-btn-1').click();await expect(first.page.locator('#rsvp-btn-1')).toHaveText('Cancel RSVP');
  assert.deepEqual(await stored(first),[1]);checks.push('Verified owner RSVP is acknowledged by the emulator, not browser-only storage');
  const fresh=await enter(alice);
  await expect(fresh.page.locator('#rsvp-btn-1')).toHaveText('Cancel RSVP');
  assert.equal(await fresh.page.evaluate(()=>localStorage.getItem('cv_rsvps_demo')),null);
  await fresh.page.locator('#rsvp-btn-1').click();await expect(first.page.locator('#rsvp-btn-1')).toHaveText('Join event');
  assert.deepEqual(await stored(first),[]);checks.push('A fresh browser restores the RSVP and cancellation reaches the other browser');
  await event(fresh,2);
  await Promise.all([first.page.locator('#rsvp-btn-1').click(),fresh.page.locator('#rsvp-btn-2').click()]);
  await expect(first.page.locator('#rsvp-btn-1')).toHaveText('Cancel RSVP');await expect(fresh.page.locator('#rsvp-btn-2')).toHaveText('Cancel RSVP');
  await expect.poll(async()=>(await stored(first)).sort((a,b)=>a-b)).toEqual([1,2]);checks.push('Concurrent joins retain both event IDs');
  await first.context.setOffline(true);await first.page.locator('#rsvp-btn-1').click();
  await expect(first.page.locator('#rsvp-btn-1')).toHaveText('Retry RSVP');
  await expect(first.page.getByRole('region',{name:'Your RSVP',exact:true})).toContainText('not confirmed');
  assert.deepEqual((await stored(first)).sort((a,b)=>a-b),[1,2]);
  await first.context.setOffline(false);await expect(first.page.locator('#rsvp-btn-1')).toHaveText('Join event');
  await expect.poll(()=>stored(first)).toEqual([2]);checks.push('Offline cancellation is unconfirmed until reconnect/retry is acknowledged');
  const other=await enter(bob,true,{width:390,height:844});await event(other,2);
  await expect(other.page.locator('#rsvp-btn-2')).toHaveText('Join event');
  const denied=await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusAccountData/${first.uid}/state/saved_rsvps`,{headers:{Authorization:'Bearer '+other.token}});
  assert.equal(denied.status,403);checks.push('Another verified account has separate intent and cannot read the owner RSVP');
  await fresh.page.locator('.rsvp-block').screenshot({path:output+'/account-rsvp-desktop.png'});
  await other.page.locator('.rsvp-block').screenshot({path:output+'/account-rsvp-mobile.png'});
  assert(await other.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  // Auth expiry or another-tab sign-out can occur while a modal owns pointer input.
  await first.page.evaluate(()=>window.campusFirebaseAuth.signOut(window.campusFirebaseAuth.auth));
  await expect(first.page.locator('#authLanding')).toBeVisible();await expect(first.page.locator('[data-rsvp-event]')).toHaveCount(0);
  await expect(first.page.locator('#dashboardDialog')).not.toBeVisible();checks.push('Sign-out closes the event dialog and removes the previous account RSVP');
  assert.deepEqual(errors,[]);
  const result={status:'PASS',checkedAt:new Date().toISOString(),scope:'Local Auth/Firestore emulators with fictional verified accounts; no production identity or attendance registration',checks};
  await writeFile(output+'/results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally {
  for(const context of contexts)await context.close();
  for(const person of users) {
    for(const name of ['profile','saved','saved_rsvps','dashboard','badges','suggestion','assistant'])await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusAccountData/${person.uid}/state/${name}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});
    await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusFeedProfiles/${person.uid}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});
    await fetch(`http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:person.token})});
  }
  await browser.close();
}
