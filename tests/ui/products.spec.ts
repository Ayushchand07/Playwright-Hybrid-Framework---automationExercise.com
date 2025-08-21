import{test} from '@playwright/test'
import { Productpage } from '../../pageObjects/UIpageObjects/product';
import { LoginPage } from '../../utils/login';
import testData from '../../fixtures/testData.json'
import { CartPage } from '../../pageObjects/UIpageObjects/cart';

test.beforeEach("login", async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl()
    await loginPage.login()
})

test('TC-08: Verify All Products and product detail page', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.productsPageValidation();
})

test('TC-09: Search Product', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.searchProduct(testData.productName);
})

test('TC-12: Add Products in Cart', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addProductToCart(testData.productList)
})

test('TC-13: Verify Product quantity in Cart', async({page})=>{
    test.setTimeout(50000)
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addMultipleQty(testData.productQtyList)
})

test('TC-15: Place Order: Register before Checkout', async({page})=>{
    test.setTimeout(360000)
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addMultipleQty(testData.productQtyList)

    const cartPage = new CartPage(page);
    await cartPage.placeOrder()
})

test('TC-16: Place Order: Login before Checkout', async({page})=>{
    test.setTimeout(360000)
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addMultipleQty(testData.productQtyList)

    const cartPage = new CartPage(page);
    await cartPage.placeOrder()
})

test('TC-21: Add review on product', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.writeReviewOnProduct(testData.productName,testData.firstName, testData.email, testData.reviewMessage )
})

test('TC-18: View Category Products', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.navigateToCategory(testData.categoryName, testData.productcategory )
})

