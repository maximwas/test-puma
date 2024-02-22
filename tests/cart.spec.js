import { test, expect } from '../fixtures/login';
import { CartPage } from '../pages/CartPage'
import { navigateTo } from '../utils'

test.describe('Cart', () => {
  test('adding three products to the cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await navigateTo(page, '/uk/sportivnye-tovary-dlja-muzhchin.html');
    await cartPage.addItemInCart(0);
    await cartPage.addItemInCart(1);
    await cartPage.addItemInCart(2);
    await navigateTo(page, '/uk/checkout/cart/');

    expect(await cartPage.getCountInCart()).toBe('3');
  });

  test('adding two products and removing one', async ({ page }) => {
    const cartPage = new CartPage(page);

    await navigateTo(page, '/uk/sportivnye-tovary-dlja-zhenshhin.html');
    await cartPage.addItemInCart(0);
    await cartPage.addItemInCart(1);
    await navigateTo(page, '/uk/checkout/cart/');
    await cartPage.removeItemInCart(0);

    expect(await cartPage.getCountInCart()).toBe('1');
  })
});

test.afterEach(async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.removeItemInCart();
});