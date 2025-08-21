import{test} from '@playwright/test'
import { TestcasesPage } from '../../pageObjects/UIpageObjects/testCases';

test('TC-07: Testcases page', async({page})=>{
    const testcases = new TestcasesPage(page);
    await testcases.navigateToUrl();
    await testcases.validateTestcasesPage();
})
