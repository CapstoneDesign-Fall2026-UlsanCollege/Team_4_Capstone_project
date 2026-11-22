import { test as base, expect } from '@playwright/test';

// Historical sample regressions use the day before their September 2026 listings.
// Date-specific specs override this explicitly; current-date usability specs use
// Playwright's base test directly to verify that old samples are not "upcoming".
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.clock.setFixedTime(new Date('2026-09-25T03:00:00Z'));
    await use(page);
  },
});
export { expect };
