import { test, expect } from "@playwright/test";
test("login + onboarding flow", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("admin@gmail.com");
  await page.getByRole("textbox", { name: /password/i }).fill("123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/app/);

  const onboarding = page.getByRole("dialog");
  await expect(onboarding).toBeVisible();

  const next = page.getByRole("button", { name: "Next →" });
  

  await next.click();
  await next.click();
  await next.click();
  const finish = page.getByRole("button", { name: "Got it!" });
  await expect(finish).toBeVisible();

  await finish.click();

  await expect(onboarding).not.toBeVisible();
});
