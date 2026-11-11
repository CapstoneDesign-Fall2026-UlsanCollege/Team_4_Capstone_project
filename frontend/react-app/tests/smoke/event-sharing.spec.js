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
  await expect(page.locator('.event-share-status')).toHaveText('Event link copied.');
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
  await share.click();await expect(share).toBeEnabled();await expect(page.locator('.event-share-status')).toBeEmpty();
  await page.evaluate(() => { Object.defineProperty(navigator, 'share', { configurable: true, value: undefined }); });
  await share.click();
  await expect(page.locator('.event-share-status')).toHaveText('Copy this link to share the event.');
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
