import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';

const url = process.env.SUGGEST_TEST_URL || 'http://127.0.0.1:5186';
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url)) throw new Error('Use an emulator-backed localhost preview only.');
const project = 'demo-campusvibe-feed';
const rest = `http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const contexts = [], users = [], errors = [], ids = [];
async function admin(path, body) {
  const response = await fetch(`${rest}/${path}`, { method: body ? 'PATCH' : 'DELETE', headers: { Authorization: 'Bearer owner', 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
  assert.ok(response.ok || (!body && response.status === 404), `${path}: ${await response.text()}`);
}
try {
  async function create(name) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    contexts.push(context);
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.waitForFunction(() => window.campusFirebaseAuth?.auth);
    assert.equal(await page.evaluate(() => window.campusFirebaseAuth.auth.app.options.projectId), project);
    assert.ok(await page.evaluate(() => window.campusFirebaseAuth.auth.emulatorConfig));
    await page.locator('.auth-signup-small').click();
    await page.locator('#suName').fill(name);
    await page.locator('#suEmail').fill(`suggest-${randomBytes(8).toString('hex')}@example.com`);
    const password = `Cv!${randomBytes(12).toString('hex')}A1`;
    await page.locator('#suPass').fill(password);
    await page.locator('#suPass2').fill(password);
    await page.locator('#suInterest').selectOption('Tech');
    await page.locator('#signupForm button[type=submit]').click();
    await page.locator('#appMain').waitFor({ state: 'visible' });
    const uid = await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser.uid);
    users.push(uid);
    await page.locator('#mainNav [data-page=suggest]').click();
    await page.locator('#suggestName').waitFor();
    return { page, uid };
  }
  const author = await create('Suggestion Alice'), reviewer = await create('Suggestion Reviewer');
  await admin(`campusSuggestionReviewers/${reviewer.uid}`, { fields: { enabled: { booleanValue: true } } });
  await reviewer.page.getByRole('button', { name: 'Team review', exact: true }).waitFor();
  assert.equal(await author.page.getByRole('button', { name: 'Team review', exact: true }).count(), 0);
  const page = author.page;
  await page.locator('#suggestName').fill('Anonymous campus film night');
  await page.locator('#suggestHost').fill('Private Film Club');
  await page.getByRole('button', { name: 'More', exact: true }).click();
  await page.getByRole('button', { name: 'Social', exact: true }).click();
  await page.locator('#suggestDate').fill('2026-11-20');
  await page.locator('#suggestLocation').fill('Campus lawn');
  await page.locator('#suggestDescription').fill('A welcoming outdoor film night for all students.');
  await page.locator('#suggestAnonymous').check();
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await page.reload();
  await page.locator('#suggestName').waitFor();
  assert.equal(await page.locator('#suggestName').inputValue(), 'Anonymous campus film night');
  assert.equal(await page.locator('#suggestAnonymous').isChecked(), true);
  assert.equal(await page.locator('#suggestDate').inputValue(), '2026-11-20');
  const submittedDraft = await page.evaluate(uid => JSON.parse(localStorage.getItem(`cv_suggestion_draft_${uid}`)), author.uid);
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  let item = page.locator('.suggestion-receipt').filter({ hasText: 'Anonymous campus film night' });
  await item.waitFor();
  ids.push(await item.getAttribute('data-suggestion-id'));
  await reviewer.page.getByRole('button', { name: 'Team review', exact: true }).click();
  const queueItem = reviewer.page.locator('.suggestion-receipt').filter({ hasText: 'Anonymous campus film night' });
  await queueItem.waitFor();
  assert.ok((await queueItem.textContent()).includes('Anonymous student'));
  assert.ok(!(await queueItem.textContent()).includes('Private Film Club'));
  assert.ok(!(await queueItem.textContent()).includes('Suggestion Alice'));
  await queueItem.getByRole('textbox', { name: /Review note/ }).fill('Approved for planning; confirm venue first.');
  await queueItem.getByRole('button', { name: 'Approve idea', exact: true }).click();
  await item.locator('.suggestion-status.approved').waitFor();
  await page.reload();
  await page.getByRole('button', { name: 'My suggestions', exact: true }).click();
  item = page.locator('.suggestion-receipt').filter({ hasText: 'Anonymous campus film night' });
  await item.locator('.suggestion-status.approved').waitFor();
  assert.ok((await item.textContent()).includes('confirm venue first'));
  await page.evaluate(({ uid, value }) => localStorage.setItem(`cv_suggestion_draft_${uid}`, JSON.stringify(value)), { uid: author.uid, value: submittedDraft });
  await page.reload();
  await page.locator('#suggestName').waitFor();
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  await page.locator('.suggestion-receipt').filter({ hasText: 'Anonymous campus film night' }).waitFor();
  assert.equal(await page.locator('.suggestion-receipt').filter({ hasText: 'Anonymous campus film night' }).count(), 1, 'Retrying a confirmed draft must not duplicate it');
  await page.getByRole('button', { name: 'New idea', exact: true }).click();
  await page.locator('#suggestName').fill('Named workshop');
  await page.locator('#suggestHost').fill('Student Club');
  await page.locator('#suggestDescription').fill('A hands-on campus workshop.');
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  const named = page.locator('.suggestion-receipt').filter({ hasText: 'Named workshop' });
  await named.waitFor(); ids.push(await named.getAttribute('data-suggestion-id'));
  await reviewer.page.getByRole('combobox', { name: 'Review status', exact: true }).selectOption('pending');
  const namedReview = reviewer.page.locator('.suggestion-receipt').filter({ hasText: 'Named workshop' });
  await namedReview.waitFor();
  assert.ok((await namedReview.textContent()).includes('Suggestion Alice / Student Club'));
  await namedReview.getByRole('button', { name: 'Decline', exact: true }).click();
  await named.locator('.suggestion-status.declined').waitFor();
  await page.getByRole('button', { name: 'New idea', exact: true }).click();
  await page.locator('#suggestName').fill('Draft survives a failed send');
  await page.locator('#suggestHost').fill('Draft Club');
  await page.locator('#suggestDescription').fill('A private draft for retry testing.');
  await author.page.context().setOffline(true);
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'offline' }).waitFor();
  assert.equal(await page.locator('#suggestName').inputValue(), 'Draft survives a failed send');
  await author.page.context().setOffline(false);
  await page.locator('#suggestName').fill('Film night under the stars');
  const screenshots = process.env.SUGGEST_SCREENSHOT_DIR || 'verification/suggestions';
  await mkdir(screenshots, { recursive: true });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
    if ([1440,390].includes(width)) await page.screenshot({ path: `${screenshots}/suggest-${width}.png`, fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, checks: ['private draft reload','anonymous submission','named submission','reviewer-only queue','approve/decline','live author status','reload persistence','idempotent retry','offline recovery','responsive 1440/768/390/320'], pageErrors: errors }));
} finally {
  await browser.close();
  for (const id of ids) { await admin(`campusSuggestions/${id}`); await admin(`campusSuggestionOwners/${id}`); }
  for (const uid of users) { await admin(`campusSuggestionReviewers/${uid}`); await admin(`campusFeedProfiles/${uid}`); }
  await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${project}/accounts`, { method: 'DELETE' });
}
