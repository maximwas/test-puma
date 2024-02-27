import { navigateTo } from '../utils'

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async addItemInCart(index) {
    const products = await this.page.$$('#catalog .grid .grid__item');

    if (!products.length) {
      return;
    }

    const productItem = await products[index]?.$('.product-item__img-w');

    if (!productItem) {
      return;
    }

    await productItem.click();
    await this.page.waitForLoadState('load');
    await this.page.click('#product-addtocart-button');
    await this.page.click('.dropdown-box__item');

    await this.page.waitForResponse(/https:\/\/ua\.puma\.com\/uk\/checkout\/cart\/add\/product\//);
    await this.page.goBack();
    await this.page.waitForLoadState('load');
  }

  async removeItemInCart(index) {
    const url = await this.page.url();

    if (!url.includes('/uk/checkout/cart/')) {
      await navigateTo(this.page, '/uk/checkout/cart/');
    }

    const products = await this.page.$$('#cartItems a[title="Видалити товар"]');

    if (!products.length) {
      return;
    }

    const totals = await this.page.textContent('.totals.sub .price');

    if (index || index === 0) {
      await products[index].click();
      await this.#checkTotals(totals);

      return;
    }

    for (const product in products) {
      const productCurrent = await this.page.$('#cartItems a[title="Видалити товар"]');
      await productCurrent.click({ force: true });

      if (product == products.length - 1) {
        return;
      }

      await this.#checkTotals(totals);
    }
  }

  async getCountInCart() {
    const cartCount = await this.page.$('.cart-page__header-content .cart-page__title #cartItemsQty');
    const textCartCount = await cartCount.textContent();

    return textCartCount;
  }

  async #checkTotals(totals) {
    await this.page.waitForFunction((totals) => {
      const element = document.querySelector('.totals.sub .price');
      const textContent = element.textContent;

      return totals !== textContent;
    }, totals, {});
  }
}