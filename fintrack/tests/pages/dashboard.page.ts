import { type Page, type Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly totalBalance: Locator;
  readonly incomeCard: Locator;
  readonly expenseCard: Locator;
  readonly secureToggle: Locator;
  readonly streakBadge: Locator;
  readonly topCategoriesHeading: Locator;
  readonly recentTransactionsHeading: Locator;
  readonly viewAllTransactionsLink: Locator;
  readonly addTransactionButton: Locator;
  readonly achievementsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalBalance = page.locator("text=Total Saldo").locator("..").locator("..").locator("p.text-3xl");
    this.incomeCard = page.getByText("Pemasukan").first();
    this.expenseCard = page.getByText("Pengeluaran").first();
    this.secureToggle = page.locator("button").filter({ has: page.locator("svg") }).last();
    this.streakBadge = page.locator("text/hari").first();
    this.topCategoriesHeading = page.getByText("Kategori Teratas");
    this.recentTransactionsHeading = page.getByText("Transaksi Terakhir");
    this.viewAllTransactionsLink = page.getByRole("link", { name: /lihat semua/i });
    this.addTransactionButton = page.getByRole("link", { name: /add/i }).or(page.getByLabel(/add/i));
    this.achievementsLink = page.getByRole("link").filter({ has: page.locator("svg") }).first();
  }

  async goto() {
    await this.page.goto("/dashboard");
    await this.page.waitForLoadState("networkidle");
  }

  async expectLoaded() {
    await expect(this.topCategoriesHeading).toBeVisible({ timeout: 10_000 });
  }

  async toggleSecureMode() {
    const eyeButton = this.page.locator("button").filter({ has: this.page.locator("[class*='lucide-eye']") }).first();
    await eyeButton.click();
  }

  async navigateToTransactions() {
    await this.viewAllTransactionsLink.click();
    await this.page.waitForURL("**/transactions");
  }
}
