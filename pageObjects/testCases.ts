import{Page, Locator, expect} from 'playwright/test'
import * as dotenv from 'dotenv'
import { LoginPage } from '../utils/login';

export class TestcasesPage extends LoginPage{

    readonly testCasesButton: Locator
    readonly testCasesHeading: Locator
    readonly testCasesMessage: Locator
    readonly testCasePanel: Locator

 constructor(page: Page){
    super(page)
    this.testCasesButton = page.getByRole('button',{name: 'Test Cases'})
    this.testCasesHeading = page.locator('#form .row').getByRole('heading', {name: 'Test Cases'})
    this.testCasesMessage = page.getByText('Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')
    this.testCasePanel = page.locator('.panel-default')
 }

 async validateTestcasesPage(){
    await this.testCasesButton.click();
    await expect(this.testCasesHeading).toBeVisible()
    await expect(this.testCasesMessage).toBeVisible()
    
    for(let i = 0; i<=25; i++){
        await expect(this.testCasePanel.nth(i)).toBeVisible() 
    }
 }
}