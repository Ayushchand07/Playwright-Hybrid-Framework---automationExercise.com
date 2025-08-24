import {test} from 'playwright/test'
import { HomePage } from '../../pageObjects/UIpageObjects/homePage'
import { LoginPage } from '../../utils/login'
import { Productpage } from '../../pageObjects/UIpageObjects/product'
import { CartPage } from '../../pageObjects/UIpageObjects/cart'
import testData from '../../testData/uiTestData/testData.json'

test.beforeEach('login',async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl();
})

test('TC-10: Verify Subscription in home page', async({page}) => {
    const homePage = new HomePage(page)
    await homePage.verifySubscription();
})

test('TC-11: Verify Subscription in Cart page', async({page}) => {
    const homePage = new HomePage(page)
    await homePage.navigateToCart()
    await homePage.verifySubscription();
})


test('TC-14: Place Order: Register while Checkout', async({page})=>{
    test.setTimeout(360000)
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addMultipleQty(testData.productQtyList)

    const cartPage = new CartPage(page);
    await cartPage.placeOrder()
})


test('TC-17: Remove Products From Cart', async({page})=>{
    test.setTimeout(360000)
    const productPage = new Productpage(page);
    await productPage.navigateToProductPage()
    await productPage.addMultipleQty(testData.productQtyList)
    await productPage.removeProductsFromCart(testData.productQtyList)
})

test('TC-25: Verify Scroll Up using "Arrow"button and Scroll Down functionality', async({page})=>{
    const homePage = new HomePage(page)
    await homePage.scrollDownToFooter()
    await homePage.scrollUpUsingArrow()
})

test('TC-26: Verify Scroll Up without "Arrow" button and Scroll Down functionality',async({page})=>{{
    const homePage = new HomePage(page)
    await homePage.scrollDownToFooter()
    await homePage.scrollUpWithoutArrow()
}
})

