import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const events = JSON.parse(readFileSync(new URL('../../../events.json', import.meta.url), 'utf8'));

async function enterDemo(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#landingDemo').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.locator('#filterBar [data-interest="all"]').click();
}

test('all nine events expose safe map links; map only opens when clicked', async ({ page, context }, testInfo) => {
  const errors = [], mapsRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  context.on('request', request => { if (request.url().startsWith('https://www.google.com/maps/')) mapsRequests.push(request.url()); });
  await context.route('https://www.google.com/maps/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Map destination check</title>' }));
  await enterDemo(page);

  for (const event of events) {
    const card = page.locator(`#eventsGrid [data-event-id="${event.id}"]`);
    const inline = card.locator('.event-map-inline');
    await expect(inline).toHaveText(event.location);
    expect(new URL(await inline.getAttribute('href')).searchParams.get('query')).toBe(event.location);
    await card.locator('[data-discover-event]').click();
    const location = page.locator('#dashboardDialog .event-location');
    await expect(location).toContainText(event.location);
    await expect(location).toContainText('address not confirmed');
    const link = location.locator('.event-location-action');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(link).toHaveAttribute('aria-label', /Google Maps.*opens in a new tab/);
    expect(new URL(await link.getAttribute('href')).searchParams.get('query')).toBe(event.location);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (event.id === 1) await page.screenshot({ path: testInfo.outputPath('event-map-details.png'), fullPage: true });
    await page.locator('#closeDashboardDialog').click();
  }
  expect(mapsRequests).toEqual([]);
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#dashboardDialog .event-location-action').click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  expect(new URL(popup.url()).searchParams.get('query')).toBe(events[0].location);
  await expect(page.locator('#dashboardDialog')).toBeVisible();
  await popup.close();
  expect(errors).toEqual([]);
});

test('map actions survive saving and appear through Saved and Dashboard', async ({ page }) => {
  await enterDemo(page);
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await page.locator('#dashboardDialog [data-save="1"]').click();
  await expect(page.locator('#dashboardDialog .event-location-action')).toBeVisible();
  await page.locator('#closeDashboardDialog').click();
  await page.locator('#mainNav [data-page="saved"]').click();
  await expect(page.locator('#savedGrid .event-map-inline')).toHaveText(events[0].location);
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await page.locator('#dashboardRecommendations .recommendation-open').first().click();
  await expect(page.locator('#dashboardDialog .event-location-action')).toBeVisible();
});

test('organizer address supports directions and safe text rendering; dialog works in dark mode', async ({ page }, testInfo) => {
  await enterDemo(page);
  await page.evaluate(() => {
    const original = window.campusEventMapLinks;
    window.campusEventMapLinks = event => original({ ...event, location: '<img src=x onerror=alert(1)>', mapLocation: { address: '123 Test Campus Road, Test City' } });
    window.campusAssistant.openEvent(1);
    document.documentElement.dataset.theme = 'dark';
  });
  const location = page.locator('#dashboardDialog .event-location');
  await expect(location.locator('.event-location-venue')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(location.locator('img')).toHaveCount(0);
  await expect(location).toContainText('Organizer-provided address');
  const directions = location.getByRole('link', { name: /Get directions/ });
  expect(new URL(await directions.getAttribute('href')).searchParams.get('destination')).toBe('123 Test Campus Road, Test City');
  await page.screenshot({ path: testInfo.outputPath('event-map-dark-address-fixture.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const box = await directions.boundingBox();
  expect(box.width).toBeGreaterThan(40);
  await page.keyboard.press('Escape');
  await expect(page.locator('#dashboardDialog')).not.toBeVisible();
});
