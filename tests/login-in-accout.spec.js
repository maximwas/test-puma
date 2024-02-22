import { test, expect } from '../fixtures/login';
import { LoginPage } from '../pages/LoginPage'

test.describe('Login', () => {
  test('login to the puma account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const emailValue = await loginPage.emailVerification();

    await expect(emailValue).toEqual(process.env.EMAIL_TEST);
  });

  test('log out of the puma account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logout();

    await expect(page).toHaveURL('https://ua.puma.com/uk/customer/account/logoutSuccess/');
  })
});