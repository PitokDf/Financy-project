import { type Page, type Locator, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly googleButton: Locator;
  readonly loginLink: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Nama Lengkap" });
    this.emailInput = page.getByRole("textbox", { name: "Alamat Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Kata Sandi" }).first();
    this.confirmPasswordInput = page.getByRole("textbox", { name: "Konfirmasi Kata Sandi" });
    this.submitButton = page.getByRole("button", { name: /daftar akun gratis/i });
    this.googleButton = page.getByRole("button", { name: /daftar dengan google/i });
    this.loginLink = page.getByRole("link", { name: /sudah punya akun/i });
    this.heading = page.getByRole("heading", { name: /buat akun fintrack/i });
  }

  async goto() {
    await this.page.goto("/register");
    await expect(this.heading).toBeVisible();
  }

  async register(name: string, email: string, password: string, confirmPassword: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
  }

  async registerAndWaitForDashboard(name: string, email: string, password: string) {
    await this.register(name, email, password, password);
    await expect(this.page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
  }
}
