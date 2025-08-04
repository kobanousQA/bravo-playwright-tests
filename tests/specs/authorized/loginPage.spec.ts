import test from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Открытие формы входа', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test('Проверка доступности элементов формы', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.authFormCorrectAria();
});
