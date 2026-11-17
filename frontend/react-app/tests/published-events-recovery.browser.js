import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import { verifyEmulatorEmail } from './verify-emulator-email.js';

// This suite changes rules in its dedicated local emulator. Never target production.
assert.equal(process.env.PUBLISHED_EVENTS_RECOVERY_ISOLATED, 'true', 'Explicitly confirm a dedicated, empty emulator instance.');
const target = new URL(process.env.PUBLISHED_EVENTS_RECOVERY_URL || '');
assert.equal(target.protocol, 'http:');
assert.ok(['localhost', '127.0.0.1'].includes(target.hostname) && target.port);
const localHost = name => {
  const value = process.env[name];
  assert.match(value || '', /^(localhost|127\.0\.0\.1):\d+$/, `${name} must explicitly name a local emulator.`);
  return value;
};
const firestoreHost = localHost('FIRESTORE_EMULATOR_HOST');
const authHost = localHost('FIREBASE_AUTH_EMULATOR_HOST');
const project = 'demo-campusvibe-feed';
const output = process.env.PUBLISHED_EVENTS_RECOVERY_OUTPUT || 'test-results/published-events-recovery';
const rules = await readFile(new URL('../../../backend/firebase/firestore.rules', import.meta.url), 'utf8');
const ruleBoundary = /match \/campusPublishedEvents\/\{id\} \{\s*allow get: if member\(\);\s*allow list: if member\(\) && bounded\(100\);/;
assert.match(rules, ruleBoundary);
const deniedRules = rules.replace(ruleBoundary, 'match /campusPublishedEvents/{id} {\n      allow get, list: if false;');
const rest = `http://${firestoreHost}/v1/projects/${project}/databases/(default)/documents`;
const results = [], created = [], errors = [];
const browser = await chromium.launch({ channel: process.env.SMOKE_BROWSER_CHANNEL || 'chrome', headless: true });
await mkdir(output, { recursive: true });

async function installRules(content) {
  const response = await fetch(`http://${firestoreHost}/emulator/v1/projects/${project}:securityRules`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rules: { files: [{ content }] } }),
  });
  assert.ok(response.ok, `Local emulator rules update failed: ${response.status}`);
}
async function fixture(id, fields) {
  const response = await fetch(`${rest}/campusPublishedEvents/${id}`, {
    method: fields ? 'PATCH' : 'DELETE', headers: { Authorization: 'Bearer owner', 'Content-Type': 'application/json' },
    ...(fields ? { body: JSON.stringify({ fields }) } : {}),
  });
  assert.ok(response.ok || (!fields && response.status === 404), `Local fixture operation failed: ${response.status}`);
}
function record(viewport, name, actual, method) {
  const result = { viewport, name, status: 'PASS', actual, method };
  results.push(result); console.log(JSON.stringify(result));
}
async function waitForServerCatalogue(page, title) {
  await expect(page.locator('#eventCatalogStatus')).toContainText('published campus events');
  await expect(page.locator('#eventCatalogStatus')).not.toContainText('Cached results');
  await expect(page.locator('#eventCatalogStatus [role=alert]')).toHaveCount(0);
  await page.waitForFunction(value => window.campusEventCatalog.some(event => event.title === value), title);
}

