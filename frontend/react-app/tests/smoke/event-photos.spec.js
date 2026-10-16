import { test, expect } from '@playwright/test';

async function expectLoaded(images) {
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
  }
}

test('each event has a distinct loaded photo shared across cards and details', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.locator('#filterBar [data-interest="all"]').click();
  const cards = page.locator('#eventsGrid .discover-event-card');
  await expect(cards).toHaveCount(9);
  await expectLoaded(cards.locator('img'));
  const sources = await cards.evaluateAll(elements => elements.map(element => ({
    id: element.dataset.eventId,
    src: element.querySelector('img').getAttribute('src'),
  })));
  expect(new Set(sources.map(item => item.src)).size).toBe(9);
  for (const { id, src } of sources) {
    await page.locator(`#eventsGrid [data-discover-event="${id}"]`).click();
    const detail = page.locator('#dashboardDialog img');
    await expect(detail).toHaveAttribute('src', src);
    await expectLoaded(detail);
    await page.locator('#closeDashboardDialog').click();
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('discover-photos.png'), fullPage: true });
  await page.locator('#mainNav [data-page="dashboard"]').click();
  const recommendations = page.locator('#dashboardRecommendations .recommendation-open');
  await expect(recommendations).toHaveCount(3);
  await expectLoaded(recommendations.locator('img'));
  for (const button of await recommendations.all()) {
    const id = await button.getAttribute('data-dashboard-event');
    const src = sources.find(item => item.id === id).src;
    await expect(button.locator('img')).toHaveAttribute('src', src);
    await button.click();
    await expect(page.locator('#dashboardDialog img')).toHaveAttribute('src', src);
    await page.locator('#closeDashboardDialog').click();
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('dashboard-photos.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
