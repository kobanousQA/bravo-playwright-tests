import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly authFormLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.authFormLocator = this.page
      .locator('div')
      .filter({ hasText: /^АвторизацияЛогинПарольВойти$/ })
      .first();
  }
  async open() {
    this.page.goto('http://localhost:5173/login');
  }

  async authFormCorrectAria() {
    await expect(this.authFormLocator).toMatchAriaSnapshot();
  }
}
