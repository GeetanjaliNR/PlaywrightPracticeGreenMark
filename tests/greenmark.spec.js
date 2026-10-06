import { test, expect } from '@playwright/test';
import { GeenMarkPage } from '../pages/GeenMarkPage.js';

test.describe('Green Mark Natural storefront', () => {
  let greenMarkPage;

  test.beforeEach(async ({ page }) => {
    greenMarkPage = new GeenMarkPage(page);
    await greenMarkPage.goto();
  });

  test('should display the Green Mark Natural page title when the home page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/Green Mark Natural Solutions/i);
  });

  test('should display all menus when the home page loads', async () => {
    await expect(greenMarkPage.menuItems).toHaveCount(7);
    for (const menuItem of await greenMarkPage.menuItems.all()) {
      console.log(await menuItem.textContent());
      await expect(menuItem).toBeVisible();
    }
    await expect(greenMarkPage.productsMenuItem).toBeVisible();
  });

  test('should enable the search button when the home page loads', async () => {
    await expect(greenMarkPage.searchButton).toBeEnabled();
  });

  test('should open the cart when the cart control is clicked', async ({ page }) => {
    await expect(greenMarkPage.cartControl).toBeVisible();
    await greenMarkPage.openCart();
    await expect(page).toHaveURL(/\/cart/);
  });

  test('should display shampoo products when shampoo is searched', async () => {
    await greenMarkPage.searchFor('shampoo');
    await expect(greenMarkPage.firstProductLink).toHaveCount(4);
    await expect(greenMarkPage.firstProductLink.first()).toContainText(/shampoo/i);
  });

  test('should display four sorting options when Sort By is opened', async () => {
    await greenMarkPage.searchFor('shampoo');
    await greenMarkPage.openSortOptions();
    await expect(greenMarkPage.sortOptions).toHaveCount(4);
  });

  test('should open the first shampoo product when a result is selected', async () => {
    await greenMarkPage.searchFor('shampoo');
    await greenMarkPage.openFirstProduct();
    await expect(greenMarkPage.productHeading).toContainText(/shampoo/i);
  });

  test('should add the first shampoo product to the cart when Add to Cart is clicked', async () => {
    await greenMarkPage.searchFor('shampoo');
    await greenMarkPage.openFirstProduct();
    await expect(greenMarkPage.addToCartButton).toBeEnabled();
    await greenMarkPage.addProductToCart();
    await expect(greenMarkPage.cartItemCount).toHaveText(/^[1-9]\d*$/);
    await greenMarkPage.openCart();
    await expect(greenMarkPage.cartContents).toContainText('ALOEVERA SHAMPOO');
  });
});
