export const login = async (page) => {
  await page.goto('https://ua.puma.com/uk/customer/account/login/');
  await page.waitForLoadState('load');
  await page.fill('#loginForm #email',  process.env.EMAIL_TEST);
  await page.fill('#loginForm #pass', process.env.PASSWORD_TEST);
  await page.click('#loginForm #send2');
  await page.waitForLoadState('load');
}