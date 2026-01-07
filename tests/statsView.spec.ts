import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers/login";
import { closeOnboardingIfVisible } from "./helpers/closeOnboarding";

test("user can view review details in stats", async ({ page }) => {
  await loginAsAdmin(page);
  await closeOnboardingIfVisible(page);

  await page.getByRole("button", { name: /stats/i }).click();

  const showMoreButton = page
    .getByRole("button", { name: /show more/i })
    .first();

  await expect(showMoreButton).toBeVisible();

  await showMoreButton.click();

  // await expect(page.getByText(/final score/i)).toBeVisible();
  await expect(page.getByText(/pts/i).first()).toBeVisible();

  await expect(page.getByRole("button", { name: /show less/i })).toBeVisible();
});
