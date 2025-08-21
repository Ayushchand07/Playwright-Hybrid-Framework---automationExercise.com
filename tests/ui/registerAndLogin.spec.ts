import{test} from '@playwright/test'
import { SignUp } from '../../pageObjects/UIpageObjects/signUp'
import { LoginPage } from '../../utils/login';
import { ContactUsPage } from '../../pageObjects/UIpageObjects/contactUs';

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
});

test('TC-05: Register using existing Email', async({page})=>{
    const signUppage = new SignUp(page);
    await signUppage.navigateToUrl();
    await signUppage.signUpusingExistingMail();
})

test('TC-06: Contact Us Form', async({page})=>{
    const contactPage = new ContactUsPage(page);
    await contactPage.navigateToUrl();
    await contactPage.contactUsForm();
})
