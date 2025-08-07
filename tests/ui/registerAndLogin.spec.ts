import{test, expect, Page, Locator} from '@playwright/test'
import { SignUp } from '../../pageObjects/signUp'
import { LoginPage } from '../../utils/login';

test('TC-01: Register new user and Delete it', async({page})=>{
    const signUpPage = new SignUp(page);
    await signUpPage.navigateToUrl();
    await signUpPage.signUp();
    await signUpPage.deleteUser();
});

test('TC-02: Login with valid credentials ', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToUrl();
    await loginPage.login();
});

test('TC-03: Login with invalid credentials ', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToUrl();
    await loginPage.loginWithIncorrectCredentials();
});

test('TC-04: Logout', async({page})=>{
    const loginpage = new LoginPage(page);
    await loginpage.navigateToUrl();
    await loginpage.login();
    await loginpage.logout();

})