import { test, expect } from '@playwright/test';

test('user can register successfully', async ({ page }) => {
  const email = `test_${Date.now()}@gmail.com`;

  await page.goto('/login');

  await page.getByRole('button', { name: /sign up/i }).click();

  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('123');

  await page.getByRole('button', { name: /next/i }).click();

  await page.getByLabel(/specialization/i).selectOption('frontend');
  await page.getByRole('button', { name: /next/i }).click();

  await page.getByLabel(/experience/i).selectOption('0-1');
  await page.getByLabel(/tone/i).selectOption('soft');
  await page.getByLabel(/style/i).selectOption('short');

  await page.getByRole('button', { name: /finish/i }).click();

  await expect(page).toHaveURL(/login|app/);
});
