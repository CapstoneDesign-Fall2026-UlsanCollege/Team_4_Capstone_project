import { test, expect } from '@playwright/test';

async function openTrip(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#landingDemo').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await page.locator('#filterBar [data-interest="all"]').click();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  const planner = page.getByRole('region', { name: 'Plan your trip' });
  await planner.locator('summary').click();
  return planner;
}

async function addressTrip(page) {
  const planner = await openTrip(page);
  await planner.getByLabel('Destination address or coordinates').fill('Campus Road 12, Test City');
  await planner.getByLabel('Starting point', { exact: true }).fill('Home Street 34, Test City');
  return planner;
}

async function delayedLocation(page) {
  await page.addInitScript(() => {
    window.locationCalls = 0;
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
      getCurrentPosition(success, error) {
        window.locationCalls += 1;
        window.deliverLocation = success;
        window.failLocation = error;
      },
    } });
  });
}

test('sample venues require a destination and never request location automatically', async ({ page }) => {
  await delayedLocation(page);
  const mapRequests = [];
  page.on('request', request => { if (request.url().includes('google.com/maps/')) mapRequests.push(request.url()); });
  const planner = await openTrip(page);
  await expect(planner.getByLabel('Destination address or coordinates')).toHaveValue('');
  await expect(planner).toContainText('no confirmed address');
  const route = planner.locator('[data-journey-route]');
  await expect(route).toHaveAttribute('aria-disabled', 'true');
  expect(await route.getAttribute('href')).toBeNull();
  await expect(planner.locator('[data-journey-distance]')).not.toContainText('km');
  expect(await page.evaluate(() => window.locationCalls)).toBe(0);
  expect(mapRequests).toEqual([]);
  await planner.getByLabel('Destination address or coordinates').fill('Campus Road 12, Test City');
  await expect(route).toHaveAttribute('aria-disabled', 'false');
  expect(new URL(await route.getAttribute('href')).searchParams.has('origin')).toBe(false);
  await planner.getByLabel('Destination address or coordinates').fill('울'.repeat(200));
  await planner.getByLabel('Starting point', { exact: true }).fill('산'.repeat(200));
  await expect(route).toHaveAttribute('aria-disabled', 'true');
  await expect(planner).toContainText('Shorten an address or use coordinates');
});

test('home address, travel modes and nearby stops open the intended map only on demand', async ({ page, context }) => {
  const requests = [];
  context.on('request', request => { if (request.url().startsWith('https://www.google.com/maps/')) requests.push(request.url()); });
  await context.route('https://www.google.com/maps/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Journey URL fixture</title>' }));
  const planner = await addressTrip(page);
  const start = 'Home & station #2, 울산';
  const destination = 'College, Test City &origin=wrong#fragment';
  await planner.getByLabel('Starting point', { exact: true }).fill(start);
  await planner.getByLabel('Destination address or coordinates').fill(destination);
  for (const [label, mode] of [['Bus & train', 'transit'], ['Walk', 'walking'], ['Drive', 'driving'], ['Cycle', 'bicycling']]) {
    await planner.getByRole('button', { name: label, exact: true }).click();
    await expect(planner.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
    const url = new URL(await planner.locator('[data-journey-route]').getAttribute('href'));
    expect(url.searchParams.get('origin')).toBe(start);
    expect(url.searchParams.get('destination')).toBe(destination);
    expect(url.searchParams.get('travelmode')).toBe(mode);
    expect(url.hash).toBe('');
  }
  const stops = new URL(await planner.locator('[data-journey-stops]').getAttribute('href'));
  expect(stops.searchParams.get('query')).toBe(`bus stops near ${destination}`);
  expect(stops.href).not.toContain('station');
  expect(requests).toEqual([]);
  const storage = await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }));
  expect(storage).not.toContain(start);
  expect(storage).not.toContain(destination);
  const popupWait = page.waitForEvent('popup');
  await planner.locator('[data-journey-route]').click();
  const popup = await popupWait;
  await popup.waitForLoadState('domcontentloaded');
  expect(new URL(popup.url()).searchParams.get('origin')).toBe(start);
  expect(new URL(popup.url()).searchParams.get('travelmode')).toBe('bicycling');
  expect(requests).toHaveLength(1);
  await popup.close();
  await expect(page.locator('#dashboardDialog')).toBeVisible();
});

test('location permission supplies a route and an explicitly straight-line distance to a pin', async ({ page, context }, testInfo) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 51.5074, longitude: -0.1278, accuracy: 50 });
  const planner = await openTrip(page);
  // Synthetic organizer coordinates, not a claimed real location for sample event 1.
  await page.evaluate(() => window.campusEventJourney.attach(document.querySelector('[data-event-journey]'), {
    id: 101, location: 'Synthetic test venue', mapLocation: { latitude: 51.5, longitude: -0.12 },
  }));
  await planner.locator('summary').click();
  await expect(planner.getByLabel('Destination address or coordinates')).toHaveValue('51.5,-0.12');
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await expect(planner.getByRole('status')).toContainText('Current location ready');
  await expect(planner.getByRole('status')).toContainText('50 m');
  await expect(planner.locator('[data-journey-distance]')).toContainText('1 km in a straight line');
  await expect(planner.locator('[data-journey-distance]')).toContainText('Route distance may differ');
  const url = new URL(await planner.locator('[data-journey-route]').getAttribute('href'));
  expect(url.searchParams.get('origin')).toBe('51.5074,-0.1278');
  expect(url.searchParams.get('destination')).toBe('51.5,-0.12');
  await page.screenshot({ path: testInfo.outputPath('trip-pin-location-fixture.png'), fullPage: true });
});

