import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`event title and Close stay reachable after scrolling the trip planner in ${theme} mode`, async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#landingDemo').click();
    await page.locator('#filterBar [data-interest="all"]').click();
    await page.locator('#eventsGrid [data-discover-event="1"]').click();
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
    const dialog = page.locator('#dashboardDialog');
    const planner = page.getByRole('region', { name: 'Plan your trip' });
    await planner.locator('summary').click();
    await planner.getByLabel('Destination address or coordinates').fill('Synthetic Campus Road, Test City');
    await planner.getByLabel('Starting point', { exact: true }).fill('Synthetic starting station');
    await planner.locator('[data-journey-route]').scrollIntoViewIfNeeded();
    const bounds = await dialog.evaluate(element => {
      const modal = element.getBoundingClientRect();
      const close = element.querySelector('#closeDashboardDialog').getBoundingClientRect();
      const title = element.querySelector('#dashboardDialogTitle').getBoundingClientRect();
      const center = { x: close.x + close.width / 2, y: close.y + close.height / 2 };
      const hit = document.elementFromPoint(center.x, center.y);
      return {
        scrollTop: element.scrollTop,
        closeVisible: close.top >= modal.top && close.bottom <= modal.bottom && close.left >= modal.left && close.right <= modal.right,
        titleVisible: title.top >= modal.top && title.bottom <= modal.bottom,
        closeReceivesPointer: Boolean(hit?.closest('#closeDashboardDialog')),
        closeWidth: close.width, closeHeight: close.height, center,
      };
    });
    await testInfo.attach('dialog-visibility', { body: Buffer.from(JSON.stringify({ theme, viewport: page.viewportSize(), ...bounds })), contentType: 'application/json' });
    expect(bounds.scrollTop).toBeGreaterThan(100);
    expect(bounds.closeVisible).toBe(true);
    expect(bounds.titleVisible).toBe(true);
    expect(bounds.closeReceivesPointer).toBe(true);
    expect(bounds.closeWidth).toBeGreaterThanOrEqual(44);
    expect(bounds.closeHeight).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: testInfo.outputPath(`scrolled-event-dialog-${theme}.png`) });
    // Use pointer coordinates: locator.click() would scroll the old hidden
    // control back into view and conceal the original defect.
    await page.mouse.click(bounds.center.x, bounds.center.y);
    await expect(dialog).not.toBeVisible();
    await expect(planner.locator('input')).toHaveCount(0);
    await expect(page.locator('#eventsGrid')).toBeVisible();
    await page.locator('#eventsGrid [data-discover-event="2"]').click();
    await expect(page.locator('#dashboardDialogTitle')).toHaveText('Open Mic & Poetry Night');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
}
