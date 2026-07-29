import { type Page, type Locator, expect } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly userName: Locator;
  readonly userEmail: Locator;
  readonly editProfileLink: Locator;
  readonly changePasswordLink: Locator;
  readonly helpLink: Locator;
  readonly logoutButton: Locator;
  readonly logoutConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator(".font-bold").first();
    this.userEmail = page.locator(".text-muted-foreground").first();
    this.editProfileLink = page.getByRole("link", { name: /edit profil/i });
    this.changePasswordLink = page.getByRole("link", { name: /ganti kata sandi/i });
    this.helpLink = page.getByRole("link", { name: /bantuan/i });
    this.logoutButton = page.getByRole("button", { name: /keluar/i });
    this.logoutConfirmButton = page.getByRole("button", { name: /keluar/i }).last();
  }

  async goto() {
    await this.page.goto("/profile");
    await this.page.waitForLoadState("networkidle");
  }

  async logout() {
    await this.logoutButton.click();
  }

  async confirmLogout() {
    await this.logoutConfirmButton.click();
  }

  async expectLoggedOut() {
    await this.page.waitForURL("**/login", { timeout: 10_000 });
  }
}
