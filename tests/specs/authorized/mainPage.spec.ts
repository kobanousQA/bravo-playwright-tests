import test from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('Открытие списка задач', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
});
