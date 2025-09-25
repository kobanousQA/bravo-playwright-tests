import test from '@playwright/test';
import { EventsPage } from '../pages/EventsPage';

test('Переход во вкладку События', async ({ page }) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.open();
});
