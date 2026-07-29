import { type Page, type Locator, expect } from "@playwright/test";

export class BudgetPage {
  readonly page: Page;
  readonly addBudgetButton: Locator;
  readonly totalBudgetCard: Locator;
  readonly warningCount: Locator;
  readonly dangerCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBudgetButton = page.getByRole("button", { name: /tambah budget/i }).or(page.getByRole("button", { name: / tambah/i }));
    this.totalBudgetCard = page.getByText("Total Anggaran");
    this.warningCount = page.locator("text/warning/i").first();
    this.dangerCount = page.locator("text/over/i").first();
  }

  async goto() {
    await this.page.goto("/budget");
    await this.page.waitForLoadState("networkidle");
  }

  async expectLoaded() {
    await expect(this.totalBudgetCard).toBeVisible({ timeout: 10_000 });
  }

  async openAddDialog() {
    await this.addBudgetButton.click();
  }

  async expectBudgetVisible(name: string) {
    await expect(this.page.getByText(name).first()).toBeVisible({ timeout: 10_000 });
  }

  async expectBudgetNotVisible(name: string) {
    await expect(this.page.getByText(name).first()).toBeHidden({ timeout: 5_000 });
  }
}
