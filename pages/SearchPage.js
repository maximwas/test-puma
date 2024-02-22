export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async searchByKeyword(keyword) {
    await this.page.fill('.puma-search-bar__header .searchInput', keyword);
    await this.page.press('.puma-search-bar__header .searchInput', 'Enter');
    await this.page.waitForLoadState('load');

    const noResult = await this.page.isVisible('.search-no-result')

    if (noResult) {
      return 0;
    }

    const count = await this.page.innerText('#searchTitle .search-results-head__count');

    return parseInt(count);
  }
}