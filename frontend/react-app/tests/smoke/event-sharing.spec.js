import { test, expect } from '@playwright/test';

test('a shared sample link survives demo entry, copy and reload without bypassing sign-in', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedEventLink = value; } } });
  });
  await page.goto('/#/community/events/1');
  await expect(page.locator('#authLanding')).toBeVisible();await expect(page.locator('#appMain')).not.toBeVisible();
  await page.locator('#landingDemo').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await expect(page).toHaveURL(/#\/community\/events\/1$/);
  await expect(page.locator('.event-share-manual')).not.toBeVisible();
  await page.getByRole('button', { name: 'Share event', exact: true }).click();
  await expect(page.locator('.event-share-manual')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Share with apps', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.locator('.event-share-status')).toHaveText('Event link copied. Paste it into a message to share.');
  expect(await page.evaluate(() => window.copiedEventLink)).toMatch(/\/#\/community\/events\/1$/);
  await page.reload();await expect(page.locator('#authLanding')).toBeVisible();
  await page.locator('#landingDemo').click();await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await page.locator('#closeDashboardDialog').click();
  await expect(page).toHaveURL(/#\/community\/discover$/);await expect(page.locator('#dashboardDialog')).not.toBeVisible();
});

test('event history restores the event and closing returns to its originating page', async ({ page }) => {
  await page.goto('/');await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await page.locator('#dashboardRecommendations .recommendation-open').first().click();
  await expect(page).toHaveURL(/#\/community\/events\/[1-9]\d*$/);
  const title = await page.locator('#dashboardDialogTitle').innerText();
  await page.goBack();await expect(page.locator('#dashboardDialog')).not.toBeVisible();
  await expect(page.locator('#page-dashboard')).toBeVisible();
  await page.goForward();await expect(page.locator('#dashboardDialog')).toBeVisible();await expect(page.locator('#dashboardDialogTitle')).toHaveText(title);
  await page.locator('#closeDashboardDialog').click();
  await expect(page).toHaveURL(/#\/community\/dashboard$/);
  await expect(page.locator('#page-dashboard')).toBeVisible();
});

test('cancelled native sharing stays usable and denied clipboard reveals a selectable fallback', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('Cancelled', 'AbortError'); } });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Clipboard blocked'); } } });
  });
  await page.goto('/#/community/events/2');await page.locator('#landingDemo').click();
  const share = page.getByRole('button', { name: 'Share event', exact: true });
  await share.click();
  const apps = page.getByRole('button', { name: 'Share with apps', exact: true });
  await apps.click();await expect(apps).toBeEnabled();await expect(share).toBeEnabled();
  await expect(page.locator('.event-share-status')).toContainText('cancelled or no app is available');
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.locator('.event-share-status')).toHaveText('Automatic copying is unavailable. Select and copy the event link below.');
  const fallback = page.getByRole('textbox', { name: 'Event link', exact: true });
  await expect(fallback).toBeVisible();await expect(fallback).toBeFocused();await expect(fallback).toHaveValue(/#\/community\/events\/2$/);
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('share-fallback-dark.png') });
});

