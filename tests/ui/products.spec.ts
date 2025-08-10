import{test} from '@playwright/test'
import { Productpage } from '../../pageObjects/product';
import { LoginPage } from '../../utils/login';

test('TC-08: Verify All Products and product detail page', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl()
    
    const productPage = new Productpage(page);
    await productPage.productsPageValidation();
})