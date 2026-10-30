import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const events = JSON.parse(readFileSync(new URL('../../../events.json', import.meta.url), 'utf8'));

async function enterDemo(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#landingDemo').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.locator('#filterBar [data-interest="all"]').click();
}

async function mapTextContrast(link) {
  return link.evaluate(element => {
    const context = document.createElement('canvas').getContext('2d');
    const rgba = color => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data];
    };
    const foreground = rgba(getComputedStyle(element).color);
    let background;
    for (let parent = element; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (style.opacity !== '1' || style.backgroundImage !== 'none') throw new Error('Contrast fixture requires solid surfaces without opacity.');
      const color = rgba(style.backgroundColor);
      if (color[3] === 255) { background = color; break; }
      if (color[3] !== 0) throw new Error('Contrast fixture requires an opaque or transparent background.');
    }
    if (!background || foreground[3] !== 255) throw new Error('Opaque foreground and effective background required.');
    const luminance = color => {
      const linear = color.slice(0, 3).map(value => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const first = luminance(foreground), second = luminance(background);
    return { ratio: (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05), foreground, background };
  });
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

test('map button passes contrast checks and detects the reconstructed pre-release surface bug', async ({ page }, testInfo) => {
  await enterDemo(page);
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await page.mouse.move(0, 0);
  const link = page.locator('#dashboardDialog .event-location-action');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });

  // Reconstruct the rejected pre-release declaration locally, never in app CSS.
  const oldSurface = await page.addStyleTag({ content: '#dashboardDialog .event-location-action { background: var(--card); }' });
  const reconstructedBefore = await mapTextContrast(link);
  expect(reconstructedBefore.ratio).toBeLessThan(4.5);
  await page.screenshot({ path: testInfo.outputPath('contrast-before-reconstruction.png') });
  await oldSurface.evaluate(element => element.remove());
  const light = await mapTextContrast(link);
  expect(light.ratio).toBeGreaterThanOrEqual(4.5);
  await page.screenshot({ path: testInfo.outputPath('contrast-after.png') });
  await link.hover();
  const lightHover = await mapTextContrast(link);
  expect(lightHover.ratio).toBeGreaterThanOrEqual(4.5);
  await page.mouse.move(0, 0);
  await link.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  const focused = await mapTextContrast(link);
  expect(focused.ratio).toBeGreaterThanOrEqual(4.5);
  await expect(link).toHaveCSS('outline-style', 'solid');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  const dark = await mapTextContrast(link);
  expect(dark.ratio).toBeGreaterThanOrEqual(4.5);
  await link.hover();
  const darkHover = await mapTextContrast(link);
  expect(darkHover.ratio).toBeGreaterThanOrEqual(4.5);
  await testInfo.attach('map-contrast', {
    body: Buffer.from(JSON.stringify({
      checkedAt: new Date().toISOString(), browser: page.context().browser().version(), viewport: page.viewportSize(),
      minimumTextRatio: 4.5,
      reconstructedBefore: { declaration: 'background: var(--card)', ...reconstructedBefore },
      current: { light, lightHover, focused, dark, darkHover },
      scope: 'Local sample-data browser check; before image is a controlled CSS reconstruction, not a historical production screenshot.',
    })), contentType: 'application/json',
  });
});
