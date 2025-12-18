import { test, expect } from "@playwright/test";

test("user can generate review", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("onboarded", "true");
  });

  await page.goto("http://localhost:5173/app");

  await page
    .getByRole("textbox", { name: /repository/i })
    .fill("https://github.com/dom1k11/code-template");

  await page.getByRole("combobox").selectOption("bugs");
  await page.getByRole("checkbox", { name: /performance/i }).check();

  await page.getByRole("button", { name: /get review/i }).click();

  await expect(
    page.getByRole("heading", { name: /review result/i })
  ).toBeVisible();

  await expect(page.getByText(/score/i)).toBeVisible();
});
