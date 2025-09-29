import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly authFormLocator: Locator;
  readonly loginButton: Locator;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.authFormLocator = this.page
      .locator('div')
      .filter({ hasText: /^АвторизацияЛогинПарольВойти$/ })
      .first();

    this.loginButton = this.page.getByRole('button', { name: 'Войти' });
    this.loginInput = this.page.locator('input[type="text"]');
    this.passwordInput = this.page.locator('input[type="password"]');
  }

  async open() {
    await this.page.goto(`${process.env.TEST_URL}/login`, { waitUntil: 'networkidle' });
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Войти' }).click();
  }

  async authFormCorrectAria() {
    await expect(this.authFormLocator).toMatchAriaSnapshot();
  }
}
