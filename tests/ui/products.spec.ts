import{test} from '@playwright/test'
import { Productpage } from '../../pageObjects/product';
import { LoginPage } from '../../utils/login';
import testData from '../../fixtures/testData.json'

test.beforeEach("login", async({page})=>{
     const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl()
})

test('TC-08: Verify All Products and product detail page', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.productsPageValidation();
})

test('TC-09: Search Product', async({page})=>{
    const productPage = new Productpage(page);
    await productPage.searchProduct(testData.productName);
})

