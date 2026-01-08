import { Page } from "@playwright/test";

export async function closeOnboardingIfVisible(page: Page) {
  const closeButton = page.getByRole("button", { name: "×" });

  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
  }

  await page
    .locator(".introjs-overlay")
    .waitFor({ state: "detached", timeout: 5000 })
    .catch(() => {});
}
