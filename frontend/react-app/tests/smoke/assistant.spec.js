import { test, expect } from '@playwright/test';

async function enter(page) {
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page=chat]').click();
  await expect(page.locator('#chatInput')).toBeVisible();
}

test('local assistant searches follows up opens details and saves only on explicit clicks', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await enter(page);
  await page.screenshot({ path:testInfo.outputPath('assistant-empty.png'), fullPage:true });
  await page.getByRole('button',{ name:'Show me music events',exact:true }).click();
  const log = page.getByRole('log',{ name:'Conversation' });
  await expect(log.locator('[data-assistant-event]')).toHaveCount(2);
  await expect(log).toContainText('Jazz Under the Stars');
  await page.locator('#chatInput').fill('where is the second one');
  await page.locator('#chatInput').press('Enter');
  await expect(log.locator('[data-chat-message=assistant]')).toHaveCount(2);
  const last = log.locator('[data-chat-message=assistant]').last();
  await expect(last.locator('[data-assistant-event]')).toHaveCount(1);
  await expect(last).toContainText('Botanical Garden');
  await last.getByRole('button',{ name:'View details: Jazz Under the Stars',exact:true }).click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Jazz Under the Stars');
  await page.locator('#closeDashboardDialog').click();
  await last.getByRole('button',{ name:'Save event: Jazz Under the Stars',exact:true }).click();
  await expect(last.getByRole('button',{ name:'Remove from saved: Jazz Under the Stars',exact:true })).toHaveAttribute('aria-pressed','true');
  await page.locator('#mainNav [data-page=saved]').click();
  await expect(page.locator('#savedGrid')).toContainText('Jazz Under the Stars');
  await page.goBack();
  await expect(page.locator('#page-chat')).toBeVisible();
  await page.screenshot({ path:testInfo.outputPath('assistant-results.png'), fullPage:true });
  await page.reload();
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await expect(page.getByRole('log')).toContainText('where is the second one');
  await page.getByRole('button',{ name:'New chat',exact:true }).click();
  await expect(page.getByRole('log').locator('[data-chat-message=user]')).toHaveCount(0);
  await expect(page.getByRole('button',{ name:'Show me music events',exact:true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('composer preserves multiline drafts and logout clears tab history', async ({ page }) => {
  await enter(page);
  const input = page.locator('#chatInput');
  await input.fill('How do I save an event?');
  await input.press('Shift+Enter');
  await expect(input).toHaveValue('How do I save an event?\n');
  await page.getByRole('button',{ name:'Send message',exact:true }).click();
  await expect(page.getByRole('log')).toContainText('only change your saved list');
  await input.fill('An unfinished question');
  await page.reload();
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await expect(page.locator('#chatInput')).toHaveValue('An unfinished question');
  await page.getByRole('button',{ name:'Log out',exact:true }).click();
  await expect(page.locator('#authLanding')).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem('cv_assistant_session_demo'))).toBeNull();
});
