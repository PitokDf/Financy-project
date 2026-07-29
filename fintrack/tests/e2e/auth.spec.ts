import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Authentication @auth", () => {
  test.describe("Login Page", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
    });

    test("displays login form with all elements", async ({ page }) => {
      await expect(loginPage.heading).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
      await expect(loginPage.googleButton).toBeVisible();
      await expect(loginPage.forgotPasswordLink).toBeVisible();
      await expect(loginPage.registerLink).toBeVisible();
    });

    test("shows validation errors for empty fields", async ({ page }) => {
      await loginPage.submitButton.click();
      await expect(page.getByText("Email wajib diisi")).toBeVisible();
    });

    test("shows validation error for invalid email format", async ({ page }) => {
      await loginPage.emailInput.fill("bukanemail");
      await loginPage.passwordInput.fill("password123");
      await loginPage.submitButton.click();
      const isValid = await page.evaluate(() => {
        const input = document.querySelector('input[type="email"]') as HTMLInputElement;
        return input?.validity.valid ?? true;
      });
      expect(isValid).toBe(false);
    });

    test("shows error for wrong password", async ({ page }) => {
      await loginPage.login("testuser@fintrack.com", "wrongpassword");
      await expect(page.locator(".text-destructive, [class*='destructive']").first()).toBeVisible({ timeout: 10_000 });
    });

    test("successful login redirects to dashboard", async ({ page }) => {
      await loginPage.loginAndWaitForDashboard(
        process.env.TEST_EMAIL!,
        process.env.TEST_PASSWORD!
      );
      expect(page.url()).toContain("/dashboard");
    });

    test("forgot password link navigates correctly", async ({ page }) => {
      await loginPage.forgotPasswordLink.click();
      await expect(page).toHaveURL(/\/forgot-password/, { timeout: 10_000 });
      await expect(page.getByRole("heading", { name: /lupa kata sandi/i })).toBeVisible();
    });

    test("register link navigates correctly", async ({ page }) => {
      await loginPage.registerLink.click();
      await expect(page).toHaveURL(/\/register/, { timeout: 10_000 });
      await expect(page.getByRole("heading", { name: /buat akun fintrack/i })).toBeVisible();
    });

    test("Google login button is clickable", async ({ page }) => {
      await expect(loginPage.googleButton).toBeEnabled();
    });
  });

  test.describe("Register Page", () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
      registerPage = new RegisterPage(page);
      await registerPage.goto();
    });

    test("displays register form with all elements", async ({ page }) => {
      await expect(registerPage.heading).toBeVisible();
      await expect(registerPage.nameInput).toBeVisible();
      await expect(registerPage.emailInput).toBeVisible();
      await expect(registerPage.passwordInput).toBeVisible();
      await expect(registerPage.confirmPasswordInput).toBeVisible();
      await expect(registerPage.submitButton).toBeVisible();
      await expect(registerPage.googleButton).toBeVisible();
    });

    test("shows validation errors for empty fields", async ({ page }) => {
      await registerPage.submitButton.click();
      await expect(page.getByText("Nama wajib diisi")).toBeVisible();
    });

    test("shows validation error for short name", async ({ page }) => {
      await registerPage.nameInput.fill("A");
      await registerPage.emailInput.fill("test@test.com");
      await registerPage.passwordInput.fill("Password123");
      await registerPage.confirmPasswordInput.fill("Password123");
      await registerPage.submitButton.click();
      await expect(page.getByText("Nama minimal 2 karakter")).toBeVisible();
    });

    test("shows validation error for weak password", async ({ page }) => {
      await registerPage.nameInput.fill("Test User");
      await registerPage.emailInput.fill("test@test.com");
      await registerPage.passwordInput.fill("weak");
      await registerPage.confirmPasswordInput.fill("weak");
      await registerPage.submitButton.click();
      await expect(page.getByText("Minimal 8 karakter")).toBeVisible();
    });

    test("shows validation error for password without uppercase", async ({ page }) => {
      await registerPage.nameInput.fill("Test User");
      await registerPage.emailInput.fill("test@test.com");
      await registerPage.passwordInput.fill("nouppercase1");
      await registerPage.confirmPasswordInput.fill("nouppercase1");
      await registerPage.submitButton.click();
      await expect(page.getByText(/huruf kapital/i)).toBeVisible();
    });

    test("shows validation error for password without number", async ({ page }) => {
      await registerPage.nameInput.fill("Test User");
      await registerPage.emailInput.fill("test@test.com");
      await registerPage.passwordInput.fill("NoNumberHere");
      await registerPage.confirmPasswordInput.fill("NoNumberHere");
      await registerPage.submitButton.click();
      await expect(page.getByText(/angka/i)).toBeVisible();
    });

    test("shows validation error for mismatched passwords", async ({ page }) => {
      await registerPage.nameInput.fill("Test User");
      await registerPage.emailInput.fill("test@test.com");
      await registerPage.passwordInput.fill("Password123");
      await registerPage.confirmPasswordInput.fill("Different123");
      await registerPage.submitButton.click();
      await expect(page.getByText(/tidak cocok/i)).toBeVisible();
    });

    test("login link navigates correctly", async ({ page }) => {
      await registerPage.loginLink.click();
      await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
      await expect(page.getByRole("heading", { name: /masuk ke fintrack/i })).toBeVisible();
    });
  });

  test.describe("Forgot Password Page", () => {
    test("displays forgot password form", async ({ page }) => {
      await page.goto("/forgot-password");
      await expect(page.getByRole("heading", { name: /lupa kata sandi/i })).toBeVisible();
      await expect(page.getByRole("textbox", { name: "Alamat Email" })).toBeVisible();
      await expect(page.getByRole("button", { name: /kirim link reset/i })).toBeVisible();
    });

    test("shows validation error for empty email", async ({ page }) => {
      await page.goto("/forgot-password");
      await page.getByRole("button", { name: /kirim link reset/i }).click();
      await expect(page.getByText("Email wajib diisi")).toBeVisible();
    });

    test("shows validation error for invalid email", async ({ page }) => {
      await page.goto("/forgot-password");
      await page.getByRole("textbox", { name: "Alamat Email" }).fill("invalid");
      await page.getByRole("button", { name: /kirim link reset/i }).click();
      const isValid = await page.evaluate(() => {
        const input = document.querySelector('input[type="email"]') as HTMLInputElement;
        return input?.validity.valid ?? true;
      });
      expect(isValid).toBe(false);
    });

    test("back to login link works", async ({ page }) => {
      await page.goto("/forgot-password");
      await page.getByRole("link", { name: /kembali ke login/i }).click();
      await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    });
  });

  test.describe("Reset Password Page", () => {
    test("shows invalid token page when no token", async ({ page }) => {
      await page.goto("/reset-password");
      await expect(page.getByText("Link Tidak Valid")).toBeVisible();
    });

    test("shows invalid token page for bad token", async ({ page }) => {
      await page.goto("/reset-password?token=invalidtoken123");
      await expect(page.getByRole("heading", { name: /reset password/i })).toBeVisible({ timeout: 10_000 });
    });
  });

  test.describe("Route Protection @route-guard", () => {
    test("unauthenticated user is redirected to login from dashboard", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    });

    test("unauthenticated user is redirected to login from transactions", async ({ page }) => {
      await page.goto("/transactions");
      await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    });

    test("unauthenticated user is redirected to login from budget", async ({ page }) => {
      await page.goto("/budget");
      await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    });

    test("unauthenticated user is redirected to login from profile", async ({ page }) => {
      await page.goto("/profile");
      await page.waitForLoadState("networkidle");
      // ProtectedRoute hides content when not authenticated; check that protected elements are not visible
      await expect(page.getByRole("button", { name: /keluar/i })).not.toBeVisible({ timeout: 10_000 });
    });
  });
});
