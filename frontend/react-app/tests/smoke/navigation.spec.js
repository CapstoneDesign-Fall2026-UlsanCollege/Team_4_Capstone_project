import { test, expect } from '@playwright/test';

test('browser Back and Forward restore Community pages and the Feed workspace', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await expect(page).toHaveURL(/#\/community\/discover$/);
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await page.locator('#mainNav [data-page="saved"]').click();
  await page.goBack();
  await expect(page.locator('#page-dashboard')).toBeVisible();
  await expect(page.locator('#mainNav [data-page="dashboard"]')).toHaveAttribute('aria-current', 'page');
  await page.goBack();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#page-dashboard')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#page-saved')).toBeVisible();
  const length = await page.evaluate(() => history.length);
  await page.locator('#mainNav [data-page="saved"]').click();
  expect(await page.evaluate(() => history.length)).toBe(length);
  await page.locator('[data-workspace="feed"]').click();
  await expect(page.locator('#feedMain')).toBeVisible();
  await expect(page).toHaveURL(/#\/feed$/);
  await page.goBack();
  await expect(page.locator('#page-saved')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#feedMain')).toBeVisible();
  expect(errors).toEqual([]);
});

test('deep links survive login and reload without bypassing authentication', async ({ page }) => {
  await page.goto('/#/community/profile');
  await expect(page.locator('#authLanding')).toBeVisible();
  await expect(page.locator('#appMain')).not.toBeVisible();
  // Enter through the modal demo action, which does not explicitly navigate to Discover.
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await expect(page.locator('#page-profile')).toBeVisible();
  await page.reload();
  await expect(page.locator('#authLanding')).toBeVisible();
  await expect(page.locator('#appMain')).not.toBeVisible();
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await expect(page.locator('#page-profile')).toBeVisible();
  await page.locator('#mainNav [data-page="discover"]').click();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await expect(page.locator('#dashboardDialog')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#page-profile')).toBeVisible();
  await expect(page.locator('#dashboardDialog')).not.toBeVisible();
});
