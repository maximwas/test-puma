import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

export const test = base.extend({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.login();
    await use(page);
  }
})

export { expect } from '@playwright/test';