
import { test, expect } from '@playwright/test';

test('Light/Dark Theme Toggle works and persists after reload', async ({ page }) => {

  // Open CampusVibes
  await page.goto('/');

  // Start from light mode
  await page.evaluate(() => {
    localStorage.setItem('campusvibes-theme', 'light');
  });
  await page.reload();

  // TEST 1: Switch from light to dark
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('button', { name: 'Switch to dark mode' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // TEST 2: Verify the button label changes
  await expect(
    page.getByRole('button', { name: 'Switch to light mode' })
  ).toBeVisible();

  // TEST 3: Verify dark mode persists after refresh
  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await expect.poll(async () => {
    return page.evaluate(() => localStorage.getItem('campusvibes-theme'));
  }).toBe('dark');

  // TEST 4: Switch back to light mode
  await page.getByRole('button', { name: 'Switch to light mode' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await expect(
    page.getByRole('button', { name: 'Switch to dark mode' })
  ).toBeVisible();

});
