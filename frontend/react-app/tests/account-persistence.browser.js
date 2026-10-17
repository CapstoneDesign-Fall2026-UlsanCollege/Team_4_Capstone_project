import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const url=process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url))throw new Error('This harness requires the local Firebase emulators.');
const project='demo-campusvibe-feed',browser=await chromium.launch({channel:'chrome'}),contexts=[],users=[],errors=[];
const firestore=process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080',authHost=process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
const output=new URL('account-persistence/',process.env.CAMPUS_TEST_ARTIFACTS_URL || new URL('../verification/',import.meta.url));
await mkdir(output,{recursive:true});
const saved=page=>expect(page.locator('.account-sync-status')).toHaveText('Saved to your account',{timeout:25000});
async function context(){const ctx=await browser.newContext({viewport:{width:1440,height:1000}});contexts.push(ctx);const page=await ctx.newPage();page.setDefaultTimeout(25000);page.on('pageerror',error=>errors.push(error.message));return {ctx,page};}
async function enter(page,credentials,signup=false){
  await page.goto(url);await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
  assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
  if(signup){
    await page.locator('.auth-signup-small').click();await page.locator('#suName').fill(credentials.name);await page.locator('#suEmail').fill(credentials.email);
    await page.locator('#suPass').fill(credentials.password);await page.locator('#suPass2').fill(credentials.password);await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();
  }else{
    await page.locator('#landingEmail').fill(credentials.email);await page.locator('#landingPass').fill(credentials.password);await page.locator('#landingLoginForm button[type=submit]').click();
  }
  await saved(page);const uid=await page.evaluate(()=>window.campusFirebaseAuth.auth.currentUser.uid);if(signup)users.push({uid,token:await page.evaluate(()=>window.campusFirebaseAuth.auth.currentUser.getIdToken())});return uid;
}
const credentials=name=>({name,email:`account-${randomBytes(8).toString('hex')}@example.com`,password:`Cv!${randomBytes(12).toString('hex')}A1`});
try{
  const alice=credentials('Account Alice'),bob=credentials('Account Bob');
  const first=await context(),page=first.page;const uid=await enter(page,alice,true);
  await page.locator('#mainNav [data-page=profile]').click();await page.locator('#profileEdit').click();
  await page.locator('#editProgram').fill('Persistent Computer Science');await page.locator('#editBio').fill('This profile follows my account, not this browser.');
  await page.getByRole('button',{name:'Save changes',exact:true}).click();await expect(page.locator('#profileBio')).toHaveText('This profile follows my account, not this browser.');await saved(page);
  await page.locator('#mainNav [data-page=discover]').click();await page.locator('#filterBar [data-interest=all]').click();
  for(const id of [1,2,3,4,5]){await page.locator(`#eventsGrid [data-save="${id}"]`).click();await saved(page);}
  await page.locator('#mainNav [data-page=dashboard]').click();await expect(page.locator('#progressPoints')).toHaveText('100');await expect(page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');await saved(page);
  await page.locator('#mainNav [data-page=suggest]').click();await page.locator('#suggestName').fill('An account-backed draft');await page.locator('#suggestHost').fill('Account Club');await page.locator('#suggestDescription').fill('A draft that survives a completely fresh browser.');
  await page.getByRole('button',{name:'Save draft',exact:true}).click();await saved(page);
  await page.locator('#mainNav [data-page=chat]').click();await page.locator('#chatInput').fill('Show me music events');await page.locator('#chatInput').press('Enter');
  await expect(page.getByRole('log').locator('[data-chat-message=assistant]')).toHaveCount(1);await page.getByRole('log').getByRole('button',{name:'Save answer',exact:true}).click();await saved(page);
  console.log('PASS: profile, five saves, badge unlock, suggestion draft, and Assistant answer acknowledged by Firestore.');

  const fresh=await context();await enter(fresh.page,alice);
  assert.equal(await fresh.page.evaluate(()=>localStorage.getItem('cv_saved')),null);
  await fresh.page.locator('#mainNav [data-page=profile]').click();await expect(fresh.page.locator('#profileProgram')).toHaveText('Persistent Computer Science');await expect(fresh.page.locator('#profileSavedEvents [data-profile-event]')).toHaveCount(3);
  await fresh.page.locator('#toast').waitFor({state:'hidden'});await fresh.page.screenshot({path:fileURLToPath(new URL('profile-desktop.png',output)),fullPage:true});
  await fresh.page.locator('#mainNav [data-page=suggest]').click();await expect(fresh.page.locator('#suggestName')).toHaveValue('An account-backed draft');
  await fresh.page.locator('#mainNav [data-page=chat]').click();await expect(fresh.page.getByRole('log')).toContainText('Show me music events');await expect(fresh.page.getByRole('complementary',{name:'Assistant activity'})).toContainText('Show me music events');
  await fresh.page.locator('#mainNav [data-page=dashboard]').click();await expect(fresh.page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  assert.equal(await fresh.page.evaluate(()=>window.campusAccount.read('dashboard').activity.length),5);
  console.log('PASS: a clean browser with no local saved list restores all six account sections.');

  await page.locator('#mainNav [data-page=discover]').click();await page.locator('#eventsGrid [data-save="5"]').click();await saved(page);
  await expect(fresh.page.locator('#progressPoints')).toHaveText('80');await expect(fresh.page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  console.log('PASS: separate browser contexts update live, with earned badges retained after point loss.');

  await fresh.page.locator('#mainNav [data-page=profile]').click();await fresh.page.locator('#profileEdit').click();await fresh.ctx.setOffline(true);
  await fresh.page.locator('#editBio').fill('Recovered after an offline save.');await fresh.page.getByRole('button',{name:'Save changes',exact:true}).click();
  await expect(fresh.page.locator('.account-sync-status')).toContainText('Offline');await expect(fresh.page.getByRole('dialog',{name:'Edit profile',exact:true})).toBeVisible();
  await fresh.ctx.setOffline(false);await saved(fresh.page);await expect(fresh.page.locator('.cvp-error')).toHaveCount(0);await fresh.page.getByRole('button',{name:'Close profile panel',exact:true}).click();
  await page.locator('#mainNav [data-page=profile]').click();await expect(page.locator('#profileBio')).toHaveText('Recovered after an offline save.');
  await fresh.page.setViewportSize({width:390,height:844});await fresh.page.locator('#toast').waitFor({state:'hidden'});await fresh.page.screenshot({path:fileURLToPath(new URL('profile-mobile.png',output)),fullPage:true});
  assert.equal(await fresh.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  console.log('PASS: offline saves are not called saved; reconnect retries safely and updates the other device.');
  await page.locator('#mainNav [data-page=discover]').click();await fresh.page.locator('#mainNav [data-page=discover]').click();
  await page.locator('#filterBar [data-interest=all]').click();await fresh.page.locator('#filterBar [data-interest=all]').click();
  await Promise.all([page.locator('#eventsGrid [data-save="6"]').click(),fresh.page.locator('#eventsGrid [data-save="7"]').click()]);
  await saved(page);await saved(fresh.page);
  await expect.poll(()=>page.evaluate(()=>window.campusAccount.read('saved').length)).toBe(6);
  await expect.poll(()=>fresh.page.evaluate(()=>window.campusAccount.read('saved').length)).toBe(6);
  console.log('PASS: concurrent saves on different devices retain both additions.');

  const second=await context();await second.ctx.addInitScript(({email})=>{localStorage.setItem(`cv_profile_${email}`,JSON.stringify({bio:'My older browser profile'}));localStorage.setItem('cv_saved','[1,2,3]');},{email:bob.email});
  await enter(second.page,bob,true);await second.page.locator('#mainNav [data-page=profile]').click();await expect(second.page.locator('#profileBio')).toHaveText('My older browser profile');
  assert.deepEqual(await second.page.evaluate(()=>window.campusAccount.read('saved')),[]);
  await second.page.locator('.cvp-rail-settings').click();await second.page.getByRole('button',{name:'Import previous saved events',exact:true}).click();await expect(second.page.getByRole('dialog')).toContainText('including demo mode');await second.page.getByRole('button',{name:'Confirm import',exact:true}).click();await saved(second.page);
  assert.deepEqual(await second.page.evaluate(()=>window.campusAccount.read('saved')),[1,2,3]);
  await page.getByRole('button',{name:'Log out',exact:true}).click();await expect(page.locator('#authLanding')).toBeVisible();
  await page.locator('#landingDemo').click();await page.locator('#mainNav [data-page=saved]').click();await expect(page.locator('#savedGrid .event-card')).toHaveCount(0);
  await page.getByRole('button',{name:'Log out',exact:true}).click();await enter(page,bob);
  await page.locator('#mainNav [data-page=profile]').click();await expect(page.locator('#profileBio')).toHaveText('My older browser profile');
  assert.deepEqual(await page.evaluate(()=>window.campusAccount.read('saved')),[1,2,3]);
  await page.locator('#mainNav [data-page=suggest]').click();await expect(page.locator('#suggestName')).toHaveValue('');
  await page.locator('#mainNav [data-page=chat]').click();await expect(page.getByRole('log').locator('[data-chat-message]')).toHaveCount(0);
  console.log('PASS: account switch does not leak Alice data; legacy account profile migrates, shared-browser saves require explicit import.');
  assert.deepEqual(errors,[]);console.log('PASS: no uncaught browser errors.');
}finally{
  for(const ctx of contexts){ctx.pages().forEach(page=>page.removeAllListeners('dialog'));await ctx.close();}
  for(const {uid,token} of users){
    for(const name of ['profile','saved','dashboard','badges','suggestion','assistant'])await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusAccountData/${uid}/state/${name}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});
    await fetch(`http://${firestore}/v1/projects/${project}/databases/(default)/documents/campusFeedProfiles/${uid}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});
    await fetch(`http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token})});
  }
  await browser.close();
}
