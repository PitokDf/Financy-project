import { test as base, type BrowserContext, type Page } from "@playwright/test";
import path from "path";

const authFile = path.resolve(__dirname, "../../.auth/user.json");

type AuthFixtures = {
  authenticatedPage: Page;
  authenticatedContext: BrowserContext;
};

export const test = base.extend<AuthFixtures>({
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: authFile });
    await use(context);
    await context.close();
  },

  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from "@playwright/test";
