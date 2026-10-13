import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const beforeURL = process.env.TOAST_BEFORE_URL || 'http://127.0.0.1:5181';
const afterURL = process.env.TOAST_AFTER_URL || 'http://127.0.0.1:5182';
for (const url of [beforeURL, afterURL]) {
  assert.match(url, /^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/, 'Use local test servers only.');
}
const output = resolve('..', '..', 'docs', 'Week6', 'evidence', 'toast-mobile');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROME_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH } : {}),
});
const results = [];
try {
  for (const [label, url] of [['before', beforeURL], ['after', afterURL]]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.locator('#landingDemo').click();
      await expect(page.locator('#appMain')).toBeVisible();
      await page.locator('#mainNav [data-page="dashboard"]').click();
      await expect(page.locator('#page-dashboard')).toBeVisible();
      await page.locator('#mainNav [data-page="discover"]').click();
      await page.locator('#filterBar [data-interest="Tech"]').click();
      await expect(page.locator('#eventsGrid .event-card')).toHaveCount(2);
      await page.locator('#eventSearch').fill('HackNight');
      await expect(page.locator('#eventsGrid .event-card')).toHaveCount(1);
      await page.locator('#eventsGrid [data-save="1"]').click();
      await expect(page.locator('#toast')).toHaveText('Event saved.');
      await expect(page.locator('#toast')).toBeVisible();
      const colors = await page.locator('#toast').evaluate(node => {
        const style = getComputedStyle(node);
        return { foreground: style.color, background: style.backgroundColor };
      });
      const luminance = css => {
        const values = css.match(/[\d.]+/g).map(Number);
        assert.ok(values.length === 3 || values[3] === 1, 'Contrast measurement requires opaque colors.');
        const linear = values.slice(0, 3).map(value => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      };
      const fg = luminance(colors.foreground), bg = luminance(colors.background);
      const contrast = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      await page.screenshot({ path: resolve(output, `${label}-save-toast.png`), animations: 'disabled' });
      await page.locator('#mainNav [data-page="saved"]').click();
      await expect(page.locator('#savedGrid')).toContainText('HackNight: Build-a-Thon');
      await page.locator('#mainNav [data-page="dashboard"]').click();
      await expect(page.locator('#statSaved')).toHaveText('1');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
      assert.deepEqual(errors, []);
      assert.ok(label === 'before' ? contrast < 4.5 : contrast >= 4.5, `${label} toast contrast: ${contrast}`);
      results.push({ revision: label, viewport: '390 x 844', ...colors, contrastRatio: Number(contrast.toFixed(2)), samplePathPassed: true, meetsContrastThreshold: contrast >= 4.5, uncaughtPageErrors: errors });
    } finally { await context.close(); }
  }
  await writeFile(resolve(output, 'results.json'), JSON.stringify({ automated: true, threshold: 4.5, results }, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
