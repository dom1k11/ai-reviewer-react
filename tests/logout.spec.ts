import { test, expect } from "@playwright/test";

test("log out", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel(/email/i).fill("admin@gmail.com");
  await page.getByRole("textbox", { name: /password/i }).fill("123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/app/);

  const closeOnboarding = page.getByRole("button", { name: "×" });
  if (await closeOnboarding.isVisible().catch(() => false)) {
    await closeOnboarding.click();
  }

  await page.getByRole("button", { name: /log out/i }).click();
  await expect(page).toHaveURL(/login/);
  await expect(
    page.getByRole("button", { name: /sign in/i })
  ).toBeVisible();
});
