import { test, expect } from '@playwright/test';

test('demo student reaches the selected sample event details', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#landingDemo').click();
  await expect(page.locator('#appMain')).toBeVisible();
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await expect(page.locator('#page-dashboard')).toBeVisible();
  await page.locator('#mainNav [data-page="discover"]').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  const dialog = page.locator('#dashboardDialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await expect(dialog).toContainText('Innovation Lab, Bldg 7');
  await expect(dialog).toContainText('6:00 PM');
  await expect(dialog).toContainText('Code Collective');
  await expect(dialog).toContainText('24 hours of building, pizza, and demo prizes.');
  await page.locator('#closeDashboardDialog').click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('#page-discover')).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test('unmatched search has an empty state and clear filters restores events', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#landingDemo').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.locator('#filterBar [data-interest="all"]').click();
  const cards = page.locator('#eventsGrid .discover-event-card');
  await expect(cards).toHaveCount(9);
  await page.locator('#eventSearch').fill('week6-no-such-event-937');
  await expect(cards).toHaveCount(0);
  await expect(page.locator('#emptyState')).toBeVisible();
  await expect(page.locator('#eventResults')).toHaveText('Showing 0 of 9 events');
  await page.locator('#clearEventFilters').click();
  await expect(page.locator('#eventSearch')).toHaveValue('');
  await expect(cards).toHaveCount(9);
  await expect(page.locator('#emptyState')).not.toBeVisible();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
});
