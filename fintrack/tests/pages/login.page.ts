import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly googleButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Alamat Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Kata Sandi" });
    this.submitButton = page.getByRole("button", { name: /masuk sekarang/i });
    this.errorMessage = page.locator(".text-destructive").first();
    this.googleButton = page.getByRole("button", { name: /lanjutkan dengan google/i });
    this.forgotPasswordLink = page.getByRole("link", { name: /lupa kata sandi/i });
    this.registerLink = page.getByRole("link", { name: /daftar gratis/i });
    this.heading = page.getByRole("heading", { name: /masuk ke fintrack/i });
  }

  async goto() {
    await this.page.goto("/login");
    await expect(this.heading).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginAndWaitForDashboard(email: string, password: string) {
    await this.login(email, password);
    await expect(this.page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
  }

  async expectError(message: string | RegExp) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectValidationError(field: "email" | "password", message: string) {
    const input = field === "email" ? this.emailInput : this.passwordInput;
    const fieldId = await input.getAttribute("id");
    if (fieldId) {
      const error = this.page.locator(`[id*="${fieldId}"] ~ p, [id*="${fieldId}"]-item-message`);
      await expect(error.first()).toContainText(message);
    }
  }
}