test('declined permission, unavailable position and timeout all keep manual directions usable', async ({ page }) => {
  await delayedLocation(page);
  const planner = await addressTrip(page);
  for (const [code, message] of [[1, 'permission was declined'], [2, 'location is unavailable'], [3, 'timed out']]) {
    await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
    await expect(planner.getByRole('button', { name: 'Finding your location…', exact: true })).toBeDisabled();
    await page.evaluate(code => window.failLocation({ code }), code);
    await expect(planner.getByRole('status')).toContainText(message);
    await expect(planner.getByRole('button', { name: 'Use my current location', exact: true })).toBeEnabled();
    const route = new URL(await planner.locator('[data-journey-route]').getAttribute('href'));
    expect(route.searchParams.get('origin')).toBe('Home Street 34, Test City');
  }
});

test('late GPS results cannot overwrite a manually entered or cleared starting point', async ({ page }) => {
  await delayedLocation(page);
  const planner = await addressTrip(page);
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await planner.getByLabel('Starting point', { exact: true }).fill('Replacement station');
  await page.evaluate(() => window.deliverLocation({ coords: { latitude: 0, longitude: 0, accuracy: 5 } }));
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('Replacement station');
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await planner.getByRole('button', { name: 'Clear starting point', exact: true }).click();
  await page.evaluate(() => window.deliverLocation({ coords: { latitude: 1, longitude: 2, accuracy: 5 } }));
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('');
  expect(new URL(await planner.locator('[data-journey-route]').getAttribute('href')).searchParams.has('origin')).toBe(false);
});

test('saving retains a trip, while closing or opening another event clears private inputs', async ({ page }) => {
  const planner = await addressTrip(page);
  await planner.getByRole('button', { name: 'Walk', exact: true }).click();
  await page.locator('#dashboardDialog [data-save="1"]').click();
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('Home Street 34, Test City');
  await expect(planner.getByLabel('Destination address or coordinates')).toHaveValue('Campus Road 12, Test City');
  await expect(planner.getByRole('button', { name: 'Walk', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#dashboardDialog')).not.toBeVisible();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await planner.locator('summary').click();
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('');
  await expect(planner.getByLabel('Destination address or coordinates')).toHaveValue('');
  await planner.getByLabel('Starting point', { exact: true }).fill('Another private origin');
  await page.evaluate(() => window.campusAssistant.openEvent(2));
  await planner.locator('summary').click();
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('');
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Open Mic & Poetry Night');
});

test('closing the dialog or changing account invalidates pending location callbacks', async ({ page }) => {
  await delayedLocation(page);
  const planner = await addressTrip(page);
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await planner.locator('summary').click();
  await page.evaluate(() => window.deliverLocation({ coords: { latitude: 1, longitude: 2, accuracy: 5 } }));
  await expect(planner.getByLabel('Starting point', { exact: true })).toHaveValue('');
  await planner.getByLabel('Starting point', { exact: true }).fill('Private origin before sign-out');
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent('campus-session-change', { detail: null })));
  await page.evaluate(() => window.deliverLocation({ coords: { latitude: 1, longitude: 2, accuracy: 5 } }));
  await expect(planner).not.toContainText('Private origin before sign-out');
  await expect(planner.locator('input')).toHaveCount(0);
});

test('an unsupported location API falls back to a manual address', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'geolocation', { configurable: true, value: undefined }));
  const planner = await addressTrip(page);
  await planner.getByRole('button', { name: 'Use my current location', exact: true }).click();
  await expect(planner.getByRole('status')).toContainText('Location is unavailable in this browser');
  await expect(planner.locator('[data-journey-route]')).toHaveAttribute('href', /origin=Home/);
});

test('trip controls fit mobile and desktop and remain usable in dark mode', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const planner = await addressTrip(page);
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  await planner.getByLabel('Starting point', { exact: true }).fill('<img src=x onerror=alert(1)>');
  await expect(planner.locator('img')).toHaveCount(0);
  await expect(planner).toHaveCSS('background-color', 'rgb(33, 27, 48)');
  const origin = planner.getByLabel('Starting point', { exact: true });
  await origin.focus();
  await page.keyboard.press('Tab');
  await expect(planner.getByRole('button', { name: 'Use my current location', exact: true })).toBeFocused();
  for (const control of await planner.locator('input, button, a').all()) {
    if (!await control.isVisible()) continue;
    const box = await control.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
    expect(box.height).toBeGreaterThanOrEqual(40);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await planner.locator('[data-journey-route]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('trip-dark-manual-address-fixture.png'), fullPage: true });
  expect(errors).toEqual([]);
});
