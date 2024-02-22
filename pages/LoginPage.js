import { navigateTo } from "../utils";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async emailVerification() {
    const emailInput = await this.page.$('.account-form #email');
    const emailValue = await emailInput.getAttribute('value');

    return emailValue;
  }

  async logout() {
    await this.page.click('a[href="https://ua.puma.com/uk/customer/account/logout/"]');
    await this.page.waitForLoadState('load');
  }

  async login() {
    await navigateTo(this.page, '/customer/account/login/');
    await this.fillingLoginForm({
      email: process.env.EMAIL_TEST,
      password: process.env.PASSWORD_TEST,
    });
    await this.page.click('#loginForm #send2');
    await this.page.waitForLoadState('load');
  }

  async fillingLoginForm({ password, email }) {
    await this.page.fill('#loginForm #email', email);
    await this.page.fill('#loginForm #pass', password);
  }

  async fillingRegisterForm({ firstName, lastName, password, email, passwordConfirmation }) {
    await this.page.click('.authorization-title.register-title');

    await this.page.fill('#registerForm input[name=firstname]', firstName);
    await this.page.fill('#registerForm input[name=lastname]', lastName);
    await this.page.fill('#registerForm input[name=email]', email);
    await this.page.fill('#registerForm input[name=password]', password);
    await this.page.fill('#registerForm input[name=password_confirmation]', passwordConfirmation);
  }

  async invalidForm(idForm) {
    const formIsInvalid = await this.page.$$eval(`#${idForm} .form__row-text .form__row-text-i`, (inputs) => {
      return inputs.every((input) => input.classList.contains('invalid'));
    })

    return formIsInvalid;
  }

  async validForm(idForm) {
    const formIsInvalid = await this.page.$$eval(`#${idForm} .form__row-text .form__row-text-i`, (inputs) => {
      return inputs.every((input) => input.classList.contains('valid'));
    })

    return formIsInvalid;
  }
}