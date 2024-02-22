import { test, expect } from '../fixtures/login';

test.describe('Cart', () => {
  test('adding three products to the cart', async ({ page }) => {
    await navigateTo(page, '/uk/sportivnye-tovary-dlja-muzhchin.html');
    await addItemInCart(page, 0);
    await addItemInCart(page, 1);
    await addItemInCart(page, 2);
    await navigateTo(page, '/uk/checkout/cart/');

    expect(await getCountInCart(page)).toBe('3');
  });

  test('adding two products and removing one', async ({ page }) => {
    await navigateTo(page, '/uk/sportivnye-tovary-dlja-zhenshhin.html');
    await addItemInCart(page, 0);
    await addItemInCart(page, 1);
    await navigateTo(page, '/uk/checkout/cart/');
    await removeItemInCart(page, 0);

    expect(await getCountInCart(page)).toBe('1');
  })
});

test.afterEach(async ({ page }) => {
  await removeItemInCart(page);
});

const navigateTo = async (page, path) => {
  await page.goto(path);
  await page.waitForLoadState('load');
}

const addItemInCart = async (page, index) => {
  const products = await page.$$('#catalog .grid .grid__item');
  const productItem = await products[index].$('.product-item__img-w');

  await productItem.click();
  await page.waitForLoadState('load');
  await page.click('#product-addtocart-button');
  await page.click('.dropdown-box__item');

  await page.waitForResponse(/https:\/\/ua\.puma\.com\/uk\/checkout\/cart\/add\/product\//);
  await page.goBack();
  await page.waitForLoadState('load');
}

const removeItemInCart = async (page, index) => {
  const url = await page.url();

  if (!url.includes('/uk/checkout/cart/')) {
    await navigateTo(page, '/uk/checkout/cart/');
  }

  const products = await page.$$('#cartItems a[title="Видалити товар"]');

  if (!products.length) {
    return;
  }

  const totals = await page.textContent('.totals.sub .price');

  if (index || index === 0) {
    await products[index].click();
    await checkTotals(page, totals);

    return;
  }

  for (const product in products) {
    const productCurrent = await page.$('#cartItems a[title="Видалити товар"]');
    await productCurrent.click({ force: true });

    if (product == products.length - 1) {
      return;
    }

    await checkTotals(page, totals);
  }
}

const checkTotals = async (page, totals) => {
  await page.waitForFunction((totals) => {
    const element = document.querySelector('.totals.sub .price');
    const textContent = element.textContent;

    return totals !== textContent;
  }, totals, {});
}

const getCountInCart = async (page) => {
  const cartCount = await page.$('.cart-page__header-content .cart-page__title #cartItemsQty');
  const textCartCount = await cartCount.textContent();

  return textCartCount;
}