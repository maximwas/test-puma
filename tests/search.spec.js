import { test, expect } from '../fixtures/login';
import { SearchPage } from '../pages/SearchPage';

test.describe('Search', () => {
  test('search the site by keyword "Кросівки"', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const count = await searchPage.searchByKeyword('Кросівки');

    expect(count).toBeGreaterThan(0);
  });

  test('search the site by keyword "Куртка"', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const count = await searchPage.searchByKeyword('Куртка');

    expect(count).toBeGreaterThan(0);
  });

  test('search the site by keyword "Телефони"', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const count = await searchPage.searchByKeyword('Телефони');

    expect(count).toEqual(0);
  });

  test('search the site by keyword "Машина"', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const count = await searchPage.searchByKeyword('Машина');

    expect(count).toEqual(0);
  });
});