import { Page, expect } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel(/email/i).fill("admin@gmail.com");
  await page.getByRole("textbox", { name: /password/i }).fill("123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/app/);
}
