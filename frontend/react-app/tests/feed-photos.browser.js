import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { FEED_PHOTO_BYTES } from '../src/feed-photo.js';

const url = process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url)) throw new Error('Use the local Firebase emulator preview.');
const expect = baseExpect.configure({ timeout: 30000 });
const endpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8180'}/v1/projects/demo-campusvibe-feed/databases/(default)/documents`;
const image = await readFile(new URL('../public/assets/campus-dashboard.jpg', import.meta.url));
const browser = await chromium.launch({ channel: 'chrome' }), errors = [], contexts = [], calls = [];
let rejectUpload = false, rejectCleanup = false, lastPostId = '';

async function enter(name) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }); contexts.push(context);
  await context.route('https://res.cloudinary.com/ghr7xnsl/image/upload/**', route => route.fulfill({ contentType: 'image/jpeg', body: image }));
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  let uid;
  await context.route('**/api/feed-photo', async route => {
    assert.match(route.request().headers().authorization, /^Bearer /);
    const body = route.request().postDataJSON(); calls.push(body.action);
    const respond = (status, data) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });
    if (body.action === 'upload') {
      if (rejectUpload) return respond(429, { error: 'You have reached 20 photo upload attempts in 24 hours. Text posts are still available.' });
      assert.match(body.image, /^data:image\/jpeg;base64,\/9j\//);
      assert.ok(Buffer.from(body.image.slice(23), 'base64').length <= FEED_PHOTO_BYTES);
      lastPostId = body.postId;
      const publicId = `campusvibe-feed/${uid}/${body.postId}`;
      return respond(200, { photo: { publicId, src: `https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${publicId}.jpg`, width: 800, height: 600 } });
    }
    if (body.action === 'delete' && rejectCleanup) return respond(503, { error: 'Temporary photo cleanup failure.' });
    return respond(200, { deleted: true });
  });
  await page.goto(url); await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
  assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.app.options.projectId), 'demo-campusvibe-feed');
  assert.ok(await page.evaluate(() => window.campusFirebaseAuth.auth.emulatorConfig));
  await page.locator('.auth-signup-small').click();
  const password = `Cv!${randomBytes(12).toString('hex')}A1`;
  for (const [id, value] of [['suName', name], ['suEmail', `feed-photo-${randomBytes(8).toString('hex')}@example.com`], ['suPass', password], ['suPass2', password]]) await page.locator(`#${id}`).fill(value);
  await page.locator('#suInterest').selectOption('Tech'); await page.locator('#signupForm button[type=submit]').click();
  await expect(page.locator('.account-sync-status')).toHaveText('Saved to your account');
  uid = await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser.uid);
  await page.locator('[data-workspace=feed]').click(); await page.locator('.shared-feed-status .connected').waitFor();
  return { page, uid };
}
const fixture = { name: 'campus.jpg', mimeType: 'image/jpeg', buffer: image };
async function attach(page) {
  await page.getByLabel('Attach photos', { exact: true }).setInputFiles(fixture);
  await expect(page.locator('.feed-attachment-previews img')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Post', exact: true })).toBeEnabled();
}
async function deletePost(page, card) {
  await card.locator('summary').click(); await card.getByRole('button', { name: 'Delete post', exact: true }).click();
  await page.getByRole('dialog', { name: 'Delete this post?', exact: true }).getByRole('button', { name: 'Delete post', exact: true }).click();
}

try {
  const alice = await enter('Photo Alice'), bob = await enter('Photo Bob');
  const page = alice.page;
  await page.getByRole('textbox', { name: 'Your college', exact: true }).fill('Photo Test Campus');
  await page.getByLabel('Attach photos', { exact: true }).setInputFiles({ name: 'not-a-photo.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await expect(page.locator('.feed-form-error')).toContainText('JPG, PNG, or WebP'); assert.equal(calls.length, 0);
  assert.equal(await page.getByLabel('Attach photos', { exact: true }).evaluate(input => input.multiple), false);
  await attach(page); await expect(page.getByRole('button', { name: 'Photos', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Remove photo 1', exact: true }).click();
  await expect(page.locator('.feed-attachment-previews img')).toHaveCount(0); assert.equal(calls.length, 0);
  await attach(page); rejectUpload = true;
  await page.getByRole('button', { name: 'Post', exact: true }).click();
  await expect(page.locator('.feed-error')).toContainText('20 photo upload attempts');
  await expect(page.locator('.feed-attachment-previews img')).toBeVisible();
  rejectUpload = false;
  await page.getByRole('button', { name: 'Post', exact: true }).click();
  await expect(page.locator('.feed-attachment-previews img')).toHaveCount(0);
  const id = lastPostId;
  let card = page.locator(`[data-shared-post="${id}"]`);
  await expect(card.locator('.feed-post-photos img')).toBeVisible();
  await expect(bob.page.locator(`[data-shared-post="${id}"] .feed-post-photos img`)).toBeVisible();
  await card.getByRole('button', { name: 'Open photo: Shared campus photo', exact: true }).click();
  const lightbox = page.getByRole('dialog', { name: 'Post photo', exact: true });
  await expect(lightbox.locator('img')).toBeVisible();
  assert.ok(await lightbox.locator('img').evaluate(img => img.complete && img.naturalWidth > 0));
  await lightbox.getByRole('button', { name: 'Close', exact: true }).click();
  await card.locator('summary').click(); await card.getByRole('button', { name: 'Edit post', exact: true }).click();
  const edit = page.getByRole('dialog', { name: 'Edit post', exact: true });
  await expect(edit.locator('.feed-attachment-previews img')).toBeVisible();
  await edit.getByRole('textbox', { name: 'Post text', exact: true }).fill('Photo remains after editing the caption.');
  await edit.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(card).toContainText('Photo remains after editing the caption.');
  await page.reload(); await page.locator('.shared-feed-status .connected').waitFor();
  card = page.locator(`[data-shared-post="${id}"]`);
  await expect(card.locator('.feed-post-photos img')).toBeVisible();
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.ok(await card.locator('.feed-post-photos img').evaluate(img => img.complete && img.naturalWidth > 0));
    if (process.env.CAMPUS_TEST_ARTIFACTS_URL) {
      const output = new URL('feed-photos/', process.env.CAMPUS_TEST_ARTIFACTS_URL); await mkdir(output, { recursive: true });
      await page.screenshot({ path: fileURLToPath(new URL(`shared-photo-${width}.png`, output)), fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  rejectCleanup = true; await deletePost(page, card);
  await expect(page.locator('.feed-error')).toContainText('deletion is incomplete');
  await expect(card.getByRole('status')).toHaveText('Deletion pending');
  const frozen = await fetch(`${endpoint}/campusFeedPosts/${id}`, { headers: { Authorization: 'Bearer owner' } }); assert.equal(frozen.status, 200);
  rejectCleanup = false;
  await page.getByRole('dialog', { name: 'Delete this post?', exact: true }).getByRole('button', { name: 'Delete post', exact: true }).click();
  await expect(card).toHaveCount(0); await expect(bob.page.locator(`[data-shared-post="${id}"]`)).toHaveCount(0);
  assert.equal((await fetch(`${endpoint}/campusFeedPosts/${id}`, { headers: { Authorization: 'Bearer owner' } })).status, 404);
  assert.deepEqual(errors, []);
  console.log('PASS: photo validation, compression, removable previews, quota failure recovery, photo-only publishing, cross-account delivery, caption edits, reload persistence, working lightbox, desktop/mobile fit, and retryable deletion cleanup. Cloudinary requests mocked: no upload credits consumed.');
} finally { await browser.close(); }
