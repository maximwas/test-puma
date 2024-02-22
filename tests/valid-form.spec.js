import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/customer/account/login/');
});

test.describe('Valid login form', () => {
  test('correct form validation', async ({ page }) => {
    await page.fill('#loginForm #email', process.env.EMAIL_TEST);
    await page.fill('#loginForm #pass', process.env.PASSWORD_TEST);

    const formIsValid = await page.$$eval('#loginForm .form__row-text .form__row-text-i', (inputs) => {
      return inputs.every((input) => input.classList.contains('valid'));
    })

    await expect(formIsValid).toBe(true);
  });

  test('incorrect form validation', async ({ page }) => {
    await page.fill('#loginForm #email', 'segsedrgwerg');
    await page.fill('#loginForm #pass', '');

    const formIsInvalid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
      return inputs.every((input) => input.classList.contains('invalid'));
    })

    await expect(formIsInvalid).toBe(true);
  });
});

test.describe('Valid register form', () => {
  test('сorrect form validation', async ({ page }) => {
    await page.click('.authorization-title.register-title');

    await page.fill('#registerForm input[name=firstname]', 'Тест');
    await page.fill('#registerForm input[name=lastname]', 'Тест');
    await page.fill('#registerForm input[name=email]', process.env.EMAIL_TEST);
    await page.fill('#registerForm input[name=password]', process.env.PASSWORD_TEST);
    await page.fill('#registerForm input[name=password_confirmation]', process.env.PASSWORD_TEST);

    const formIsValid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
      return inputs.every((input) => input.classList.contains('valid'));
    })

    await expect(formIsValid).toBe(true);
  });

  test('incorrect form validation', async ({ page }) => {
    await page.click('.authorization-title.register-title');

    await page.fill('#registerForm input[name=firstname]', 'Test');
    await page.fill('#registerForm input[name=lastname]', 'Test');
    await page.fill('#registerForm input[name=email]', 'asd123asd123');
    await page.fill('#registerForm input[name=password]', 'asd123asd123');
    await page.fill('#registerForm input[name=password_confirmation]', 'asd12334asd12334');

    const formIsInvalid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
      return inputs.every((input) => input.classList.contains('invalid'));
    })

    await expect(formIsInvalid).toBe(true);
  });
});
