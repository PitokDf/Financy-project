import { type Page, type Locator, expect } from "@playwright/test";

export class TransactionsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly filterAll: Locator;
  readonly filterIncome: Locator;
  readonly filterExpense: Locator;
  readonly scheduledExpenseButton: Locator;
  readonly settingsButton: Locator;
  readonly addTransactionButton: Locator;
  readonly importCsvButton: Locator;
  readonly incomeSummary: Locator;
  readonly expenseSummary: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder(/cari transaksi/i);
    this.filterAll = page.getByRole("button", { name: /^semua$/i });
    this.filterIncome = page.getByRole("button", { name: /^pemasukan$/i });
    this.filterExpense = page.getByRole("button", { name: /^pengeluaran$/i });
    this.scheduledExpenseButton = page.getByRole("button", { name: /pengeluaran terjadwal/i });
    this.settingsButton = page.getByRole("button").filter({ has: page.locator("[class*='lucide-settings']") });
    this.addTransactionButton = page.getByLabel(/add/i);
    this.importCsvButton = page.getByLabel(/import/i);
    this.incomeSummary = page.locator(".bg-emerald-50, .dark\\:bg-emerald-950\\/40").first();
    this.expenseSummary = page.locator(".bg-red-50, .dark\\:bg-red-950\\/40").first();
    this.emptyState = page.getByText("Belum ada transaksi");
  }

  async goto() {
    await this.page.goto("/transactions");
    await this.page.waitForLoadState("networkidle");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async filter(type: "ALL" | "INCOME" | "EXPENSE") {
    const button = type === "ALL" ? this.filterAll : type === "INCOME" ? this.filterIncome : this.filterExpense;
    await button.click();
  }

  async openAddModal() {
    await this.addTransactionButton.click();
  }

  async expectTransactionVisible(description: string) {
    await expect(this.page.getByText(description).first()).toBeVisible({ timeout: 10_000 });
  }

  async expectTransactionNotVisible(description: string) {
    await expect(this.page.getByText(description).first()).toBeHidden({ timeout: 5_000 });
  }
}
