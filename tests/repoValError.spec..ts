import { test, expect } from "@playwright/test";

test("shows validation error for invalid repo url", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("onboarded", "true");
  });

  await page.goto("/app");

  await page
    .getByRole("textbox", { name: /repository/i })
    .fill("https://github.com/only-owner");

  await page.getByRole("button", { name: /get review/i }).click();

  await expect(
    page.getByText(/repository url must be in format/i)
  ).toBeVisible();
});
