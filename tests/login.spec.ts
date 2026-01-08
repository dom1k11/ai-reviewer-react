import { test, expect } from "@playwright/test";

test("admin can log in", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("admin@gmail.com");
  await page.getByRole("textbox", { name: /password/i }).fill("123");

  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/app/);
});
