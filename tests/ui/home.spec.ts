import {test} from 'playwright/test'
import { HomePage } from '../../pageObjects/homePage'
import { LoginPage } from '../../utils/login'

test.beforeEach('login',async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl();
})

test('TC-10: Verify Subscription in home page', async({page}) => {
    const homePage = new HomePage(page)
    homePage.verifySubscription();
})