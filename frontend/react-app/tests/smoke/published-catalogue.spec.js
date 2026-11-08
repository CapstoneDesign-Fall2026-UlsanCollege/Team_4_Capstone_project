import { test, expect } from '@playwright/test';

test.use({ timezoneId: 'Asia/Seoul' });
// Fictional local UI fixtures only: this suite does not sign in or write to Firestore.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-08T12:00:00+09:00'));
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.evaluate(() => {
    const dates = ['2026-11-20', '2026-11-06', '2026-11-07', '2026-11-08'];
    const names = ['Future', 'Friday', 'Saturday', 'Sunday'];
    const base = window.campusEventCatalog[0];
    window.campusEventCatalog.unshift(...dates.map((date, index) => ({ ...base,
      id: 1000 + index, date, title: `Fixture ${names[index]}`, host: 'Code Collective',
      source: 'published', photo: 'event-placeholder.svg', time: 'Time to be confirmed',
    })));
    window.campusRefreshEvents();
  });
});

test('published catalogue shows the current week and the actual weekend', async ({ page }, testInfo) => {
  await page.locator('#mainNav [data-page=dashboard]').click();
  await expect(page.locator('#weekRange')).toHaveText('This week · Nov 2–Nov 8');
  await expect(page.locator('#eventsWeekNote')).toHaveText('3 in this week');
  await expect(page.locator('#weekendNote')).toHaveText('2 campus events this weekend.');
  await expect(page.locator('[data-dashboard-day="2026-11-07"]')).toContainText('1 event');
  await page.locator('#exploreWeekend').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Your weekend');
  await expect(page.locator('#dashboardDialogBody .calendar-event-row')).toHaveCount(2);
  await expect(page.locator('#dashboardDialogBody')).toContainText('Fixture Saturday');
  await expect(page.locator('#dashboardDialogBody')).toContainText('Fixture Sunday');
  await expect(page.locator('#dashboardDialogBody')).not.toContainText('Fixture Friday');
  await page.screenshot({ path: testInfo.outputPath('published-weekend.png'), fullPage: true });
});
