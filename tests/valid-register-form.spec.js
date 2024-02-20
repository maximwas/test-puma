import { test, expect } from '@playwright/test';

test('Valid form', async ({ page }) => {
  await page.goto('https://ua.puma.com/uk/customer/account/login/');
  await page.click('.authorization-title.register-title');

  await page.fill('#registerForm input[name=firstname]', 'Тест');
  await page.fill('#registerForm input[name=lastname]', 'Тест');
  await page.fill('#registerForm input[name=email]', 'vasanin02@gmail.com');
  await page.fill('#registerForm input[name=password]', 'V20002asd1q2w');
  await page.fill('#registerForm input[name=password_confirmation]', 'V20002asd1q2w');

  const formIsValid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
    return inputs.every((input) => input.classList.contains('valid'));
  })

  expect(formIsValid).toBe(true);
});

test('Invalid form', async ({ page }) => {
  await page.goto('https://ua.puma.com/uk/customer/account/login/');
  await page.click('.authorization-title.register-title');

  await page.fill('#registerForm input[name=firstname]', 'Test');
  await page.fill('#registerForm input[name=lastname]', 'Test');
  await page.fill('#registerForm input[name=email]', 'asd123asd123');
  await page.fill('#registerForm input[name=password]', 'asd123asd123');
  await page.fill('#registerForm input[name=password_confirmation]', 'asd12334asd12334');

  const formIsInvalid = await page.$$eval('#registerForm .form__row-text .form__row-text-i', (inputs) => {
    return inputs.every((input) => input.classList.contains('invalid'));
  })

  expect(formIsInvalid).toBe(true);
});
