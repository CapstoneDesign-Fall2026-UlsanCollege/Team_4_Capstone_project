import { verifyEmulatorEmail } from './verify-emulator-email.js';
import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const url = process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
const expect = baseExpect.configure({ timeout: 30000 });
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url)) throw new Error('Use a localhost emulator preview only.');
const browser = await chromium.launch({ channel: 'chrome' }), contexts = [], users = [], errors = [];
const project = 'demo-campusvibe-feed', endpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/projects/${project}/databases/(default)/documents`;
const output = new URL('profile-photos/', process.env.CAMPUS_TEST_ARTIFACTS_URL || new URL('../verification/', import.meta.url));
await mkdir(output, { recursive: true });
const privacyChecks = [];
async function assertNoAccountIds(page, label) {
  const strings = await page.evaluate(() => [document.body.innerText, ...[...document.querySelectorAll('[aria-label],[title]')].flatMap(el => [el.getAttribute('aria-label') || '', el.getAttribute('title') || '']), ...[...document.querySelectorAll('input')].filter(el => el.getClientRects().length).map(el => el.value)]);
  for (const person of users) assert.ok(strings.every(text => !text.includes(person.uid)), `Account ID leaked in ${label}`);
  assert.equal(await page.locator('.feed-member-id,.cvp-member-id').count(), 0);
  privacyChecks.push({ label, viewport: page.viewportSize(), status: 'PASS' });
}
const nav = page => page.getByRole('navigation', { name: 'Shared feed navigation' });
const directoryFixtures = Array.from({ length: 100 }, (_, index) => `!photo-directory-${String(index).padStart(3, '0')}`);
async function adminWrite(id, fields, collection = 'campusFeedProfiles') {
  const result = await fetch(`${endpoint}:commit`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' }, body: JSON.stringify({ writes: [{ update: { name: `projects/${project}/databases/(default)/documents/${collection}/${id}`, fields: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { stringValue: value }])) }, updateTransforms: [{ fieldPath: 'updatedAt', setToServerValue: 'REQUEST_TIME' }] }] }) });
  assert.equal(result.status, 200);
}
async function enter(credentials, signup = false) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }); contexts.push(context);
  const page = await context.newPage(); page.setDefaultTimeout(25000); page.on('pageerror', error => errors.push(error.message));
  await page.goto(url); await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
  assert.ok(await page.evaluate(() => window.campusFirebaseAuth.auth.emulatorConfig));
  assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.app.options.projectId), project);
  if (signup) {
    await page.route('**/v1/accounts:update*', async route => { await new Promise(resolve => setTimeout(resolve, 1500)); await route.continue(); });
    await page.locator('.auth-signup-small').click();
    for (const [id, value] of [['suName', credentials.name], ['suEmail', credentials.email], ['suPass', credentials.password], ['suPass2', credentials.password]]) await page.locator(`#${id}`).fill(value);
    await page.locator('#suInterest').selectOption('Tech'); await page.locator('#signupForm button[type=submit]').click();await verifyEmulatorEmail(page);
  } else {
    await page.locator('#landingEmail').fill(credentials.email); await page.locator('#landingPass').fill(credentials.password); await page.locator('#landingLoginForm button[type=submit]').click();
  }
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  const { uid, token } = await page.evaluate(async () => { const user = window.campusFirebaseAuth.auth.currentUser; return { uid: user.uid, token: await user.getIdToken() }; });
  const person = { page, context, uid, token, credentials }; if (signup) users.push(person); return person;
}
const credentials = name => ({ name, email: `photo-${randomBytes(8).toString('hex')}@example.com`, password: `Cv!${randomBytes(12).toString('hex')}A1` });
async function profile(person) { await person.page.locator('[data-workspace=community]').click(); await person.page.locator('#mainNav [data-page=profile]').click(); }
async function feed(person) { await person.page.locator('[data-workspace=feed]').click(); await person.page.locator('.shared-feed-status .connected').waitFor(); }
async function editPhoto(person, color) {
  await profile(person); await person.page.getByRole('button', { name: 'Change profile photo', exact: true }).click();
  const png = await person.page.evaluate(color => {
    const canvas = document.createElement('canvas'); canvas.width = 320; canvas.height = 200; const ctx = canvas.getContext('2d');
    ctx.fillStyle = color; ctx.fillRect(0, 0, 320, 200); ctx.fillStyle = '#ffffff'; ctx.fillRect(100, 60, 40, 40); return canvas.toDataURL('image/png').split(',')[1];
  }, color);
  await person.page.getByLabel('Choose profile photo', { exact: true }).setInputFiles({ name: 'test-avatar.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  await expect(person.page.getByRole('button', { name: 'Save photo', exact: true })).toBeEnabled();
  await expect(person.page.getByAltText('Profile photo preview')).toBeVisible();
  const photo = await person.page.getByAltText('Profile photo preview').getAttribute('src');
  assert.ok(photo.startsWith('data:image/jpeg;base64,/9j/')); assert.ok(photo.length <= 16384);
  await person.page.getByRole('button', { name: 'Save photo', exact: true }).click();
  await expect(person.page.getByRole('dialog', { name: 'Profile photo', exact: true })).toBeHidden();
  await expect(person.page.locator('#profileAvatar img')).toHaveAttribute('src', photo);
  await expect(person.page.locator('#navAvatar img')).toHaveAttribute('src', photo);
  const pixels = await person.page.locator('#profileAvatar img').evaluate(img => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, 1, 1);
    return { width: img.naturalWidth, height: img.naturalHeight, pixel: [...ctx.getImageData(0, 0, 1, 1).data] };
  });
  assert.equal(pixels.width, 128); assert.equal(pixels.height, 128); assert.ok(pixels.pixel[3] > 0); return photo;
}
try {
  const owner = await enter(credentials('Photo Tester'), true), first = await enter(credentials('Same Name'), true), second = await enter(credentials('Same Name'), true);
  for (const person of [owner, first, second]) await expect.poll(async () => {
    const result = await fetch(`${endpoint}/campusFeedProfiles/${person.uid}`, { headers: { Authorization: 'Bearer owner' } }).then(response => response.json());
    return result.fields?.name?.stringValue;
  }).toBe(person.credentials.name);
  console.log('PASS: shared profiles converge to the completed signup display name, even when Auth name updates are delayed.');
  await adminWrite(owner.uid, { name: 'Photo Tester', college: 'Privacy Test College' });
  await adminWrite(first.uid, { name: 'Same Name', college: 'North Test College' });
  await adminWrite(second.uid, { name: 'Same Name', college: 'South Test College' });
  const red = await editPhoto(first, '#c33e53'), blue = await editPhoto(second, '#206bb5'); assert.notEqual(red, blue);
  await first.page.getByRole('button', { name: 'Change profile photo', exact: true }).click();
  const input = first.page.getByLabel('Choose profile photo', { exact: true });
  await input.setInputFiles({ name: 'unsafe.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await expect(first.page.getByRole('alert')).toContainText('Choose a JPG, PNG, or WebP');
  await input.setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not a PNG') });
  await expect(first.page.getByRole('alert')).toContainText('could not be read');
  await first.page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(first.page.locator('#profileAvatar img')).toHaveAttribute('src', red);
  console.log('PASS: raster input is decoded/cropped/re-encoded; invalid SVG/corrupt files do not replace the saved photo.');

  const fresh = await enter(first.credentials); await profile(fresh);
  await expect(fresh.page.locator('#profileAvatar img')).toHaveAttribute('src', red);
  assert.equal(await fresh.page.evaluate(() => localStorage.getItem('cv_profile_photo')), null);
  console.log('PASS: profile photo restores in a fresh signed-in browser without local photo storage.');



  await feed(owner); await nav(owner.page).getByRole('button', { name: 'Friends', exact: true }).click();
  for (const person of [first, second]) {
    await owner.page.getByRole('searchbox', { name: 'Search people', exact: true }).fill(person === first ? 'North Test College' : 'South Test College');
    const card = owner.page.locator('[data-person]'); await expect(card).toHaveCount(1); await expect(card).not.toContainText(person.uid);
    await expect(card.locator('img')).toHaveAttribute('src', person === first ? red : blue);
    await card.getByRole('button', { name: 'Add friend', exact: true }).click();
    await feed(person); await nav(person.page).getByRole('button', { name: 'Friends', exact: true }).click();
    await person.page.getByRole('button', { name: 'Accept request from Photo Tester, Privacy Test College', exact: true }).click();
  }
  for (const id of directoryFixtures) await adminWrite(id, { name: 'Directory fixture', college: 'Emulator only' });
  await owner.page.getByRole('searchbox', { name: 'Search people', exact: true }).fill(first.uid);
  await expect(owner.page.locator('[data-person]')).toHaveCount(0);
  await owner.page.getByRole('searchbox', { name: 'Search people', exact: true }).fill('Same Name');
  await expect(owner.page.locator('[data-person]')).toHaveCount(2);
  await assertNoAccountIds(owner.page, 'Friends with same-name contacts beyond the directory window');
  await owner.page.screenshot({ path: fileURLToPath(new URL('same-name-friends-desktop.png', output)), fullPage: true });
  for (const width of [390, 320]) {
    await owner.page.setViewportSize({ width, height: 844 }); await assertNoAccountIds(owner.page, 'Mobile Friends'); assert.ok(await owner.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  await owner.page.setViewportSize({ width: 1440, height: 1000 });
  await nav(owner.page).getByRole('button', { name: 'Messages', exact: true }).click();
  await owner.page.getByRole('button', { name: 'Message Same Name, North Test College', exact: true }).click();
  await expect(owner.page.locator('.feed-conversation header')).not.toContainText(first.uid);
  await expect(owner.page.locator('.feed-conversation header img')).toHaveAttribute('src', red);
  await owner.page.getByRole('textbox', { name: 'Message text', exact: true }).fill('This is only for the first same-name member.');
  await owner.page.getByRole('button', { name: 'Send message', exact: true }).click();
  for (const person of [first, second]) {
    await nav(person.page).getByRole('button', { name: 'Messages', exact: true }).click();
    await person.page.getByRole('button', { name: 'Message Photo Tester, Privacy Test College', exact: true }).click();
  }
  await expect(first.page.locator('.feed-message-history')).toContainText('This is only for the first same-name member.');
  await expect(second.page.locator('.feed-message-history')).not.toContainText('This is only for the first same-name member.');
  await owner.page.getByRole('button', { name: 'Message Same Name, South Test College', exact: true }).click();
  await expect(owner.page.locator('.feed-conversation header img')).toHaveAttribute('src', blue);
  await owner.page.getByRole('textbox', { name: 'Message text', exact: true }).fill('A different private message for the second member.');
  await owner.page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(second.page.locator('.feed-message-history')).toContainText('A different private message for the second member.');
  await assertNoAccountIds(owner.page, 'Inbox and active conversation');
  console.log('PASS: duplicate display names remain distinct in Friends, requests, inbox, chat headers and actual private delivery.');

  const green = await editPhoto(second, '#27845a');
  await expect(owner.page.locator('.feed-conversation header img')).toHaveAttribute('src', green);
  await second.page.getByRole('button', { name: 'Change profile photo', exact: true }).click();
  await second.page.getByRole('button', { name: 'Remove photo', exact: true }).click();
  await second.page.getByRole('button', { name: 'Save photo', exact: true }).click();
  await expect(second.page.getByRole('dialog', { name: 'Profile photo', exact: true })).toBeHidden();
  await expect(owner.page.locator('.feed-conversation header img')).toHaveCount(0);
  await expect(owner.page.locator('.feed-conversation header')).not.toContainText(second.uid);
  await second.page.reload(); await profile(second); await expect(second.page.locator('#profileAvatar img')).toHaveCount(0);
  console.log('PASS: replacement/removal reaches another browser live; initials and public college context remain without exposing account IDs.');

  await feed(first); await nav(first.page).getByRole('button', { name: 'Latest posts', exact: true }).click();
  await first.page.getByRole('textbox', { name: 'Your college', exact: true }).fill('Photo Test College');
  await first.page.getByRole('textbox', { name: 'Post text', exact: true }).fill('A post with a real profile thumbnail, not a photo attachment.');
  await first.page.getByRole('button', { name: 'Post', exact: true }).click();
  const ownPost = first.page.locator('[data-shared-post]').filter({ hasText: 'A post with a real profile thumbnail, not a photo attachment.' });
  await expect(ownPost.locator('header img')).toHaveAttribute('src', red);
  await ownPost.getByRole('button', { name: 'Comment', exact: true }).click();
  await first.page.getByRole('textbox', { name: 'Write a comment', exact: true }).fill('Identity follows the commenter too.');
  await first.page.getByRole('button', { name: 'Send comment', exact: true }).click();
  await expect(ownPost.locator('.feed-comment img')).toHaveAttribute('src', red);
  await expect(first.page.getByRole('button', { name: 'Photos', exact: true })).toBeEnabled();
  await assertNoAccountIds(first.page, 'Shared posts and comments');
  await profile(first); await expect(first.page.locator('#profileAvatar img')).toHaveAttribute('src', red);
  await assertNoAccountIds(first.page, 'Own profile and privacy copy');
  await first.page.getByRole('button', { name: 'Change profile photo', exact: true }).click(); await first.context.setOffline(true);
  await first.page.getByRole('button', { name: 'Remove photo', exact: true }).click(); await first.page.getByRole('button', { name: 'Save photo', exact: true }).click();
  await expect(first.page.getByRole('alert')).toContainText('Reconnect'); await first.context.setOffline(false);
  await first.page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(first.page.locator('#profileAvatar img')).toHaveAttribute('src', red);
  console.log('PASS: changing Feed college preserves photo; posts/comments use it, identity remains private and offline changes are not called saved.');

  await adminWrite(first.uid, { photo: 'data:image/jpeg;base64,/9j/AAAA==' }, 'campusProfilePhotos');
  await expect(first.page.locator('#profileAvatar img')).toHaveCount(0);
  await expect(owner.page.locator('.feed-message-inbox button').filter({ hasText: 'Photo Test College' }).locator('img')).toHaveCount(0);
  await adminWrite(first.uid, { photo: red }, 'campusProfilePhotos');
  await expect(fresh.page.locator('#profileAvatar img')).toHaveAttribute('src', red);
  console.log('PASS: malformed image bytes from a bypass client fall back to initials; known contacts resolve outside the bounded directory without ID search.');

  await fresh.page.locator('#toast').waitFor({ state: 'hidden' });
  await fresh.page.screenshot({ path: fileURLToPath(new URL('profile-photo-desktop.png', output)), fullPage: true });
  await fresh.page.setViewportSize({ width: 390, height: 844 }); await fresh.page.screenshot({ path: fileURLToPath(new URL('profile-photo-mobile.png', output)), fullPage: true });
  assert.ok(await fresh.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await owner.page.getByRole('button', { name: 'Message Same Name, Photo Test College', exact: true }).click();
  await owner.page.setViewportSize({ width: 390, height: 844 }); await assertNoAccountIds(owner.page, 'Mobile private conversation'); await owner.page.screenshot({ path: fileURLToPath(new URL('same-name-chat-mobile.png', output)), fullPage: true });
  assert.ok(await owner.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await fresh.page.getByRole('button', { name: 'Log out', exact: true }).click(); await fresh.page.locator('#landingDemo').click();
  await expect(fresh.page.locator('#navAvatar img')).toHaveCount(0); await fresh.page.locator('#mainNav [data-page=profile]').click(); await expect(fresh.page.locator('#profileAvatar img')).toHaveCount(0);
  assert.deepEqual(errors, []);
  await writeFile(new URL('privacy-results.json', output), JSON.stringify({ checkedAt: new Date().toISOString(), checks: privacyChecks, scope: 'Local Auth/Firestore emulator workflow with fictional verified accounts. UI text/labels/search privacy and correct recipient delivery; internal IDs remain in client/server data.' }, null, 2));
} finally {
  await Promise.all(contexts.map(context => context.close()));
  const docs = await fetch(`${endpoint}/campusFeedPosts`, { headers: { Authorization: 'Bearer owner' } }).then(response => response.json());
  for (const item of docs.documents || []) if (users.some(user => user.uid === item.fields.authorId?.stringValue)) await fetch(`http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/${item.name}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
  for (const user of users) {
    await fetch(`${endpoint}/campusProfilePhotos/${user.uid}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
    await fetch(`${endpoint}/campusFeedProfiles/${user.uid}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
    for (const section of ['profile', 'saved', 'dashboard', 'badges', 'suggestion', 'assistant']) await fetch(`${endpoint}/campusAccountData/${user.uid}/state/${section}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
    await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9199'}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: user.token }) });
  }
  for (const id of directoryFixtures) await fetch(`${endpoint}/campusFeedProfiles/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
  await browser.close();
}
