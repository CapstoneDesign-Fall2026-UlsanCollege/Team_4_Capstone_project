import { test,expect } from '@playwright/test';
async function enter(page) {
  await page.goto('/'); await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page=dashboard]').click();
  await expect(page.locator('#progressLevel')).toHaveText('Lv. 1');
}
async function saveFive(page) {
  await page.locator('#mainNav [data-page=discover]').click();
  await page.locator('#filterBar [data-interest=all]').click();
  for (const id of [1,2,3,4,5]) await page.locator(`#eventsGrid [data-save="${id}"]`).click();
  await page.locator('#mainNav [data-page=dashboard]').click();
}
test('badges unlock at the exact level and stay earned after points drop and reload',async ({page},testInfo)=>{
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await enter(page);
  await expect(page.locator('#progressBadgeCount')).toHaveText('1 / 5 badges earned');
  await saveFive(page);
  await expect(page.locator('#progressPoints')).toHaveText('100');
  await expect(page.locator('#progressLevel')).toHaveText('Lv. 2');
  await expect(page.locator('#progressRank')).toHaveText('Campus Scout');
  await expect(page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  await expect(page.locator('#progressBadgeAnnouncement')).toHaveText('Badge unlocked: Campus Scout');
  await page.locator('#viewProgress').click();
  const dialog=page.getByRole('dialog',{name:'Your badges',exact:true});
  await expect(dialog.locator('.progress-badge')).toHaveCount(5);
  await expect(dialog.locator('[data-badge=scout]')).toHaveClass(/is-earned/);
  await expect(dialog.locator('[data-badge=pathfinder]')).toHaveClass(/is-locked/);
  await expect(dialog.locator('[data-badge=scout] svg')).toHaveCount(2);
  await expect(dialog).toContainText('earned badges stay unlocked');
  await page.locator('#toast').waitFor({state:'hidden'});
  await page.mouse.move(0,0);
  await page.screenshot({path:testInfo.outputPath('badges-earned.png'),fullPage:true,animations:'disabled'});
  await page.keyboard.press('Escape');
  await expect(page.locator('#viewProgress')).toBeFocused();
  await page.locator('#mainNav [data-page=discover]').click();
  await page.locator('#eventsGrid [data-save="5"]').click();
  await page.locator('#mainNav [data-page=dashboard]').click();
  await expect(page.locator('#progressPoints')).toHaveText('80');
  await expect(page.locator('#progressLevel')).toHaveText('Lv. 1');
  await expect(page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  await page.reload(); await page.evaluate(()=>document.querySelector('#demoLogin').click());
  await expect(page.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  await page.locator('#viewProgress').click();
  await expect(dialog.locator('[data-badge=scout]')).toHaveClass(/is-earned/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
test('badge storage failure is visible without breaking the dashboard',async ({page})=>{
  await page.addInitScript(()=>{
    const get=Storage.prototype.getItem,set=Storage.prototype.setItem;
    Storage.prototype.getItem=function(key){if(key.startsWith('cv_progress_badges_'))throw new Error('blocked badge storage');return get.call(this,key);};
    Storage.prototype.setItem=function(key,value){if(key.startsWith('cv_progress_badges_'))throw new Error('blocked badge storage');return set.call(this,key,value);};
  });
  await enter(page);
  await expect(page.locator('#progressStorageWarning')).toContainText('Badges are temporary');
  await expect(page.locator('#progressStorageWarning')).toBeVisible();
  await page.locator('#viewProgress').click();
  await expect(page.getByRole('dialog')).toContainText('browser storage is unavailable');
});
test('two tabs synchronize awards and point changes without losing earned badges',async ({page,context})=>{
  await enter(page);
  const other=await context.newPage();
  await enter(other);
  await saveFive(page);
  await expect(other.locator('#progressPoints')).toHaveText('100');
  await expect(other.locator('#progressBadgeCount')).toHaveText('2 / 5 badges earned');
  await other.locator('#viewProgress').click();
  const dialog=other.getByRole('dialog',{name:'Your badges',exact:true});
  await expect(dialog.locator('[data-badge=scout]')).toHaveClass(/is-earned/);
  await page.locator('#mainNav [data-page=discover]').click();
  await page.locator('#eventsGrid [data-save="5"]').click();
  await expect(other.locator('#progressPoints')).toHaveText('80');
  await expect(dialog.locator('[data-badge=scout]')).toHaveClass(/is-earned/);
  await expect(dialog.locator('.progress-detail-summary')).toContainText('80');
  await other.close();
});
