import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/customer/account/login/');
    await page.waitForLoadState('load');
    await page.fill('#loginForm #email', process.env.EMAIL_TEST);
    await page.fill('#loginForm #pass', process.env.PASSWORD_TEST);
    await page.click('#loginForm #send2');
    await page.waitForLoadState('load');

    await use(page);
  }
})

export { expect } from '@playwright/test';