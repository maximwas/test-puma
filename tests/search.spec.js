import { test, expect } from '../fixtures/login';

test.describe('Search', () => {
  test('search the site by keyword "Кросівки"', async ({ page }) => {
    const count = await searchByKeyword(page, 'Кросівки');

    expect(count).toBeGreaterThan(0);
  });

  test('search the site by keyword "Куртка"', async ({ page }) => {
    const count = await searchByKeyword(page, 'Куртка');

    expect(count).toBeGreaterThan(0);
  });

  test('search the site by keyword "Телефони"', async ({ page }) => {
    const count = await searchByKeyword(page, 'Телефони');

    expect(count).toEqual(0);
  });

  test('search the site by keyword "Машина"', async ({ page }) => {
    const count = await searchByKeyword(page, 'Машина');

    expect(count).toEqual(0);
  });
});

const searchByKeyword = async (page, keyword) => {
  await page.fill('.puma-search-bar__header .searchInput', keyword);
  await page.press('.puma-search-bar__header .searchInput', 'Enter');
  await page.waitForLoadState('load');

  const noResult = await page.isVisible('.search-no-result')

  if (noResult) {
    return 0;
  }

  const count = await page.innerText('#searchTitle .search-results-head__count');

  return parseInt(count);
}