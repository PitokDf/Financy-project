import { test as setup, expect } from "@playwright/test";

const authFile = ".auth/user.json";
const testEmail = process.env.TEST_EMAIL!;
const testPassword = process.env.TEST_PASSWORD!;
const testName = process.env.TEST_NAME || "Test User";

setup("authenticate", async ({ page }) => {
  // Try to register first (in case test user doesn't exist yet)
  await page.goto("/register");
  await page.waitForLoadState("networkidle");

  const nameInput = page.getByRole("textbox", { name: "Nama Lengkap" });
  if (await nameInput.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await nameInput.fill(testName);
    await page.getByRole("textbox", { name: "Alamat Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Kata Sandi" }).first().fill(testPassword);
    await page.getByRole("textbox", { name: "Konfirmasi Kata Sandi" }).fill(testPassword);
    await page.getByRole("button", { name: /daftar akun gratis/i }).click();

    // Wait for either dashboard (success) or error (user already exists / rate limited)
    const dashboardOrError = await Promise.race([
      page.waitForURL(/\/dashboard/, { timeout: 15_000 }).then(() => "dashboard" as const),
      page.locator(".text-destructive, [class*='destructive']").first().waitFor({ state: "visible", timeout: 15_000 }).then(() => "error" as const),
    ]).catch(() => "timeout" as const);

    if (dashboardOrError === "dashboard") {
      await page.context().storageState({ path: authFile });
      return;
    }
  }

  // If registration failed or user already exists, try login with retries
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByRole("textbox", { name: "Alamat Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Kata Sandi" }).fill(testPassword);
    await page.getByRole("button", { name: /masuk sekarang/i }).click();

    // Wait for success toast then for navigation
    try {
      await page.locator("text=Selamat datang kembali!").waitFor({ state: "visible", timeout: 10_000 });
      // After toast, wait for URL to change to dashboard
      await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
      await page.context().storageState({ path: authFile });
      return;
    } catch {
      // Check if we landed on dashboard anyway (URL changed before toast check)
      if (page.url().includes("/dashboard")) {
        await page.context().storageState({ path: authFile });
        return;
      }
    }

    // Rate limited — wait before retry
    if (attempt < 2) {
      await page.waitForTimeout(5000);
    }
  }

  throw new Error("Authentication failed after 3 attempts (possible rate limiting)");
});
