import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const url=process.env.SUGGEST_POSTER_TEST_URL||'http://127.0.0.1:5188';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url))throw new Error('Use isolated localhost emulators.');
const host=process.env.FIRESTORE_EMULATOR_HOST||'127.0.0.1:8180',project='demo-campusvibe-feed';
const rest=`http://${host}/v1/projects/${project}/databases/(default)/documents`;
const output=process.env.SUGGEST_POSTER_OUTPUT||'test-results/suggestion-posters';
const image=await readFile(new URL('../public/assets/campus-dashboard.jpg',import.meta.url));
const browser=await chromium.launch({channel:'chrome',headless:true});
const contexts=[],users=[],results=[],errors=[],claims=new Set();
const expect=baseExpect.configure({timeout:30000});
let failUpload=false;
async function admin(path,fields){const response=await fetch(`${rest}/${path}`,{method:'PATCH',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({fields})});assert.ok(response.ok);}
async function enter(name,viewport){
 const context=await browser.newContext({viewport});contexts.push(context);
 await context.route('https://res.cloudinary.com/ghr7xnsl/image/upload/**',route=>route.fulfill({contentType:'image/jpeg',body:image}));
 await context.route('**/api/suggestion-photo',async route=>{
  const body=route.request().postDataJSON();assert.match(route.request().headers().authorization,/^Bearer /);
  claims.add(body.photoId);const response=await fetch(`${rest}/campusSuggestionPhotos/${body.photoId}`,{headers:{Authorization:'Bearer owner'}});assert.ok(response.ok);
  const claim=(await response.json()).fields;assert.equal(claim.suggestionId.stringValue,body.suggestionId);
  const reply=(status,data)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
  if(body.action==='upload'){
   assert.equal(claim.status.stringValue,'active');assert.match(body.image,/^data:image\/jpeg;base64,\/9j\//);assert.ok(Buffer.from(body.image.slice(23),'base64').length<=300*1024);
   if(failUpload)return reply(429,{error:'Photo upload limit reached. Retry later or remove the poster.'});
   const publicId=`campusvibe-suggestions/${body.suggestionId}/${body.photoId}`;
   return reply(200,{photo:{id:body.photoId,publicId,src:`https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${publicId}.jpg`,width:800,height:600}});
  }
  assert.equal(body.action,'discard');assert.equal(claim.status.stringValue,'discarded');return reply(200,{deleted:true});
 });
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));await page.goto(url);
 await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
 assert.ok(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));
 await page.locator('.auth-signup-small').click();const password=`Cv!${randomBytes(12).toString('hex')}A1`;
 for(const [field,value] of [['suName',name],['suEmail',`poster-${randomBytes(7).toString('hex')}@example.com`],['suPass',password],['suPass2',password]])await page.locator(`#${field}`).fill(value);
 await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
 const user=await page.evaluate(async()=>({uid:window.campusFirebaseAuth.auth.currentUser.uid,token:await window.campusFirebaseAuth.auth.currentUser.getIdToken()}));users.push(user);return{page,...user};
}
try{
 await mkdir(output,{recursive:true});await writeFile(`${output}/results.json`,JSON.stringify({status:'RUNNING',project}));
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const author=await enter('Poster student',viewport),reviewer=await enter('Poster reviewer',viewport);
  await admin(`campusSuggestionReviewers/${reviewer.uid}`,{enabled:{booleanValue:true}});
  const page=author.page;await page.locator('#mainNav [data-page=suggest]').click();
  const title=`Poster film night ${viewport.width}`;
  await page.locator('#suggestName').fill(title);await page.locator('#suggestHost').fill('Film Club');await page.locator('#suggestDescription').fill('Student films and a poster.');
  const input=page.getByLabel('Choose suggestion poster',{exact:true});
  await expect(input).toBeHidden();
  await input.setInputFiles({name:'bad.svg',mimeType:'image/svg+xml',buffer:Buffer.from('<svg/>')});await expect(page.locator('.suggestion-poster-control [role=alert]')).toContainText('JPG, PNG, or WebP');
  failUpload=true;await input.setInputFiles({name:'poster.jpg',mimeType:'image/jpeg',buffer:image});
  await expect(page.getByRole('button',{name:'Retry poster upload',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Send suggestion',exact:true})).toBeDisabled();
  failUpload=false;await page.getByRole('button',{name:'Retry poster upload',exact:true}).click();
  await expect(page.getByRole('button',{name:'Send suggestion',exact:true})).toBeEnabled();await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await page.reload();await expect(page.locator('.suggestion-poster-preview img')).toBeVisible();
  await page.getByRole('button',{name:'Remove poster',exact:true}).click();await expect(page.locator('.suggestion-poster-preview')).toHaveCount(0);await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await page.reload();await expect(page.getByRole('button',{name:/Upload poster/})).toBeEnabled();
  await page.getByLabel('Choose suggestion poster',{exact:true}).setInputFiles({name:'poster.jpg',mimeType:'image/jpeg',buffer:image});await expect(page.getByRole('button',{name:'Send suggestion',exact:true})).toBeEnabled();
  await page.locator('#suggestAnonymous').check();await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  await page.screenshot({path:`${output}/poster-form-${viewport.width}.png`,fullPage:true});
  const posterSrc=await page.locator('.suggestion-poster-preview img').getAttribute('src');assert.ok(!posterSrc.includes(author.uid));
  await page.getByRole('button',{name:'Send suggestion',exact:true}).click();const receipt=page.locator('.suggestion-receipt').filter({has:page.getByRole('heading',{name:title,exact:true})});await expect(receipt.locator('.suggestion-receipt-poster')).toHaveAttribute('src',posterSrc);
  await reviewer.page.locator('#mainNav [data-page=suggest]').click();await reviewer.page.getByRole('button',{name:'Team review',exact:true}).click();
  const queue=reviewer.page.locator('.suggestion-receipt').filter({has:reviewer.page.getByRole('heading',{name:title,exact:true})});await expect(queue.locator('.suggestion-receipt-poster')).toHaveAttribute('src',posterSrc);
  await queue.getByLabel(`Event date for ${title}`,{exact:true}).fill('2026-11-20');await queue.getByLabel(`Event location for ${title}`,{exact:true}).fill('Campus lawn');await queue.getByRole('button',{name:'Approve and publish',exact:true}).click();
  await expect(receipt).toContainText('Published in Events');await receipt.getByRole('button',{name:'View event',exact:true}).click();await expect(page.locator('#dashboardDialog img')).toHaveAttribute('src',posterSrc);
  await expect(page.locator('#dashboardDialog')).toContainText('Campus community');await page.locator('#closeDashboardDialog').click();
  await page.locator('#filterBar [data-interest=all]').click();await page.locator('#eventSearch').fill(title);const card=page.locator('#eventsGrid .discover-event-card');await expect(card).toHaveCount(1);await expect(card.locator('img')).toHaveAttribute('src',posterSrc);await card.locator('[data-save]').click();await expect(card.locator('[data-save]')).toHaveAttribute('aria-pressed','true');
  await page.reload();await page.waitForFunction(()=>window.campusAccount?.ready());await page.locator('#mainNav [data-page=saved]').click();await expect(page.locator('#savedGrid img')).toHaveAttribute('src',posterSrc);
  await page.locator('#mainNav [data-page=profile]').click();await expect(page.locator('.cvp-event-open img[src*="campusvibe-suggestions/"]').first()).toHaveAttribute('src',posterSrc);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${output}/poster-profile-${viewport.width}.png`,fullPage:true});
  results.push({viewport,result:'PASS',checks:['file validation','compressed upload and retry','pending upload prevents incomplete send','draft reload','remove and reload','anonymous URL omits author UID','reviewer preview','published detail and Discover poster','saved reload and Profile poster','responsive layout']});
 }
 assert.deepEqual(errors,[]);
}finally{
 for(const context of contexts)await context.close();await browser.close();
 for(const user of users)await fetch('http://127.0.0.1:9199/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:user.token})});
 const cleanup=await fetch(`http://${host}/emulator/v1/projects/${project}/databases/(default)/documents`,{method:'DELETE'});assert.ok(cleanup.ok);
}
await writeFile(`${output}/results.json`,JSON.stringify({status:'PASS',checkedAt:new Date().toISOString(),project,results,scope:'Automated localhost Firebase emulator accounts with mocked Cloudinary transport. Real preparation, claim/permission, draft, review and publication code; no production user or real provider upload.'},null,2));
console.log(JSON.stringify({status:'PASS',viewports:results.length,checks:results.flatMap(result=>result.checks).length}));
