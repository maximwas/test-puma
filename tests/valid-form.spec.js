import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage'

test.beforeEach(async ({ page }) => {
  await page.goto('/customer/account/login/');
});

test.describe('Valid login form', () => {
  test('correct form validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillingLoginForm({
      email: process.env.EMAIL_TEST,
      password: process.env.PASSWORD_TEST,
    });

    const formIsValid = await loginPage.validForm('loginForm');

    await expect(formIsValid).toBe(true);
  });

  test('incorrect form validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillingLoginForm({
      email: 'segsedrgwerg',
      password: '',
    });

    const formIsInvalid = await loginPage.invalidForm('loginForm');

    await expect(formIsInvalid).toBe(true);
  });
});

test.describe('Valid register form', () => {
  test('сorrect form validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillingRegisterForm({
      email: process.env.EMAIL_TEST,
      password: process.env.PASSWORD_TEST,
      passwordConfirmation: process.env.PASSWORD_TEST,
      firstName: 'Тест',
      lastName: 'Тест',
    });

    const formIsValid = await loginPage.validForm('registerForm');

    await expect(formIsValid).toBe(true);
  });

  test('incorrect form validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillingRegisterForm({
      email: 'asd123asd123',
      password: 'asd123asd123',
      passwordConfirmation: 'asd12334asd12334',
      firstName: 'Test',
      lastName: 'Test',
    });

    const formIsInvalid = await loginPage.invalidForm('registerForm');

    await expect(formIsInvalid).toBe(true);
  });
});
