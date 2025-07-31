import{test, expect, Page, Locator} from '@playwright/test'
import { SignUp } from '../../pageObjects/signUp'

test('SignUp', async({page})=>{
    const signUpPage = new SignUp(page);
    await signUpPage.navigateToUrl();
    await signUpPage.signUp();
});

