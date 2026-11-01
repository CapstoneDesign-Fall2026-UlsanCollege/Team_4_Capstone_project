import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// A live readiness check, not a completed Google-account login. Fresh contexts
// reach Google's email/account page, then dismiss it without entering credentials.
const target = new URL(process.env.GOOGLE_SIGNIN_TEST_URL || 'https://campusvibe-theta.vercel.app/');
assert.ok(target.protocol === 'https:' || (target.protocol === 'http:' && target.hostname === 'localhost'), 'Use HTTPS or a local localhost preview.');
assert.ok(!target.username && !target.password && !target.search && !target.hash, 'Use a plain website URL without credentials or query parameters.');
const output = new URL('../test-results/google-signin-live/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.SMOKE_BROWSER_CHANNEL || 'chrome', headless: true });
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    try {
      const page = await context.newPage();
      await page.goto(target.href, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
      const options = await page.evaluate(() => {
        const { apiKey, projectId } = window.campusFirebaseAuth.auth.app.options;
        return { apiKey, projectId };
      });
      const endpoint = new URL('https://identitytoolkit.googleapis.com/v1/projects');
      endpoint.searchParams.set('key', options.apiKey);
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, 'Firebase public auth configuration must be available.');
      const config = await response.json();
      assert.ok(config.authorizedDomains?.includes(target.hostname), `${target.hostname} is missing from Firebase Authentication authorized domains.`);

      const popupWait = page.waitForEvent('popup', { timeout: 15000 });
      await page.locator('#googleLogin').click();
      const popup = await popupWait;
      await popup.waitForURL(url => url.origin === 'https://accounts.google.com'
        && (/^\/(?:v3\/)?signin\/(?:identifier|accountchooser|chooser)\/?$/i.test(url.pathname) || url.pathname === '/AccountChooser'), { timeout: 25000 });
      await expect(page.locator('#landingFormErr')).not.toBeVisible();
      const providerUrl = new URL(popup.url());
      await popup.close();
      await expect(page.locator('#googleLogin')).toBeEnabled({ timeout: 10000 });
      await expect(page.locator('#landingLoginForm')).toHaveAttribute('aria-busy', 'false');
      assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser === null), true);
      results.push({ viewport, siteDomain: target.hostname, projectId: options.projectId, authorizedDomain: true,
        googlePage: { origin: providerUrl.origin, path: providerUrl.pathname },
        popupDismissed: true, credentialsEntered: false, accountSignInCompleted: false, result: 'PASS' });
      console.log(JSON.stringify(results.at(-1)));
    } finally { await context.close(); }
  }
} finally { await browser.close(); }
await writeFile(new URL('results.json', output), JSON.stringify({ checkedAt: new Date().toISOString(), results,
  scope: 'Live domain authorization, Google provider-page handoff and popup-dismissal recovery. No identity selection, credentials, full account/session validation, password-reset email or shared-data submission.' }, null, 2) + '\n');
