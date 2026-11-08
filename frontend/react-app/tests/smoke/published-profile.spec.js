import { test, expect } from '@playwright/test';

test('Profile labels published recommendations and keeps following separate from membership', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page=profile]').click();
  await expect(page.locator('#profileName')).toHaveText('Alex Rivera');
  // Fictional, in-memory catalogue fixture; no account or production data is written.
  await page.evaluate(() => {
    window.campusEventCatalog.unshift({ ...window.campusEventCatalog[0], id: 1000,
      title: 'Fixture published workshop', host: 'Fixture campus host', source: 'published',
      photo: 'event-placeholder.svg', time: 'Time to be confirmed', date: '2026-11-20',
    });
    window.campusRefreshEvents();
  });
  await expect(page.locator('.cvp-data-note')).toContainText('Published campus events and sample listings are labelled below.');
  await expect(page.locator('[data-profile-event="1000"] .cvp-event-source')).toHaveText('Published campus event');
  await expect(page.locator('[data-profile-event="1"] .cvp-event-source')).toHaveText('Sample listing');
  await expect(page.locator('.cvp-explore > .cvp-section-note')).toContainText('Published campus events and sample listings');
  await page.getByRole('navigation', { name: 'Profile workspace navigation' }).getByRole('button', { name: 'Clubs', exact: true }).click();
  await expect(page.locator('#cvp-dialog-title')).toHaveText('Follow event hosts');
  await expect(page.locator('.cvp-host-editor')).toContainText('Following does not join a club or send a request.');
  await expect(page.getByLabel('Fixture campus host', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close profile panel', exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath('profile-event-sources.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
