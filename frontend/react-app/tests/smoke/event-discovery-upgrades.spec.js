import { test, expect } from '@playwright/test';

const dateFilters = page => page.getByRole('group', { name: 'Filter events by date' });
const cards = page => page.locator('#eventsGrid .discover-event-card');
async function demo(page) {
  await page.goto('/');await page.locator('#landingDemo').click();
  await page.locator('#filterBar [data-interest="all"]').click();
}

test('date ranges combine with search/category and the dialog stays synchronized', async ({ page }, testInfo) => {
  await page.clock.setFixedTime(new Date('2026-10-04T03:00:00Z'));
  await demo(page);await expect(cards(page)).toHaveCount(9);
  await dateFilters(page).getByRole('button', { name: 'Today', exact: true }).click();
  await expect(cards(page)).toHaveCount(1);await expect(cards(page)).toContainText('Indie Game Showcase');
  await dateFilters(page).getByRole('button', { name: 'This weekend', exact: true }).click();
  await expect(cards(page)).toHaveCount(2);await expect(page.locator('#eventsGrid')).toContainText('Research Skills Bootcamp');
  await dateFilters(page).getByRole('button', { name: 'Past events', exact: true }).click();
  await expect(cards(page)).toHaveCount(6);
  await dateFilters(page).getByRole('button', { name: 'Upcoming', exact: true }).click();
  await expect(cards(page)).toHaveCount(3);
  await page.locator('#eventSearch').fill('Jazz');await page.locator('#filterBar [data-interest="Music"]').click();
  await expect(cards(page)).toHaveCount(1);await expect(cards(page)).toContainText('Jazz Under the Stars');
  await page.locator('#clearEventFilters').click();await expect(cards(page)).toHaveCount(9);
  await expect(dateFilters(page).getByRole('button', { name: 'All dates', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#discoverFiltersButton').click();
  await page.locator('#discoverDate').selectOption('today');await page.locator('#discoverCategory').selectOption('Tech');
  await page.getByRole('button', { name: 'Apply filters', exact: true }).click();
  await expect(cards(page)).toHaveCount(1);await expect(dateFilters(page).getByRole('button', { name: 'Today', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#discoverFiltersButton')).toHaveClass(/has-filters/);
  await expect(page.locator('#clearEventFilters')).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('date-filters.png') });
});

test('date/category empty results explain recovery and campus midnight refreshes the active date', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-04T14:59:00Z'));
  await demo(page);await dateFilters(page).getByRole('button', { name: 'Today', exact: true }).click();
  await page.locator('#filterBar [data-interest="Music"]').click();
  await expect(cards(page)).toHaveCount(0);await expect(page.locator('#emptyState')).toContainText('Try All dates');
  await page.locator('#filterBar [data-interest="all"]').click();await expect(cards(page)).toContainText('Indie Game Showcase');
  await page.clock.setFixedTime(new Date('2026-10-04T15:00:00Z'));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(cards(page)).toHaveCount(1);await expect(cards(page)).toContainText('Jazz Under the Stars');
  await page.locator('#clearEventFilters').click();await expect(cards(page)).toHaveCount(9);
});

test('published catalogue fixtures use the same campus date filter as sample events', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-11T03:00:00Z'));
  await demo(page);
  await page.evaluate(() => {
    const base = window.campusEventCatalog[0];
    window.campusEventCatalog.unshift({ ...base, id: 1000, title: 'Published date fixture', date: '2026-11-11', source: 'published' });
    window.campusRefreshEvents();
  });
  await dateFilters(page).getByRole('button', { name: 'Today', exact: true }).click();
  await expect(cards(page)).toHaveCount(1);await expect(cards(page)).toContainText('Published date fixture');
  await expect(cards(page)).toContainText('Published campus event');
});
