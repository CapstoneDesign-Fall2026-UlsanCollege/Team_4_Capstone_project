import { test, expect } from '@playwright/test';

async function openTrip(page) {
  await page.goto('/#/community/events/1');
  await page.locator('#landingDemo').click();
  const planner = page.getByRole('region', { name: 'Plan your trip', exact: true });
  await planner.locator('summary').click();
  return planner;
}

test('destination card and route summary stay accurate as a trip is edited', async ({ page }, testInfo) => {
  const planner = await openTrip(page);
  await expect.poll(async () => (await planner.boundingBox()).y).toBeLessThan(220);
  await expect(planner.locator('[data-journey-event-name]')).toHaveText('HackNight: Build-a-Thon');
  await expect(planner.locator('[data-journey-location-badge]')).toHaveText('Check venue address');
  await expect(planner.locator('[data-journey-distance-value]')).toHaveText('See in Maps');
  await expect(planner.locator('[data-journey-route-hint]')).toContainText('Add a starting point');
  await planner.getByLabel('Starting point', { exact: true }).fill('Ulsan Station');
  await planner.getByLabel('Destination address or coordinates').fill('A different venue, Ulsan');
  await expect(planner.locator('[data-journey-event-name]')).toHaveText('Your chosen destination');
  await expect(planner.locator('.journey-autofill')).toBeHidden();
  await expect(planner.locator('[data-journey-event-address]')).toHaveText('A different venue, Ulsan');
  await expect(planner.locator('[data-journey-route-hint]')).toContainText('ready');
  await planner.getByRole('button', { name: 'Walk', exact: true }).click();
  await expect(planner.locator('[data-journey-route-mode]')).toHaveText('Walk');
  await expect(planner.locator('[data-journey-transit-hint]')).toContainText('walking routes');
  const link = planner.getByRole('link', { name: /Start directions/ });
  const url = new URL(await link.getAttribute('href'));
  expect(url.searchParams.get('destination')).toBe('A different venue, Ulsan');
  expect(url.searchParams.get('origin')).toBe('Ulsan Station');
  expect(url.searchParams.get('travelmode')).toBe('walking');
  const view = new URL(await planner.locator('[data-journey-view-map]').getAttribute('href'));
  expect(view.searchParams.get('query')).toBe('A different venue, Ulsan');
  expect(view.href).not.toContain('Station');
  await planner.getByRole('button', { name: 'Use event location', exact: true }).click();
  await planner.getByRole('button', { name: 'Bus & train', exact: true }).click();
  await planner.locator('summary').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('map-preview.png'), fullPage: true });
});

test('copy address has a manual fallback when clipboard access is blocked', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async () => { throw new Error('Browser policy blocked copy'); } },
  }));
  const planner = await openTrip(page);
  await planner.getByRole('button', { name: 'Copy destination address', exact: true }).click();
  await expect(planner.getByRole('status')).toContainText('Address selected');
  const input = planner.getByLabel('Destination address or coordinates');
  await expect(input).toBeFocused();
  expect(await input.evaluate(element => element.value.slice(element.selectionStart, element.selectionEnd))).toBe('Innovation Lab, Bldg 7');
  await input.fill('');
  await expect(planner.getByRole('button', { name: 'Copy destination address', exact: true })).toBeDisabled();
  await expect(planner.locator('[data-journey-route]')).toHaveAttribute('aria-disabled', 'true');
});

test('copy success reports only the destination without saving a private start', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async value => { window.copiedDestination = value; } },
  }));
  const planner = await openTrip(page);
  await planner.getByLabel('Starting point', { exact: true }).fill('Private home address');
  await planner.getByRole('button', { name: 'Copy destination address', exact: true }).click();
  await expect(planner.getByRole('status')).toContainText('Destination address copied');
  expect(await page.evaluate(() => window.copiedDestination)).toBe('Innovation Lab, Bldg 7');
  expect(await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }))).not.toContain('Private home address');
});
