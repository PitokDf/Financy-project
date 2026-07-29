import { test, expect } from "../fixtures/auth.fixture";

test.describe("Budget @budget", () => {
  test("displays budget page with total budget card", async ({ authenticatedPage: page }) => {
    await page.goto("/budget");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Total Anggaran")).toBeVisible({ timeout: 10_000 });
  });

  test("add budget button is visible", async ({ authenticatedPage: page }) => {
    await page.goto("/budget");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button").filter({ has: page.locator("[class*='lucide-plus']") }).first();
    await expect(addButton).toBeVisible();
  });

  test("add budget button opens dialog", async ({ authenticatedPage: page }) => {
    await page.goto("/budget");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button").filter({ has: page.locator("[class*='lucide-plus']") }).first();
    await addButton.click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10_000 });
  });
});
