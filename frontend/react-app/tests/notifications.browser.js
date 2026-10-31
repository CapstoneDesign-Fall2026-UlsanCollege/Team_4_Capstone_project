import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';

const url = process.env.FEED_TEST_URL || 'http://127.0.0.1:5192';
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url)) throw new Error('Use a localhost emulator preview, never production accounts.');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const contexts = [], errors = [];
const endpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/projects/demo-campusvibe-feed/databases/(default)/documents`;
const bell = page => page.getByRole('button', { name: /^Notifications(?:,|$)/ });
const panel = page => page.getByRole('dialog', { name: 'Notifications', exact: true });
async function openPanel(page, workspace = 'all') {
  if (!await panel(page).isVisible()) await bell(page).click();
  await panel(page).getByRole('group', { name: 'Notification workspace' }).getByRole('button', { name: { all:'All', community:'Community', feed:'Vibe-Feed' }[workspace], exact: true }).click();
  await expect(panel(page).getByRole('status').filter({ hasText:'Loading notifications' })).toHaveCount(0);
}
async function clearUnread(page) {
  await openPanel(page);
  const mark = panel(page).getByRole('button', { name:'Mark recent notifications as read' });
  if (await mark.isEnabled()) await mark.click();
  await expect(bell(page)).toHaveAttribute('aria-label', 'Notifications');
  await page.keyboard.press('Escape');
}
async function account(name, existing) {
  const context = await browser.newContext({ viewport:{width:1440,height:900} }); contexts.push(context);
  const page = await context.newPage(); page.setDefaultTimeout(25000); page.on('pageerror', error => errors.push(error.message));
  await page.goto(url, {waitUntil:'domcontentloaded'});
  await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
  assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.app.options.projectId), 'demo-campusvibe-feed');
  assert.ok(await page.evaluate(() => window.campusFirebaseAuth.auth.emulatorConfig));
  const email = existing?.email || `notification-${randomBytes(6).toString('hex')}@example.com`;
  const password = existing?.password || `Cv!${randomBytes(10).toString('hex')}A1`;
  if (existing) {
    await page.locator('#landingEmail').fill(email); await page.locator('#landingPass').fill(password);
    await page.locator('#landingLoginForm button[type=submit]').click();
  } else {
    await page.locator('.auth-signup-small').click();
    await page.locator('#suName').fill(name); await page.locator('#suEmail').fill(email);
    await page.locator('#suPass').fill(password); await page.locator('#suPass2').fill(password);
    await page.locator('#suInterest').selectOption('Tech');
    await page.locator('#signupForm button[type=submit]').click();
  }
  await expect(page.locator('#appMain')).toBeVisible();
  await page.waitForFunction(() => window.campusAccount?.ready());
  await page.locator('[data-workspace=feed]').click();
  await page.locator('.shared-feed-status .connected').waitFor();
  const uid = await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser.uid);
  return {context,page,name,email,password,uid};
}
async function source(actor, module, method, args = []) {
  return actor.page.evaluate(async ({ module,method,args,user }) => {
    const store = await import(`/src/${module}.js`);
    const result = await store[method](user,...args);
    return result?.id || null;
  }, {module,method,args,user:{id:actor.uid,name:actor.name}});
}

try {
  const alice = await account('Notification Alice'); console.log('SETUP: Alice account ready.');
  const bob = await account('Notification Bob'); console.log('SETUP: Bob account ready.');
  const postId = await source(alice,'shared-feed-store','publishSharedPost',[{body:'Notification target post',college:'Test College'}]);
  await clearUnread(alice.page);
  await alice.page.locator('[data-workspace=community]').click();
  await source(bob,'shared-social-store','setReaction',[postId,'like',true]);
  await source(bob,'shared-social-store','addComment',[postId,'A real emulator comment']);
  await source(bob,'shared-social-store','setReaction',[postId,'interested',true]);
  await expect(bell(alice.page)).toHaveAttribute('aria-label',/3 unread recent/);
  await openPanel(alice.page,'feed');
  await expect(panel(alice.page)).toContainText('Notification Bob liked your post');
  await panel(alice.page).getByRole('button').filter({hasText:'Notification Bob liked your post'}).click();
  await expect(alice.page.locator('#feedMain')).toBeVisible();
  await expect(alice.page.locator(`[data-shared-post="${postId}"]`)).toBeVisible();
  console.log('PASS: Community receives real Feed like/comment/interest alerts, and an alert opens the exact shared post.');

  await source(bob,'shared-friends-store','requestFriend',[alice.uid]);
  await openPanel(alice.page,'feed');
  await panel(alice.page).getByRole('button').filter({hasText:'Notification Bob sent you a friend request'}).click();
  await alice.page.getByRole('button',{name:new RegExp(`^Accept request from Notification Bob, member ${bob.uid}`)}).click();
  await openPanel(bob.page,'feed');
  await expect(panel(bob.page)).toContainText('Notification Alice accepted your friend request');
  await bob.page.keyboard.press('Escape');
  await alice.page.locator('[data-workspace=community]').click();
  const connectionId = `${bob.uid}_${alice.uid}`;
  await source(bob,'shared-messages-store','sendMessage',[connectionId,'Private notification fixture message']);
  await openPanel(alice.page,'feed');
  await expect(panel(alice.page)).toContainText('Notification Bob sent you a message');
  await expect(panel(alice.page)).not.toContainText('Private notification fixture message');
  await panel(alice.page).getByRole('button').filter({hasText:'Notification Bob sent you a message'}).click();
  await expect(alice.page.locator('.feed-conversation')).toContainText('Private notification fixture message');
  console.log('PASS: request/acceptance and private-message alerts cross workspaces without exposing message previews; links open the correct contact/conversation.');

  const secondAlice = await account(alice.name, alice);
  await clearUnread(secondAlice.page);
  await expect(bell(alice.page)).toHaveAttribute('aria-label','Notifications');
  await source(bob,'shared-social-store','setReaction',[postId,'like',false]);
  await source(bob,'shared-social-store','setReaction',[postId,'like',true]);
  await expect(bell(alice.page)).toHaveAttribute('aria-label',/1 unread recent/);
  await openPanel(secondAlice.page,'feed');
  await expect(panel(secondAlice.page).locator('[data-notification-id]').filter({hasText:'Notification Bob liked your post'})).toHaveCount(1);
  await secondAlice.page.keyboard.press('Escape');
  await clearUnread(alice.page);
  console.log('PASS: account read status syncs across browser contexts; a new reaction reuses its row and becomes unread without erasing prior read time.');

  await alice.page.locator('[data-workspace=community]').click();
  await alice.page.locator('#mainNav [data-page=discover]').click();
  await alice.page.locator('#filterBar [data-interest=all]').click();
  await alice.page.locator('#eventsGrid [data-save="1"]').click();
  await openPanel(alice.page,'community');
  await expect(panel(alice.page)).toContainText('Event saved');
  await panel(alice.page).getByRole('button').filter({hasText:'HackNight: Build-a-Thon'}).click();
  await expect(alice.page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await alice.page.locator('#closeDashboardDialog').click();
  for (const id of [2,3,4,5]) await alice.page.locator(`#eventsGrid [data-save="${id}"]`).click();
  await openPanel(alice.page,'community');
  await expect(panel(alice.page)).toContainText('New badge earned');
  await panel(alice.page).getByRole('button').filter({hasText:'Campus Scout'}).click();
  await expect(alice.page.locator('#dashboardDialogTitle')).toHaveText('Your badges');
  await alice.page.locator('#closeDashboardDialog').click();
  console.log('PASS: server-confirmed Community saves and newly earned badges generate durable alerts and open the exact event/badge view.');

  const suggestionId = randomUUID();
  await source(alice,'suggestions-store','submitSuggestion',[{id:suggestionId,name:'Anonymous notification film night',host:'',anonymous:true,category:'Arts',date:'',location:'',description:'A synthetic review fixture.'}]);
  await fetch(`${endpoint}/campusSuggestionReviewers/${bob.uid}`,{method:'PATCH',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({fields:{enabled:{booleanValue:true}}})}).then(async response => assert.ok(response.ok,await response.text()));
  await source(bob,'suggestions-store','reviewSuggestion',[suggestionId,'approved','Approved test idea']);
  await openPanel(alice.page,'community');
  await expect(panel(alice.page)).toContainText('Your suggestion was approved');
  await panel(alice.page).getByRole('button').filter({hasText:'Your suggestion was approved'}).click();
  await expect(alice.page.locator(`[data-suggestion-id="${suggestionId}"]`)).toContainText('approved');
  const token = await bob.page.evaluate(() => window.campusFirebaseAuth.auth.currentUser.getIdToken());
  const ownership = await fetch(`${endpoint}/campusSuggestionOwners/${suggestionId}`,{signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${token}`}});
  assert.equal(ownership.status,403);
  const privateInbox = await fetch(`${endpoint}/campusAccountData/${alice.uid}/notifications/post-published__${postId}`,{signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${token}`}});
  assert.equal(privateInbox.status,403);
  console.log('PASS: actual review decisions notify the author, open My suggestions, and do not expose anonymous ownership or another account inbox to the reviewer.');

  await clearUnread(alice.page);
  await alice.page.reload({waitUntil:'domcontentloaded'}); await alice.page.waitForFunction(()=>window.campusAccount?.ready());
  await expect(bell(alice.page)).toHaveAttribute('aria-label','Notifications');
  await source(bob,'shared-social-store','addComment',[postId,'Offline notification fixture']);
  await openPanel(alice.page,'feed');
  await expect(panel(alice.page)).toContainText('Notification Bob commented on your post');
  await alice.context.setOffline(true);
  await expect(panel(alice.page)).toContainText('Offline. Read status has not synced.');
  await expect(panel(alice.page).getByRole('button',{name:'Mark recent notifications as read'})).toBeDisabled();
  await alice.context.setOffline(false);
  await expect(panel(alice.page).getByRole('button',{name:'Mark recent notifications as read'})).toBeEnabled();
  await alice.page.keyboard.press('Escape');
  console.log('PASS: reload does not recreate read review alerts; offline mode does not falsely acknowledge read status and reconnect recovers.');

  for(const width of [1440,768,390,320]) {
    await alice.page.setViewportSize({width,height:844});
    await openPanel(alice.page);
    const bounds=await panel(alice.page).boundingBox();
    assert.ok(bounds.x>=0 && bounds.x+bounds.width<=width+1 && bounds.y>=0 && bounds.y+bounds.height<=845);
    assert.ok(await alice.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(process.env.NOTIFICATION_SCREENSHOT_DIR && [1440,390].includes(width)) {
      await mkdir(process.env.NOTIFICATION_SCREENSHOT_DIR,{recursive:true});
      await alice.page.screenshot({path:`${process.env.NOTIFICATION_SCREENSHOT_DIR}/notifications-${width}.png`});
    }
    await alice.page.keyboard.press('Escape');
  }
  await alice.page.setViewportSize({width:1440,height:900});
  await alice.page.getByRole('button',{name:'Switch to dark mode'}).click();
  await openPanel(alice.page);
  if(process.env.NOTIFICATION_SCREENSHOT_DIR) await alice.page.screenshot({path:`${process.env.NOTIFICATION_SCREENSHOT_DIR}/notifications-dark.png`});
  await alice.page.keyboard.press('Escape');
  await source(bob,'shared-friends-store','removeConnection',[{id:connectionId,members:[bob.uid,alice.uid]}]);
  await alice.page.setViewportSize({width:390,height:844});
  await openPanel(alice.page,'feed');
  await panel(alice.page).getByRole('button').filter({hasText:'Notification Bob sent you a message'}).click();
  await expect(alice.page.locator('.feed-messenger [role=status]')).toContainText('This conversation is unavailable in your current connections.');
  await expect(alice.page.getByRole('textbox',{name:'Message text',exact:true})).toHaveCount(0);
  await alice.page.getByRole('button',{name:'Back to conversations',exact:true}).click();
  await expect(alice.page.getByRole('complementary',{name:'Conversations',exact:true})).toBeVisible();
  console.log('PASS: an old message alert after real connection deletion shows its unavailable state on mobile and returns to the inbox without rendering a message composer.');
  await alice.page.waitForFunction(()=>!window.campusAccount.status().pending);
  await alice.page.getByRole('button',{name:'Log out',exact:true}).click();
  await expect(bell(alice.page)).toHaveCount(0);
  await expect(alice.page.locator('.notification-dialog')).toHaveCount(0);
  assert.deepEqual(errors,[]);
  console.log('PASS: 1440/768/390/320px panels stay inside the viewport, dark mode renders, and logout removes private notifications with no uncaught errors.');
} catch (error) {
  if (process.env.NOTIFICATION_SCREENSHOT_DIR) {
    await mkdir(process.env.NOTIFICATION_SCREENSHOT_DIR, { recursive: true });
    for (const [index, context] of contexts.entries()) {
      const page = context.pages()[0];
      if (page && !page.isClosed()) await page.screenshot({ path: `${process.env.NOTIFICATION_SCREENSHOT_DIR}/failure-${index}.png` }).catch(() => {});
    }
  }
  throw error;
} finally {
  await Promise.all(contexts.map(context=>context.close()));
  await browser.close();
}