try {
  await installRules(rules);
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const nonce = randomBytes(6).toString('hex'), sourceId = `recovery-${nonce}`;
    const title = `Candidate recovery fixture ${viewport.width}`;
    const eventId = 100000 + viewport.width;
    const email = `recovery-${nonce}@example.com`, password = `Cv!${randomBytes(12).toString('hex')}A1`;
    await fixture(sourceId, { id: { integerValue: String(eventId) }, sourceSuggestionId: { stringValue: sourceId },
      title: { stringValue: title }, interest: { stringValue: 'Tech' }, host: { stringValue: 'Fixture Club' },
      desc: { stringValue: 'Fictional local event for candidate recovery testing.' }, date: { stringValue: '2026-11-20' },
      time: { stringValue: '18:30' }, location: { stringValue: 'Fixture campus room' }, publishedAt: { timestampValue: new Date().toISOString() } });
    const context = await browser.newContext({ viewport });
    const page = await context.newPage(); page.setDefaultTimeout(25000);
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(target.href); await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
    const config = await page.evaluate(async () => {
      const { db } = await import('/src/shared-feed-store.js');
      return { project: window.campusFirebaseAuth.auth.app.options.projectId,
        auth: window.campusFirebaseAuth.auth.emulatorConfig, firestore: db._settings.host };
    });
    assert.equal(config.project, project); assert.equal(`${config.auth.host}:${config.auth.port}`, authHost); assert.equal(config.firestore, firestoreHost);
    await page.locator('.auth-signup-small').click();
    await page.locator('#suName').fill('Recovery fixture student'); await page.locator('#suEmail').fill(email);
    await page.locator('#suPass').fill(password); await page.locator('#suPass2').fill(password); await page.locator('#suInterest').selectOption('Tech');
    await page.locator('#signupForm button[type=submit]').click(); await verifyEmulatorEmail(page);
    await expect(page.locator('#appMain')).toBeVisible(); await page.waitForFunction(() => window.campusAccount?.ready());
    const identity = await page.evaluate(async () => ({ uid: window.campusFirebaseAuth.auth.currentUser.uid,
      token: await window.campusFirebaseAuth.auth.currentUser.getIdToken() }));
    created.push({ ...identity, sourceId });
    record(viewport, 'verified emulator authentication', 'Signup requests a local verification code; applying that code and checking verification opens the app.', 'Real local Auth Emulator, not Gmail/Google or inbox delivery');
    await waitForServerCatalogue(page, title);
    await page.locator('#mainNav [data-page=dashboard]').click(); await expect(page.locator('#page-dashboard')).toBeVisible();
    await page.locator('#mainNav [data-page=discover]').click(); await page.locator('#filterBar [data-interest=Tech]').click();
    await page.locator('#eventSearch').fill(title);
    const card = page.locator(`#eventsGrid [data-event-id="${eventId}"]`); await expect(card).toBeVisible();
    await expect(card).toContainText('Published campus event'); await card.locator('[data-discover-event]').click();
    await expect(page.locator('#dashboardDialogTitle')).toHaveText(title); await expect(page.locator('#dashboardDialog')).toContainText('Fixture campus room');
    await page.locator('#closeDashboardDialog').click();
    record(viewport, 'authenticated published-event core path', 'Dashboard, category/search and Event Details show the seeded emulator event and its location.', 'Unmocked Auth/Firestore Emulators and application');
    await page.locator('#eventSearch').fill('no-matching-recovery-event'); await expect(page.locator('#emptyState')).toBeVisible();
    await page.locator('#clearEventFilters').click(); await expect(page.locator('#emptyState')).not.toBeVisible(); await expect(card).toBeVisible();
    record(viewport, 'empty-search recovery', 'A search with no matches shows an empty state; Clear filters restores published and sample events.', 'Application UI against local Firestore');
    await page.reload(); await page.waitForFunction(() => window.campusAccount?.ready()); await waitForServerCatalogue(page, title);
    record(viewport, 'refresh and restored session', 'The verified local session and server-backed published event return after reload.', 'Auth/Firestore Emulators, not deployed Google-session proof');

    await installRules(deniedRules);
    // Reload creates an actual new application listener under the denied local rules.
    await page.reload(); await page.waitForFunction(() => window.campusAccount?.ready());
    // Diagnose the same SDK query without replacing the application's error callback.
    await page.evaluate(async () => {
      const { watchPublishedEvents } = await import('/src/published-events-store.js');
      window.__catalogDiagnostics = [];
      window.__stopCatalogDiagnostic = watchPublishedEvents(window.campusAccount.user, () => {}, error => window.__catalogDiagnostics.push(error.code));
    });
    await page.waitForFunction(() => window.__catalogDiagnostics.includes('permission-denied'));
    const warning = page.locator('#eventCatalogStatus [role=alert]');
    await expect(warning).toContainText('Shared events could not be refreshed');
    await expect(warning.getByRole('button', { name: 'Retry shared events', exact: true })).toBeVisible();
    await page.locator('#mainNav [data-page=discover]').click(); await page.locator('#clearEventFilters').click();
    await expect(page.locator('#eventsGrid [data-event-id="1"]')).toBeVisible();
    await page.screenshot({ path: `${output}/permission-denied-${viewport.width}.png`, fullPage: true });
    record(viewport, 'application permission-denied runtime', 'The actual emulator query returns permission-denied; the application displays its terminal error and Retry while sample listings remain available.', 'Changed rules only in dedicated local emulator; same-query SDK diagnostic, unmodified App/store');
    await installRules(rules); await warning.getByRole('button', { name: 'Retry shared events', exact: true }).click();
    await waitForServerCatalogue(page, title);
    record(viewport, 'Retry after permission restoration', 'Clicking the real Retry control reconnects the application, restores the published event and removes the terminal alert.', 'Unmodified application and restored local repository rules');

    // A terminal load failure is injected at the store boundary, never described as a real provider outage.
    await page.route('**/src/published-events-store.js*', async route => {
      const response = await route.fetch(); let source = await response.text();
      const signature = /(?:export\s+)?function\s+watchPublishedEvents\s*\(\s*user\s*,\s*receive\s*,\s*fail\s*\)\s*\{/;
      assert.match(source, signature);
      source = source.replace(signature, match => `${match}\n  if (!window.__terminalCatalogFailureInjected) { window.__terminalCatalogFailureInjected = true; const timer = setTimeout(() => fail({code:'failed-precondition',message:'Controlled terminal load fixture'}), 100); return () => clearTimeout(timer); }`);
      await route.fulfill({ response, body: source });
    });
    await page.reload(); await page.waitForFunction(() => window.campusAccount?.ready());
    await expect(warning).toContainText('Shared events could not be refreshed');
    await page.screenshot({ path: `${output}/terminal-load-error-${viewport.width}.png`, fullPage: true });
    record(viewport, 'application terminal loading-error runtime', 'A controlled failed-precondition callback produces the actual application error UI and Retry control.', 'Browser-controlled store-boundary injection; not a real Firestore/provider failure');
    await warning.getByRole('button', { name: 'Retry shared events', exact: true }).click(); await waitForServerCatalogue(page, title);
    await page.screenshot({ path: `${output}/recovered-${viewport.width}.png`, fullPage: true });
    record(viewport, 'Retry after controlled loading error', 'Retry starts the original SDK listener, loads the emulator event and clears the alert.', 'Injected first callback only; recovery uses actual local Firestore');
    await page.unroute('**/src/published-events-store.js*');
    await page.getByRole('button', { name: 'Log out', exact: true }).click(); await expect(page.locator('#authLanding')).toBeVisible();
    record(viewport, 'logout', 'Logout returns to the landing view.', 'Actual local Firebase signOut');
    await context.close(); await fixture(sourceId);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await installRules(rules);
  for (const user of created) {
    await fixture(user.sourceId);
    const response = await fetch(`http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:delete?key=emulator`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: user.token }),
    });
    assert.ok(response.ok, 'Delete only the fictional test account.');
  }
}
await writeFile(`${output}/results.json`, JSON.stringify({ status: 'PASS', checkedAt: new Date().toISOString(), project,
  target: target.href, authHost, firestoreHost, execution: 'Codex-assisted local Chrome, Auth and Firestore Emulators',
  independentHumanReview: false, results, pageErrors: errors,
  limits: ['Fictional local accounts/events; no production data/provider change.', 'Terminal loading failure is controlled callback injection.', 'Not an independent teammate check or team freeze approval.'] }, null, 2) + '\n');
