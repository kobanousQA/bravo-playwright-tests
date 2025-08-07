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
    await this.page.goto(process.env.TEST_URL as string);
  }

  async authFormCorrectAria() {
    await expect(this.authFormLocator).toMatchAriaSnapshot();
  }
}
