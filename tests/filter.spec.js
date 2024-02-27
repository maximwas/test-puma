import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { navigateTo } from '../utils';

test.describe('Cart', () => {
  test('adding three products to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await navigateTo(page, '/sportivnye-tovary-dlja-muzhchin.html');
    await productPage.selectOption('article_type', 'Анорак');
  });
});