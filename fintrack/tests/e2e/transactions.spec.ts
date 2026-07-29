import { test, expect } from "../fixtures/auth.fixture";

test.describe("Transactions @transactions", () => {
  test("displays transactions page with summary cards", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Masuk").first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Keluar").first()).toBeVisible();
  });

  test("displays search input", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const searchInput = page.getByPlaceholder(/cari transaksi/i);
    await expect(searchInput).toBeVisible();
  });

  test("displays filter buttons", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("button", { name: /^semua$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^masuk$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^keluar$/i })).toBeVisible();
  });

  test("search input is functional", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const searchInput = page.getByPlaceholder(/cari transaksi/i);
    await searchInput.fill("test");
    await expect(searchInput).toHaveValue("test");
    await searchInput.fill("");
    await expect(searchInput).toHaveValue("");
  });

  test("filter buttons are clickable", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const incomeBtn = page.getByRole("button", { name: /^masuk$/i });
    await incomeBtn.click();
    await expect(incomeBtn).toHaveAttribute("class", /bg-emerald-500/);

    const expenseBtn = page.getByRole("button", { name: /^keluar$/i });
    await expenseBtn.click();
    await expect(expenseBtn).toHaveAttribute("class", /bg-red-500/);

    const allBtn = page.getByRole("button", { name: /^semua$/i });
    await allBtn.click();
    await expect(allBtn).toHaveAttribute("class", /bg-primary/);
  });

  test("scheduled expense tab is accessible", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const scheduledBtn = page.getByRole("button", { name: /terjadwal/i });
    await scheduledBtn.click();
    await expect(scheduledBtn).toHaveAttribute("class", /bg-violet-500/);
  });

  test("add transaction button opens modal", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /tambah transaksi/i });
    await addButton.click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10_000 });
  });

  test("import CSV button is visible", async ({ authenticatedPage: page }) => {
    await page.goto("/transactions");
    await page.waitForLoadState("networkidle");
    const importBtn = page.getByRole("button", { name: /impor csv/i });
    await expect(importBtn).toBeVisible();
  });
});
