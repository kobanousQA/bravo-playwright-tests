import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EventsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(`${process.env.TEST_URL}${process.env.EVENTS_PATH}`);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
