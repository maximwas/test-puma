import { waitForPreload } from "../utils";

export class ProductPage {
  constructor(page) {
    this.page = page;

  }

  async selectOption(label, category) {
    const options = await this.#getOptions(label);
    const isCloseOptions = await options.locator('.filter-block__content').isHidden();

    if (!category) {
      await options.click();

      return;
    }

    const item = await this.#getItem(category);

    if (!options || !item) {
      return;
    }

    if (isCloseOptions) {
      await options.click();
    }

    await item.click();
    await this.page.waitForLoadState('load');
  }

  async setMaxPrice(maxPrice) {
    const options = await this.#getOptions('price');
    const toPrice = await options.locator('[data-to]');

    await toPrice.focus();
    await toPrice.fill(maxPrice);
    await toPrice.blur();
    await this.page.waitForFunction(waitForPreload. null, {})
  }

  async setMinPrice(minPrice) {
    const options = await this.#getOptions('price');
    const fromPrice = await options.locator('[data-from]');

    await fromPrice.focus();
    await fromPrice.fill(minPrice);
    await fromPrice.blur();
    await this.page.waitForFunction(waitForPreload, null, {})
  }

  async clearOption(label) {
    const options = await this.#getOptions(label);
    const filterClear = await options.locator('a.filter__clear');

    await filterClear.click();
    await this.page.waitForLoadState('load');
  }

  async clearAllOptions() {
    const clearAll = await this.page.locator('.filter__clear.filter__clear-all');

    await clearAll.click();
    await this.page.waitForLoadState('load');
  }

  async setColor(colorIndex) {
    const options = await this.#getOptions('refinement_color');
    const color = await options.locator(`.filter-color__item`).nth(colorIndex);

    await color.click();
    await this.page.waitForLoadState('load');
  }

  async #getOptions(label) {
    const filter = await this.page.locator('#filter');
    const options = await filter.locator(`[data-filter-type="${label}"]`);

    return options;
  }

  async #getItem(category) {
    const filter = await this.page.locator('#filter');
    const item = await filter.getByText(category);

    return item;
  }
}