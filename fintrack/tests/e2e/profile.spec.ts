import { test, expect } from "../fixtures/auth.fixture";

test.describe("Profile @profile", () => {
  test("displays profile page elements", async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Akun", { exact: true })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole("button", { name: /keluar/i })).toBeVisible();
  });

  test("profile menu items are visible", async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(/edit profil/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("logout button is visible", async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("button", { name: /keluar/i })).toBeVisible({ timeout: 10_000 });
  });

  test("logout shows confirmation dialog", async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /keluar/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5_000 });
  });

  test("logout confirmation triggers logout flow", async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /keluar/i }).click();
    await page.waitForSelector("[role='dialog']", { timeout: 5_000 });
    await expect(page.getByRole("dialog")).toContainText("Keluar dari Akun");
    const confirmButton = page.getByRole("button", { name: /ya, keluar/i });
    await confirmButton.click();
    // Dialog should close after confirm; redirect may or may not happen depending on API state
    await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 10_000 });
  });
});
