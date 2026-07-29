import { test, expect } from "../fixtures/auth.fixture";

test.describe("Navigation @navigation", () => {
  test("bottom nav is visible on main pages", async ({ authenticatedPage: page }) => {
    const pages = ["/dashboard", "/transactions", "/analysis", "/budget", "/profile"];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const nav = page.getByRole("navigation");
      await expect(nav).toBeVisible({ timeout: 10_000 });
    }
  });

  test("bottom nav links navigate correctly", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");

    const navLinks = [
      { label: "Beranda", href: "/dashboard" },
      { label: "Transaksi", href: "/transactions" },
      { label: "Analisis", href: "/analysis" },
      { label: "Anggaran", href: "/budget" },
      { label: "Profil", href: "/profile" },
    ];

    for (const { label, href } of navLinks) {
      const link = page.getByRole("navigation").getByRole("link", { name: label });
      if (await link.isVisible()) {
        await link.click();
        await expect(page).toHaveURL(new RegExp(href), { timeout: 10_000 });
      }
    }
  });

  test("active nav item is highlighted", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    const dashboardLink = page.getByRole("navigation").getByRole("link", { name: "Beranda" });
    await expect(dashboardLink).toHaveAttribute("class", /text-primary/);
  });

  test("dashboard page has header", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Selamat")).toBeVisible({ timeout: 15_000 });
  });

  test("page title is correct", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});
