import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle',
    timeout = 30000,
  ) {
    await this.page.waitForLoadState(state, { timeout });
  }
}
