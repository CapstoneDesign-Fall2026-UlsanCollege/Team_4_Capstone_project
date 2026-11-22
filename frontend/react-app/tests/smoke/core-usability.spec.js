import { test, expect } from '@playwright/test';
import { textContrast } from './text-contrast.js';

async function enter(page, fixtures = false) {
  await page.clock.setFixedTime(new Date('2026-11-22T12:00:00+09:00'));
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.locator('#filterBar [data-interest="all"]').click();
  if (fixtures) await page.evaluate(() => {
    const base = window.campusEventCatalog[0];
    window.campusEventCatalog.push(
      { ...base, id:1000, title:'Published workshop', date:'2026-11-25', source:'published' },
      { ...base, id:1001, title:'Published today', date:'2026-11-22', source:'published' },
      { ...base, id:1002, title:'Published yesterday', date:'2026-11-21', source:'published' },
      { ...base, id:200, title:'Future sample', date:'2026-11-23', source:'sample' },
    );
    window.campusRefreshEvents();
  });
}

test('current-day defaults exclude past samples while past and all dates remain available', async ({ page }) => {
  await enter(page);
  await expect(page.locator('[data-event-date="upcoming"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(0);
  await expect(page.locator('#emptyState')).toContainText('No upcoming');
  await page.locator('.discover-picks [data-discover-all]').click();
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(0);
  await page.locator('#emptyBrowsePast').click();
  await expect(page.locator('[data-event-date="past"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(9);
  await page.locator('#clearEventFilters').click();
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(0);
  await page.locator('[data-event-date="all"]').click();
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(9);
});

test('published-first ordering and source filters combine with dates and text search', async ({ page }, testInfo) => {
  await enter(page,true);
  const cards=page.locator('#eventsGrid .event-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toHaveAttribute('data-event-id','1001');
  await expect(cards.nth(1)).toHaveAttribute('data-event-id','1000');
  await page.locator('[data-event-source="published"]').click();
  await expect(cards).toHaveCount(2);
  await expect(page.locator('#eventsGrid .event-source-label')).toHaveText(['Published campus event','Published campus event']);
  await page.locator('#eventSearch').fill('workshop');
  await expect(cards).toHaveCount(1);
  await page.locator('#eventSearch').fill('');
  await page.locator('[data-event-date="past"]').click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toHaveAttribute('data-event-id','1002');
  await page.locator('#discoverFiltersButton').click();
  await expect(page.locator('#discoverSource')).toHaveValue('published');
  await expect(page.locator('#discoverDate')).toHaveValue('past');
  await page.locator('#discoverSource').selectOption('sample');
  await page.locator('#discoverDate').selectOption('upcoming');
  await page.locator('#discoverFilterForm button[type="submit"]').click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Future sample');
  await page.locator('#clearEventFilters').click();
  await page.screenshot({path:testInfo.outputPath('discovery-upcoming.png'),fullPage:true});
});

test('dashboard search and upcoming cards lead to the intended event', async ({ page }, testInfo) => {
  await enter(page,true);
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await expect(page.locator('#upcomingList [data-dashboard-event]')).toHaveCount(3);
  await expect(page.locator('#upcomingList')).not.toContainText('Published yesterday');
  await expect(page.locator('#upcomingList [data-dashboard-event]').first()).toHaveAttribute('data-dashboard-event','1001');
  await expect(page.locator('#dashboardMore')).not.toHaveAttribute('open','');
  await expect(page.locator('#viewProgress')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('dashboard-simple.png'),fullPage:true});
  await page.locator('#upcomingList [data-dashboard-event="1000"]').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Published workshop');
  await page.locator('#closeDashboardDialog').click();
  await page.locator('#dashboardSearch').fill('Published workshop');
  await page.locator('#dashboardSearchForm button').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await expect(page.locator('#eventSearch')).toHaveValue('Published workshop');
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(1);
});

test('empty dashboard stays honest and supporting panels can be expanded', async ({ page }) => {
  await enter(page);
  await page.locator('#mainNav [data-page="dashboard"]').click();
  await expect(page.locator('#upcomingList')).toContainText('No upcoming events yet');
  await expect(page.locator('#surpriseEvent')).toBeDisabled();
  await page.locator('#dashboardMore > summary').click();
  await expect(page.locator('#dashboardWeek')).toBeVisible();
  await expect(page.locator('#dashboardActivity')).toBeVisible();
  await page.locator('#upcomingList [data-dashboard-discover="past"]').click();
  await expect(page.locator('#page-discover')).toBeVisible();
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(9);
});

test('navigation labels, Profile settings and readable mobile text replace duplicate rails', async ({ page }, testInfo) => {
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await enter(page,true);
  for(const name of ['Home dashboard','Discover','Assistant','Saved','Suggest']) {
    const button=page.locator('#mainNav').getByRole('button',{name,exact:true});
    await expect(button.locator('.nav-label')).toBeVisible();
    const bounds=await button.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x+bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
  }
  const meta=page.locator('#eventsGrid .discover-event-meta p').first();
  expect(await meta.evaluate(element=>parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(13);
  expect(await textContrast(meta)).toBeGreaterThanOrEqual(4.5);
  expect(await textContrast(page.locator('#mainNav [data-page="discover"] .nav-label'))).toBeGreaterThanOrEqual(4.5);
  await page.getByRole('button',{name:'Open your profile',exact:true}).click();
  await expect(page.locator('.cvp-rail')).toHaveCount(0);
  await page.getByRole('button',{name:'Settings',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Profile settings',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Close profile panel',exact:true}).click();
  await page.locator('#mainNav [data-page="chat"]').click();
  await expect(page.locator('#chatInput')).toBeVisible();
  await expect(page.locator('.assistant-rail')).toHaveCount(0);
  await page.evaluate(()=>{document.documentElement.dataset.theme='dark';});
  await page.locator('#mainNav [data-page="discover"]').click();
  await expect(page.locator('#eventsGrid .event-card')).toHaveCount(3);
  expect(await textContrast(page.locator('#eventsGrid .discover-event-meta p').first())).toBeGreaterThanOrEqual(4.5);
  expect(await textContrast(page.locator('#mainNav [data-page="discover"] .nav-label'))).toBeGreaterThanOrEqual(4.5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('readable-dark.png'),fullPage:true});
  expect(errors).toEqual([]);
});

test('personal plans use clear wording and survive reopening independently of dates', async ({ page }) => {
  await enter(page);
  await page.locator('[data-event-date="past"]').click();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
  await page.locator('#rsvp-btn-1').click();
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  await page.locator('#closeDashboardDialog').click();
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  await page.locator('#rsvp-btn-1').click();
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
});
