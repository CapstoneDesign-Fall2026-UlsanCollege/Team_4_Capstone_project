import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { verifyEmulatorEmail } from './verify-emulator-email.js';

const url = process.env.EMAIL_VERIFICATION_TEST_URL || 'http://127.0.0.1:25189';
const output = process.env.EMAIL_VERIFICATION_OUTPUT || 'test-results/email-verification';
assert.equal(process.env.EMAIL_VERIFICATION_ISOLATED, '1', 'Use an isolated Auth/Firestore emulator.');
assert.match(url, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  await mkdir(output, { recursive: true });
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage(), errors = [], checks = [];
    page.on('pageerror', error => errors.push(error.message));page.setDefaultTimeout(20000);
    try {
      await page.goto(`${url}/#/community/events/1`);
      await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
      const config = await page.evaluate(() => {
        const auth = window.campusFirebaseAuth.auth;
        return { project: auth.app.options.projectId, emulator: auth.emulatorConfig };
      });
      assert.equal(config.project, 'demo-campusvibe-feed');assert.ok(config.emulator);
      const email = `verify-${randomBytes(6).toString('hex')}@example.com`, password = `Cv!${randomBytes(12).toString('hex')}A1`;
      await page.locator('.auth-signup-small').click();
      for (const [id,value] of [['suName','Verification Tester'],['suEmail',email],['suPass',password],['suPass2',password]]) await page.locator(`#${id}`).fill(value);
      await page.locator('#suInterest').selectOption('Tech');await page.locator('#signupForm button[type=submit]').click();
      await expect(page.locator('#emailVerification')).toBeVisible();await expect(page.locator('#appMain')).not.toBeVisible();
      await expect(page.locator('#emailVerificationFeedback')).toContainText('Verification email sent.');
      await expect(page.locator('#sendVerificationEmail')).toBeDisabled();
      await expect(page.locator('#verificationEmail')).toHaveText(email);
      assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser.emailVerified), false);
      assert.equal(await page.evaluate(() => !!window.campusAccount), false);
      await expect(page).toHaveURL(/#\/community\/events\/1$/);
      checks.push('New signup requests verification, shows the correct inbox, keeps deep link and blocks member mounts');
      await page.locator('#checkEmailVerification').click();
      await expect(page.locator('#emailVerificationFeedback')).toContainText('not verified yet');
      await expect(page.locator('#appMain')).not.toBeVisible();
      checks.push('Checking before opening the link does not grant access');
      // Use the SDK's actual ID token against the test runner's explicit local Firestore port.
      const unverified = await page.evaluate(async () => ({ token: await window.campusFirebaseAuth.auth.currentUser.getIdToken(), uid: window.campusFirebaseAuth.auth.currentUser.uid }));
      const dbHost = process.env.FIRESTORE_EMULATOR_HOST;
      assert.match(dbHost || '', /^127\.0\.0\.1:\d+$/);
      const rest = `http://${dbHost}/v1/projects/demo-campusvibe-feed/databases/(default)/documents`;
      const read = await fetch(`${rest}/campusPublishedEvents/verification-missing`, { headers: { Authorization: `Bearer ${unverified.token}` } });
      assert.equal(read.status, 403);
      const write = await fetch(`${rest}/campusAccountData/${unverified.uid}/state/profile`, {
        method: 'PATCH', headers: { Authorization: `Bearer ${unverified.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: { version: { integerValue: '1' }, value: { stringValue: '{}' }, updatedAt: { timestampValue: new Date().toISOString() } } }),
      });
      assert.equal(write.status, 403);
      checks.push('Direct Firestore reads and private writes are denied for the real unverified emulator token');
      await page.reload();await expect(page.locator('#emailVerification')).toBeVisible();await expect(page.locator('#appMain')).not.toBeVisible();
      await expect(page.locator('#sendVerificationEmail')).toBeEnabled();
      checks.push('Restored unverified session remains gated after reload');
      await page.evaluate(() => {
        const api = window.campusFirebaseAuth;
        window.originalSendVerification = api.sendEmailVerification;
        api.sendEmailVerification = async () => { throw { code: 'auth/too-many-requests' }; };
      });
      await page.locator('#sendVerificationEmail').click();await expect(page.locator('#emailVerificationFeedback')).toContainText('Too many email requests');
      await expect(page.locator('#sendVerificationEmail')).toBeEnabled();
      await page.evaluate(() => {
        const api = window.campusFirebaseAuth;api.sendEmailVerification = window.originalSendVerification;
        window.originalReloadUser = api.reload;api.reload = async () => { throw new Error('Connection unavailable'); };
      });
      await page.locator('#checkEmailVerification').click();await expect(page.locator('#emailVerificationFeedback')).toContainText('could not be checked');
      await expect(page.locator('#checkEmailVerification')).toBeEnabled();
      await page.evaluate(() => { window.campusFirebaseAuth.reload = window.originalReloadUser; });
      checks.push('Send throttling and verification-check failures recover without granting access or stranding controls');
      await page.locator('#verificationDifferentEmail').click();await expect(page.locator('#authLanding')).toBeVisible();
      assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser), null);
      await page.locator('#landingEmail').fill(email);await page.locator('#landingPass').fill(password);
      await page.locator('#landingLoginForm button[type=submit]').click();
      await expect(page.locator('#emailVerification')).toBeVisible();await expect(page.locator('#appMain')).not.toBeVisible();
      await page.locator('#sendVerificationEmail').click();await expect(page.locator('#emailVerificationFeedback')).toContainText('Verification email sent.');
      checks.push('Different-email action signs out; an existing unverified password account must also verify and can resend');
      await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
      await page.screenshot({ path: `${output}/verification-pending-${viewport.width}.png` });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await verifyEmulatorEmail(page);
      await expect(page.locator('#appMain')).toBeVisible();
      await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
      await page.waitForFunction(() => window.campusAccount?.ready());
      const claims = await page.evaluate(async () => (await window.campusFirebaseAuth.auth.currentUser.getIdTokenResult()).claims);
      assert.equal(claims.email_verified, true);
      checks.push('Real emulator verification code plus SDK reload/token refresh admits the same account and restores the selected event');
      await page.locator('#dashboardDialog [data-save="1"]').click();
      await expect(page.locator('#dashboardDialog [data-save="1"]')).toHaveAttribute('aria-pressed','true');
      await page.waitForFunction(() => !window.campusAccount.status().pending);
      await page.reload();await expect(page.locator('#appMain')).toBeVisible();
      await expect(page.locator('#dashboardDialog [data-save="1"]')).toHaveAttribute('aria-pressed','true');
      await page.locator('#closeDashboardDialog').click();
      await page.locator('#navAuthIn').getByRole('button', { name: 'Log out', exact: true }).click();
      await expect(page.locator('#authLanding')).toBeVisible();
      await page.locator('#landingEmail').fill(email);await page.locator('#landingPass').fill(password);
      await page.locator('#landingLoginForm button[type=submit]').click();
      await expect(page.locator('#appMain')).toBeVisible();await expect(page.locator('#emailVerification')).not.toBeVisible();
      checks.push('Verified account can persist data, reload, sign out and sign back in without another verification gate');
      assert.deepEqual(errors, []);
      results.push({ viewport, status: 'PASS', checks, passed: checks.length });
      console.log(JSON.stringify({ viewport, status: 'PASS', passed: checks.length }));
    } finally { await context.close(); }
  }
} finally { await browser.close(); }
await writeFile(`${output}/results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), results,
  scope: 'Local Auth/Firestore emulator proof with fictional mailboxes. Actual verification email delivery, Gmail identity login and independent human review are not certified.' }, null, 2)+'\n');
