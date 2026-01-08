import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers/login";
import { closeOnboardingIfVisible } from "./helpers/closeOnboarding";

test("log out", async ({ page }) => {
  await loginAsAdmin(page);
  await closeOnboardingIfVisible(page);

  await page.getByRole("button", { name: /log out/i }).click();

  await expect(page).toHaveURL(/login/);
  await expect(
    page.getByRole("button", { name: /sign in/i })
  ).toBeVisible();
});
