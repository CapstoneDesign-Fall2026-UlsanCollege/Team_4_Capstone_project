import { test, expect } from '@playwright/test';

test('demo suggestions save and restore private drafts without pretending to submit', async ({ page }) => {
  await page.goto('/');
  await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page=suggest]').click();
  await page.locator('#suggestName').fill('Campus open studio');
  await page.locator('#suggestHost').fill('Arts Club');
  await page.locator('#suggestDescription').fill('An inclusive painting workshop.');
  await page.getByRole('button', { name: 'More', exact: true }).click();
  await page.getByRole('button', { name: 'Academics', exact: true }).click();
  await page.locator('#suggestAnonymous').check();
  await page.reload();
  await page.evaluate(() => document.querySelector('#demoLogin').click());
  await expect(page.locator('#suggestName')).toHaveValue('Campus open studio');
  await expect(page.locator('#suggestAnonymous')).toBeChecked();
  await expect(page.locator('#suggestHost')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Academics', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Sign in to send');
  await expect(page.locator('#suggestName')).toHaveValue('Campus open studio');
  await expect(page.getByRole('button', { name: 'Team review', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Attachments unavailable/ })).toBeDisabled();
});