test('unavailable and malformed links have a route back to event discovery', async ({ page }) => {
  await page.goto('/#/community/events/99');await page.locator('#landingDemo').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Event unavailable');
  await page.locator('#dashboardDialog').getByRole('button', { name: 'Browse events', exact: true }).click();
  await expect(page).toHaveURL(/#\/community\/discover$/);
  await page.goto('/#/community/events/1e3');
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Invalid event link');
  await expect(page.locator('#dashboardDialog')).not.toContainText('Opening shared event');
});

test('published links require a real member and the sign-in action preserves their destination', async ({ page }) => {
  await page.goto('/#/community/events/1000');await page.locator('#landingDemo').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Sign in to view this event');
  await page.locator('#dashboardDialog').getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.locator('#authModal')).toBeVisible();
  await expect(page).toHaveURL(/#\/community\/events\/1000$/);
  expect(await page.evaluate(() => window.campusFirebaseAuth.auth.currentUser)).toBeNull();
});

test('a pending native share cannot hide or block Copy link and its late completion cannot replace copy feedback', async ({ page }) => {
  await page.addInitScript(() => {
    window.nativeShareCalls = 0;
    Object.defineProperty(navigator, 'share', { configurable: true, value: data => {
      window.nativeShareCalls++;window.nativeShareData = data;
      window.nativeShareActivated = navigator.userActivation.isActive;
      return new Promise(resolve => { window.finishNativeShare = resolve; });
    } });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedEventLink = value; } } });
  });
  await page.goto('/#/community/events/1');await page.locator('#landingDemo').click();
  const share = page.getByRole('button', { name: 'Share event', exact: true });
  await share.click();
  await expect(share).toBeEnabled();await expect(share).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => window.nativeShareCalls)).toBe(0);
  const copy = page.getByRole('button', { name: 'Copy link', exact: true });
  await expect(copy).toBeFocused();
  const apps = page.getByRole('button', { name: 'Share with apps', exact: true });
  await apps.click();await expect(apps).toBeDisabled();
  await expect(copy).toBeEnabled();await expect(page.getByRole('textbox', { name: 'Event link', exact: true })).toBeVisible();
  await expect(page.locator('.event-share-status')).toContainText('You can still copy');
  expect(await page.evaluate(() => window.nativeShareActivated)).toBe(true);
  expect(await page.evaluate(() => window.nativeShareData)).toEqual({ title: 'HackNight: Build-a-Thon', url: `${new URL(page.url()).origin}/#/community/events/1` });
  await copy.click();await expect(page.locator('.event-share-status')).toContainText('Event link copied.');
  expect(await page.evaluate(() => window.copiedEventLink)).toBe(`${new URL(page.url()).origin}/#/community/events/1`);
  await page.evaluate(() => window.finishNativeShare());await expect(apps).toBeEnabled();
  await expect(page.locator('.event-share-status')).toContainText('Event link copied.');
});

test('blocked app sharing gives a visible recovery and Copy link gets a fresh user gesture', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('Not permitted', 'NotAllowedError'); } });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => {
      window.copyActivated = navigator.userActivation.isActive;window.copiedEventLink = value;
    } } });
  });
  await page.goto('/#/community/events/2');await page.locator('#landingDemo').click();
  await page.getByRole('button', { name: 'Share event', exact: true }).click();
  await page.getByRole('button', { name: 'Share with apps', exact: true }).click();
  await expect(page.locator('.event-share-status')).toContainText('App sharing is unavailable.');
  expect(await page.evaluate(() => window.copiedEventLink)).toBeUndefined();
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.locator('.event-share-status')).toContainText('Event link copied.');
  expect(await page.evaluate(() => window.copyActivated)).toBe(true);
});

test('a browser without clipboard or native sharing can select and manually copy the full URL', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
  });
  await page.goto('/#/community/events/2');await page.locator('#landingDemo').click();
  await page.getByRole('button', { name: 'Share event', exact: true }).click();
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Event link', exact: true });
  await expect(input).toBeFocused();
  expect(await input.evaluate(element => element.selectionEnd - element.selectionStart === element.value.length)).toBe(true);
  await expect(page.locator('.event-share-status')).toContainText('Select and copy');
  await expect(page.getByRole('button', { name: 'Copy link', exact: true })).toBeEnabled();
});

test('a real clipboard URL opens the same event for a fresh recipient after guest entry', async ({ page, context, browser }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/community/events/2');await page.locator('#landingDemo').click();
  await page.getByRole('button', { name: 'Share event', exact: true }).click();
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.locator('.event-share-status')).toContainText('Event link copied.');
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(url).toBe(`${new URL(page.url()).origin}/#/community/events/2`);
  const recipient = await browser.newContext({ viewport: page.viewportSize() });
  try {
    const received = await recipient.newPage();await received.goto(url);
    await expect(received.locator('#authLanding')).toBeVisible();
    await received.locator('#landingDemo').click();
    await expect(received.locator('#dashboardDialogTitle')).toHaveText('Open Mic & Poetry Night');
    await expect(received).toHaveURL(url);
  } finally { await recipient.close(); }
});

test('a late clipboard result cannot change a different event dialog', async ({ page }) => {
  const errors = [];page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => new Promise(resolve => { window.finishEventCopy = resolve; }) } });
  });
  await page.goto('/#/community/events/1');await page.locator('#landingDemo').click();
  await page.getByRole('button', { name: 'Share event', exact: true }).click();
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.locator('.event-share-status')).toHaveText('Copying event link...');
  await page.evaluate(() => { location.hash = '#/community/events/2'; });
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Open Mic & Poetry Night');
  await page.evaluate(() => window.finishEventCopy());
  await expect(page.locator('.event-share-status')).toBeEmpty();
  await expect(page.locator('.event-share-options')).not.toBeVisible();
  expect(errors).toEqual([]);
});
