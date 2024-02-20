import { test, expect } from '@playwright/test';

test('Valid form', async ({ page }) => {
  await page.goto('https://ua.puma.com/uk/customer/account/login/');

  await page.fill('#loginForm #email', 'vasanin02@gmail.com');
  await page.fill('#loginForm #pass', 'V2002asd1q2w');

  const formIsValid = await page.$$eval('#loginForm .form__row-text .form__row-text-i', (inputs) => {
    return inputs.every((input) => input.classList.contains('valid'));
  })

  expect(formIsValid).toBe(true);
});

test('Invalid form', async ({ page }) => {
  await page.goto('https://ua.puma.com/uk/customer/account/login/');

  await page.fill('#loginForm #email', 'segsedrgwerg');
  await page.fill('#loginForm #pass', '');

  const formIsInvalid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
    return inputs.every((input) => input.classList.contains('invalid'));
  })

  expect(formIsInvalid).toBe(true);
});
