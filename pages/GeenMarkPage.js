export class GeenMarkPage {
  constructor(page) {
    this.page = page;
    this.menuItems = page.locator('a.menuLink-color');
    this.productsMenuItem = this.menuItems.filter({ hasText: 'PRODUCTS' });
    this.searchField = page.locator('#srchtxtsticky');
    this.searchButton = page.locator('button.search-button');
    this.cartControl = page.locator('#vcrtid');
    this.cartItemCount = page.locator('#totalitems .cart-count-val');
    this.firstProductLink = page.locator('a[href*="/pid-"]');
    this.sortByTrigger = page.locator('.dropdown-div .yIE7_value-holder');
    this.sortOptions = page.locator('.dropdown-div li');
    this.productHeading = page.locator('h1');
    this.addToCartButton = page.locator('button.add-to-cart-btn');
    this.cartContents = page.locator('body');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchFor(searchTerm) {
    await this.searchField.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForURL(/\/search/);
    await this.firstProductLink.first().waitFor({ state: 'visible' });
  }

  async openCart() {
    await this.cartControl.click();
    await this.page.waitForURL(/\/cart/);
  }

  async openSortOptions() {
    await this.sortByTrigger.click();
  }

  async openFirstProduct() {
    await this.firstProductLink.first().click();
    await this.page.waitForURL(/\/pid-/);
  }

  async addProductToCart() {
    await this.addToCartButton.evaluate((button) => {
      button.scrollIntoView({ block: 'center' });
    });
    await this.addToCartButton.click();
  }
}
