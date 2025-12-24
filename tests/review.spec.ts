import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers/login";
import { closeOnboardingIfVisible } from "./helpers/closeOnboarding";

test("user can generate review", async ({ page }) => {
  await loginAsAdmin(page);
  await closeOnboardingIfVisible(page);

  await page
    .getByRole("textbox", { name: /repository/i })
    .fill("https://github.com/dom1k11/code-template");

  await page.getByRole("combobox").selectOption("bugs");
  await page.getByRole("checkbox", { name: /performance/i }).check();

  await page.getByRole("button", { name: /get review/i }).click();
  await expect(
    page.getByRole("heading", { name: /review result/i })
  ).toBeVisible({ timeout: 60_000 });

});
