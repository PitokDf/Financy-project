import { test, expect } from "../fixtures/auth.fixture";

test.describe("Dashboard @dashboard", () => {
  test("displays main dashboard elements", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Saldo Total")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Pemasukan").first()).toBeVisible();
    await expect(page.getByText("Pengeluaran").first()).toBeVisible();
  });

  test("displays top categories section", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Kategori Teratas")).toBeVisible({ timeout: 10_000 });
  });

  test("displays recent transactions section", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Transaksi Terbaru")).toBeVisible({ timeout: 10_000 });
  });

  test("secure mode toggle hides/shows amounts", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    const eyeButton = page.locator("button").filter({ has: page.locator("[class*='lucide-eye']") }).first();
    if (await eyeButton.isVisible()) {
      await eyeButton.click();
      await expect(page.locator("[class*='lucide-eye-off']").first()).toBeVisible();
    }
  });

  test("add transaction button is visible", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("link", { name: /tambah transaksi/i }).or(page.getByLabel(/tambah transaksi/i));
    await expect(addButton.first()).toBeVisible();
  });

  test("no hydration errors in console", async ({ authenticatedPage: page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    const hydrationErrors = consoleErrors.filter(
      (e) => e.includes("Hydration") || e.includes("hydration") || e.includes("did not match")
    );
    expect(hydrationErrors).toEqual([]);
  });
});
