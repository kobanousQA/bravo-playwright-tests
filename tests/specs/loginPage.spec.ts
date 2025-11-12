import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
import { testit } from 'testit-adapter-playwright';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test('Открытие страницы авторизации', async ({ page }) => {
  testit.externalId('login_page_opening');
  testit.displayName('Открытие страницы авторизации');
  testit.title('Проверка открытия страницы авторизации');
  testit.description('Тест проверяет открытие страницы авторизации и доступность элементов формы');
  testit.labels(['login', 'ui', 'smoke']);

  await test.step('Перейти на страницу авторизации', async () => {
    await loginPage.open();
  });

  await test.step('Проверить доступность элементов формы', async () => {
    await loginPage.authFormCorrectAria();
  });
});

test('Попытка отправить форму с незаполненными полями', async ({ page }) => {
  await test.step('Перейти на страницу авторизации', async () => {
    await loginPage.open();
  });

  await test.step('Проверить отображение кнопки "Войти"', async () => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText('Войти');
  });

  await test.step('Проверить, что кнопка "Войти" неактивна', async () => {
    await expect(loginPage.loginButton).toBeDisabled();
  });
});

test('Попытка отправить форму с частично заполненными полями', async ({ page }) => {
  await test.step('Перейти на страницу авторизации', async () => {
    await loginPage.open();
  });

  await test.step('Ввести логин', async () => {
    await loginPage.loginInput.fill('glebov_ma_test');
  });

  await test.step('Проверить, что кнопка "Войти" неактивна', async () => {
    await expect(loginPage.loginButton).toBeDisabled();
  });

  await test.step('Очистить поле логина и ввести пароль', async () => {
    await loginPage.loginInput.fill('');
    await loginPage.passwordInput.fill('Glebov12345');
  });

  await test.step('Проверить, что кнопка "Войти" неактивна', async () => {
    await expect(loginPage.loginButton).toBeDisabled();
  });
});

test('Попытка отправить форму с некорректными данными', async ({ page }) => {
  await test.step('Перейти на страницу авторизации', async () => {
    await loginPage.open();
  });

  await test.step('Ввести некорректный логин и пароль', async () => {
    await loginPage.loginInput.fill('incorrect_login');
    await loginPage.passwordInput.fill('incorrect_password');
  });

  await test.step('Проверить, что кнопка "Войти" активна', async () => {
    await expect(loginPage.loginButton).toBeEnabled();
  });

  await test.step('Нажать на кнопку "Войти"', async () => {
    await loginPage.clickLoginButton();
  });

  await test.step('Проверит, что отображается сообщение об ошибке, а поля подсвечиваются красным', async () => {
    await expect(page.getByText('Неверный логин и/или пароль')).toBeVisible();
    await expect(loginPage.loginInput).toHaveClass(/Error/);
    await expect(loginPage.passwordInput).toHaveClass(/Error/);
  });
});

test('Отправка формы с корректными данными', async ({ page }) => {
  await test.step('Перейти на страницу авторизации', async () => {
    await loginPage.open();
  });

  await test.step('Ввести некорректный логин и пароль', async () => {
    await loginPage.loginInput.fill('incorrect_login');
    await loginPage.passwordInput.fill('incorrect_password');
  });

  await test.step('Проверить, что кнопка "Войти" активна', async () => {
    await expect(loginPage.loginButton).toBeEnabled();
  });

  await test.step('Нажать на кнопку "Войти"', async () => {
    await loginPage.clickLoginButton();
  });

  await test.step('Проверит, что отображается сообщение об ошибке, а поля подсвечиваются красным', async () => {
    await expect(page.getByText('Неверный логин и/или пароль')).toBeVisible();
    await expect(loginPage.loginInput).toHaveClass(/Error/);
    await expect(loginPage.passwordInput).toHaveClass(/Error/);
  });
});
