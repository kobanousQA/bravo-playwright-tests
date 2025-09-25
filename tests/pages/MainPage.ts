import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly tagManagment = this.page.getByRole('listitem').filter({ hasText: 'Управление тегами' });
  readonly eventLocator = this.page.getByRole('listitem').filter({ hasText: 'События' });
  readonly tasksLocator = this.page.getByRole('listitem').filter({ hasText: 'Задачник' });

  readonly newTaskButton = this.page.locator('button').filter({ hasText: 'Новая задача' });

  async open() {
    await this.page.goto(`${process.env.TEST_URL}${process.env.MAIN_PATH}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async gotoEvents() {
    await this.eventLocator.click();
  }

  async gotoTagManagment() {
    await this.tagManagment.click();
  }

  async gotoTasks() {
    await this.tasksLocator.click();
  }

  async addTasks() {
    await this.newTaskButton.click();
  }
}
