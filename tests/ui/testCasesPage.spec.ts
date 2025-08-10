import{test} from '@playwright/test'
import { SignUp } from '../../pageObjects/signUp'
import { LoginPage } from '../../utils/login';
import { ContactUsPage } from '../../pageObjects/contactUs';
import { TestcasesPage } from '../../pageObjects/testCases';

test('TC-07: Testcases page', async({page})=>{
    const testcases = new TestcasesPage(page);
    await testcases.navigateToUrl();
    await testcases.validateTestcasesPage();
})