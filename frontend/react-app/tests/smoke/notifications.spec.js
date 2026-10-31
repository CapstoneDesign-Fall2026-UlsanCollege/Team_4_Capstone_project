import { test, expect } from '@playwright/test';

const bell = page => page.getByRole('button', { name: /^Notifications(?:,|$)/ });
const panel = page => page.getByRole('dialog', { name: 'Notifications', exact: true });
async function enter(page) {
  await page.goto('/');
  await expect(bell(page)).toHaveCount(0);
  await page.locator('#landingDemo').click();
  await expect(bell(page)).toBeVisible();
}
async function saveEvent(page) {
  await page.locator('#mainNav [data-page=discover]').click();
  await page.locator('#filterBar [data-interest=all]').click();
  await page.locator('#eventsGrid [data-save="1"]').click();
  await expect(bell(page)).toHaveAttribute('aria-label', /1 unread recent/);
}

test('demo notifications start empty and saved-event read status survives reload', async ({ page }) => {
  await enter(page);
  await bell(page).click();
  await expect(panel(page)).toContainText('No recent notifications here.');
  await expect(panel(page)).toContainText('Demo activity');
  await page.keyboard.press('Escape');
  await expect(bell(page)).toBeFocused();
  await saveEvent(page);
  await bell(page).click();
  await panel(page).getByRole('button').filter({ hasText: 'HackNight: Build-a-Thon' }).click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await page.locator('#closeDashboardDialog').click();
  await expect(bell(page)).toHaveAttribute('aria-label', 'Notifications');
  await page.reload();
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await bell(page).click();
  await expect(panel(page).locator('[data-notification-id]')).toHaveCount(1);
  await panel(page).getByRole('checkbox', { name: 'Unread only' }).check();
  await expect(panel(page)).toContainText('No unread notifications here.');
});

test('Feed and Community share the bell, filters and real guest-action receipts', async ({ page }, testInfo) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await enter(page); await saveEvent(page);
  await page.locator('[data-workspace=feed]').click();
  await page.getByRole('textbox', { name: 'Post text', exact: true }).fill('Notification smoke post');
  await page.getByRole('textbox', { name: 'Your college', exact: true }).fill('Test College');
  await page.getByRole('button', { name: 'Post', exact: true }).click();
  await expect(bell(page)).toHaveAttribute('aria-label', /2 unread recent/);
  await page.locator('[data-workspace=community]').click();
  await bell(page).click();
  const filters = panel(page).getByRole('group', { name: 'Notification workspace' });
  await filters.getByRole('button', { name: 'Vibe-Feed', exact: true }).click();
  await expect(panel(page).locator('[data-notification-id]')).toHaveCount(1);
  await expect(panel(page)).toContainText('Your post was published');
  await filters.getByRole('button', { name: 'Community', exact: true }).click();
  await expect(panel(page)).toContainText('Event saved');
  await expect(panel(page)).not.toContainText('Your post was published');
  await filters.getByRole('button', { name: 'All', exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath('notifications.png') });
  await panel(page).getByRole('button').filter({ hasText: 'Your post was published' }).click();
  await expect(page.locator('#feedMain')).toBeVisible();
  await expect(page.locator('.feed-post').filter({ hasText: 'Notification smoke post' })).toBeVisible();
  await bell(page).click();
  await panel(page).getByRole('button', { name: 'Mark recent notifications as read' }).click();
  await expect(bell(page)).toHaveAttribute('aria-label', 'Notifications');
  await page.keyboard.press('Escape');
  await expect(bell(page)).toBeFocused();
  expect(errors).toEqual([]);
});

test('small-screen dark notification panel fits and storage failures stay visible', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.addInitScript(() => {
    const write = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'cv_notifications_demo') throw new Error('Blocked notification storage');
      return write.call(this, key, value);
    };
  });
  await enter(page); await saveEvent(page);
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await bell(page).click();
  await expect(panel(page).getByRole('alert')).toContainText('browser storage is unavailable');
  const bounds = await panel(page).boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(640);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await panel(page).getByRole('button', { name: 'Mark recent notifications as read' }).click();
  await expect(panel(page).getByRole('alert')).toContainText('Read status could not be saved');
  await expect(bell(page)).toHaveAttribute('aria-label', /1 unread recent/);
});
