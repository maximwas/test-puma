import { test, expect } from '@playwright/test';

import { login } from '../utils/login'

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.describe('Login', () => {
  test('login to the puma account', async ({ page }) => {
    const emailInput = await page.$('.account-form #email');
    const emailValue = await emailInput.getAttribute('value');

    await expect(emailValue).toEqual(process.env.EMAIL_TEST);
  });

  test('log out of the puma account', async ({ page }) => {
    await page.click('a[href="https://ua.puma.com/uk/customer/account/logout/"]');
    await page.waitForLoadState('load');

    await expect(page).toHaveURL('https://ua.puma.com/uk/customer/account/logoutSuccess/');
  })
});