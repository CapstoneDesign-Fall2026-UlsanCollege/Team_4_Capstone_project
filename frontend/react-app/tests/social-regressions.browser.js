import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const url=process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url))throw new Error('Use a local Firebase emulator preview.');
const expect=baseExpect.configure({timeout:30000}),project='demo-campusvibe-feed';
const endpoint=`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/projects/${project}/databases/(default)/documents`;
const prefix=`projects/${project}/databases/(default)/documents`;
const browser=await chromium.launch({channel:'chrome'}),contexts=[],users=[],postIds=[],errors=[];
const credentials=name=>({name,email:`social-fix-${randomBytes(8).toString('hex')}@example.com`,password:`Cv!${randomBytes(12).toString('hex')}A1`});
const nav=page=>page.getByRole('navigation',{name:'Shared feed navigation'});
async function enter(person,signup=false,page){
  if(!page){const context=await browser.newContext({viewport:{width:1440,height:1000}});contexts.push(context);page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));}
  await page.goto(url);await page.waitForFunction(()=>window.campusFirebaseAuth?.auth);
  assert.ok(await page.evaluate(()=>window.campusFirebaseAuth.auth.emulatorConfig));assert.equal(await page.evaluate(()=>window.campusFirebaseAuth.auth.app.options.projectId),project);
  if(signup){
    await page.locator('.auth-signup-small').click();
    for(const [id,value] of [['suName',person.name],['suEmail',person.email],['suPass',person.password],['suPass2',person.password]])await page.locator(`#${id}`).fill(value);
    await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();
  }else{await page.locator('#landingEmail').fill(person.email);await page.locator('#landingPass').fill(person.password);await page.locator('#landingLoginForm button[type=submit]').click();}
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  const identity=await page.evaluate(async()=>({uid:window.campusFirebaseAuth.auth.currentUser.uid,token:await window.campusFirebaseAuth.auth.currentUser.getIdToken()}));
  const user={...person,...identity,page};if(signup)users.push(user);
  await page.locator('[data-workspace=feed]').click();await page.locator('.shared-feed-status .connected').waitFor();return user;
}
async function adminCommit(writes){
  const result=await fetch(`${endpoint}:commit`,{method:'POST',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({writes})});
  assert.equal(result.status,200,await result.text());
}
async function children(id,name){
  const records=[];let pageToken;
  do{
    const params=new URLSearchParams({pageSize:'1000',...(pageToken ? {pageToken} : {})});
    const response=await fetch(`${endpoint}/campusFeedPosts/${id}/${name}?${params}`,{headers:{Authorization:'Bearer owner'}});assert.ok(response.ok);
    const data=await response.json();records.push(...(data.documents || []));pageToken=data.nextPageToken;
  }while(pageToken);
  return records;
}
async function seed(id,uid){
  const records=[...Array.from({length:201},(_,index)=>({name:`${prefix}/campusFeedPosts/${id}/reactions/seed-${index}_like`,fields:{uid:{stringValue:`seed-${index}`},kind:{stringValue:'like'}}})),...Array.from({length:101},(_,index)=>({name:`${prefix}/campusFeedPosts/${id}/comments/seed-${index}`,fields:{uid:{stringValue:uid},name:{stringValue:'Regression Bob'},body:{stringValue:`Seeded comment ${index}`}}}))];
  await adminCommit(records.map(update=>({update,updateTransforms:[{fieldPath:'createdAt',setToServerValue:'REQUEST_TIME'}]})));
}
async function makePost(user,body){
  await nav(user.page).getByRole('button',{name:'Latest posts',exact:true}).click();
  await user.page.getByRole('textbox',{name:'Your college',exact:true}).fill('Regression Campus');await user.page.getByRole('textbox',{name:'Post text',exact:true}).fill(body);await user.page.getByRole('button',{name:'Post',exact:true}).click();
  const card=user.page.locator('[data-shared-post]').filter({hasText:body});await expect(card).toBeVisible();const id=await card.getAttribute('data-shared-post');postIds.push(id);return {id,card};
}
async function removeThroughUI(user,record){
  await record.card.locator('summary').click();await record.card.getByRole('button',{name:'Delete post',exact:true}).click();
  await user.page.getByRole('dialog',{name:'Delete this post?',exact:true}).getByRole('button',{name:'Delete post',exact:true}).click();await expect(record.card).toHaveCount(0);
}
async function assertRemoved(id){
  assert.equal((await fetch(`${endpoint}/campusFeedPosts/${id}`,{headers:{Authorization:'Bearer owner'}})).status,404);
  assert.equal((await children(id,'reactions')).length,0);assert.equal((await children(id,'comments')).length,0);
}
try{
  const alice=await enter(credentials('Regression Alice'),true),bob=await enter(credentials('Regression Bob'),true);
  await nav(alice.page).getByRole('button',{name:'Friends',exact:true}).click();
  await alice.page.getByRole('searchbox',{name:'Search people',exact:true}).fill(bob.uid);
  await alice.page.locator(`[data-person="${bob.uid}"]`).getByRole('button',{name:'Add friend',exact:true}).click();
  await nav(bob.page).getByRole('button',{name:'Friends',exact:true}).click();await bob.page.getByRole('button',{name:`Accept request from Regression Alice, member ${alice.uid}`,exact:true}).click();
  await nav(alice.page).getByRole('button',{name:'Messages',exact:true}).click();await alice.page.getByRole('button',{name:`Message Regression Bob, member ${bob.uid}`,exact:true}).click();
  await alice.page.getByRole('textbox',{name:'Message text',exact:true}).fill('Keep this unsent draft across Feed views.');
  for(const view of ['Friends','Latest posts']){
    await nav(alice.page).getByRole('button',{name:view,exact:true}).click();await nav(alice.page).getByRole('button',{name:'Messages',exact:true}).click();await alice.page.getByRole('button',{name:`Message Regression Bob, member ${bob.uid}`,exact:true}).click();
    await expect(alice.page.getByRole('textbox',{name:'Message text',exact:true})).toHaveValue('Keep this unsent draft across Feed views.');
  }
  const sent=await fetch(`${endpoint}/campusFeedConnections/${alice.uid}_${bob.uid}/messages`,{headers:{Authorization:'Bearer owner'}}).then(response=>response.json());
  assert.equal((sent.documents || []).length,0);
  console.log('PASS: actual Messages > Friends/Latest posts > Messages navigation preserves the unsent draft without sending it.');

  const large=await makePost(alice,'Delete every page of seeded interactions.');await seed(large.id,bob.uid);
  const denied=await bob.page.evaluate(async({id,uid})=>{
    const {deleteSharedPost}=await import('/src/shared-feed-store.js');
    try{await deleteSharedPost({id:uid},{id,authorId:uid});return false;}catch{return true;}
  },{id:large.id,uid:bob.uid});assert.equal(denied,true);
  await removeThroughUI(alice,large);await assertRemoved(large.id);
  console.log('PASS: native Firestore cleanup removes 201 reactions and 101 comments; a non-author cannot bypass the server ownership check.');

  let retry=await makePost(alice,'Resume an interrupted post deletion.');await seed(retry.id,bob.uid);
  const marking=await fetch(`${endpoint}:commit`,{method:'POST',headers:{Authorization:`Bearer ${alice.token}`,'Content-Type':'application/json'},body:JSON.stringify({writes:[{update:{name:`${prefix}/campusFeedPosts/${retry.id}`,fields:{deleting:{booleanValue:true}}},updateMask:{fieldPaths:['deleting']},updateTransforms:[{fieldPath:'updatedAt',setToServerValue:'REQUEST_TIME'}]}]})});
  assert.equal(marking.status,200,await marking.text());
  await adminCommit((await children(retry.id,'comments')).slice(0,30).map(item=>({delete:item.name})));
  await nav(bob.page).getByRole('button',{name:'Latest posts',exact:true}).click();
  const peer=bob.page.locator(`[data-shared-post="${retry.id}"]`);await expect(peer.getByRole('status')).toHaveText('Deletion pending');await expect(peer.getByRole('button',{name:'Like',exact:true})).toBeDisabled();
  const blocked=await bob.page.evaluate(async({id,uid})=>{
    const {addComment,setReaction}=await import('/src/shared-social-store.js'),{setSavedPost}=await import('/src/shared-saved-store.js');
    const results=await Promise.allSettled([addComment({id:uid,name:'Regression Bob'},id,'Too late'),setReaction({id:uid},id,'like',true),setSavedPost({id:uid},id,true)]);
    return results.map(result=>result.status === 'rejected' && result.reason.code === 'permission-denied');
  },{id:retry.id,uid:bob.uid});assert.deepEqual(blocked,[true,true,true]);
  await alice.page.reload();await alice.page.locator('.shared-feed-status .connected').waitFor();retry={id:retry.id,card:alice.page.locator(`[data-shared-post="${retry.id}"]`)};
  await expect(retry.card.getByRole('status')).toHaveText('Deletion pending');await removeThroughUI(alice,retry);await assertRemoved(retry.id);
  await alice.page.evaluate(async({id,uid})=>{const {deleteSharedPost}=await import('/src/shared-feed-store.js');await deleteSharedPost({id:uid},{id,authorId:uid});},{id:retry.id,uid:alice.uid});
  console.log('PASS: interrupted cleanup resumes after reload, blocks comments/reactions/bookmarks while pending, and is harmless when retried after completion.');

  const concurrent=await makePost(alice,'Concurrent deletion retry fixture.');await seed(concurrent.id,bob.uid);
  await alice.page.evaluate(async({id,uid})=>{const {deleteSharedPost}=await import('/src/shared-feed-store.js');await Promise.all([deleteSharedPost({id:uid},{id,authorId:uid}),deleteSharedPost({id:uid},{id,authorId:uid})]);},{id:concurrent.id,uid:alice.uid});
  await assertRemoved(concurrent.id);console.log('PASS: concurrent author cleanup calls leave neither parent nor child records.');

  await nav(alice.page).getByRole('button',{name:'Messages',exact:true}).click();await alice.page.getByRole('button',{name:`Message Regression Bob, member ${bob.uid}`,exact:true}).click();
  await alice.page.getByRole('textbox',{name:'Message text',exact:true}).fill('Alice-only unsent text.');
  if(process.env.CAMPUS_TEST_ARTIFACTS_URL){const output=new URL('social-regressions/',process.env.CAMPUS_TEST_ARTIFACTS_URL);await mkdir(output,{recursive:true});await alice.page.screenshot({path:fileURLToPath(new URL('draft-desktop.png',output)),fullPage:true});await alice.page.setViewportSize({width:390,height:844});await alice.page.screenshot({path:fileURLToPath(new URL('draft-mobile.png',output)),fullPage:true});assert.ok(await alice.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await alice.page.getByRole('button',{name:'Log out',exact:true}).click();await enter(bob,false,alice.page);await nav(alice.page).getByRole('button',{name:'Messages',exact:true}).click();await alice.page.getByRole('button',{name:`Message Regression Alice, member ${alice.uid}`,exact:true}).click();await expect(alice.page.getByRole('textbox',{name:'Message text',exact:true})).toHaveValue('');
  assert.deepEqual(errors,[]);console.log('PASS: account switching does not expose another user draft; desktop/mobile views fit with no uncaught page errors.');
}finally{
  await browser.close();
  for(const id of postIds){for(const name of ['reactions','comments']){const remaining=await children(id,name);if(remaining.length)await adminCommit(remaining.map(item=>({delete:item.name})));}await fetch(`${endpoint}/campusFeedPosts/${id}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});}
  if(users.length===2){const connection=`${users[0].uid}_${users[1].uid}`;await fetch(`${endpoint}/campusFeedConnections/${connection}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});}
  for(const user of users){for(const section of ['profile','saved','dashboard','badges','suggestion','assistant'])await fetch(`${endpoint}/campusAccountData/${user.uid}/state/${section}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});await fetch(`${endpoint}/campusFeedProfiles/${user.uid}`,{method:'DELETE',headers:{Authorization:'Bearer owner'}});await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9199'}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:user.token})});}
}
