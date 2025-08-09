import{ expect, Locator, Page} from '@playwright/test'
import testData from '../fixtures/testData.json'
import * as dotenv from 'dotenv'
import { LoginPage } from '../utils/login'

dotenv.config()

export class ContactUsPage extends LoginPage{

    readonly contactUsOption: Locator
    readonly getInTouchHeading: Locator
    readonly feedbackForUsHeading: Locator
    readonly nameField: Locator
    readonly emailField: Locator
    readonly subjectField: Locator
    readonly messageField: Locator
    readonly chooseFileButton: Locator
    readonly submitButton: Locator
    readonly submissionSuccessMessage: Locator
    readonly homeButton: Locator
    readonly testCasesButton: Locator

  constructor(page: Page) {
    super(page)
    this.contactUsOption = page.getByRole('link', {name: 'Contact us'})
    this.getInTouchHeading = page.getByText('Get In Touch')
    this.feedbackForUsHeading = page.getByText('Feedback For Us')
    this.nameField = page.locator('[data-qa="name"]')
    this.emailField = page.locator('[data-qa="email"]')
    this.subjectField = page.locator('[data-qa="subject"]')
    this.messageField = page.locator('[data-qa="message"]')
    this.chooseFileButton = page.locator('input[type="file"]')
    this.submitButton = page.locator('[data-qa="submit-button"]')
    this.submissionSuccessMessage = page.locator('.alert-success')
    this.homeButton = page.locator('#form-section').getByRole('link', { name: 'Home' })

    this.testCasesButton = page.getByRole('button', {name: 'Test Cases' })
}

async handleConfirmation(accept = true) {
  this.page.once('dialog', async dialog => {
    if (accept) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

async contactUsForm(){
    await this.contactUsOption.click()
    await expect(this.getInTouchHeading).toBeVisible()
    await expect(this.feedbackForUsHeading).toBeVisible()
    await this.nameField.fill(testData.firstName)
    await this.emailField.fill(testData.email)
    await this.subjectField.fill(testData.contactFormSubject)
    await this.messageField.fill(testData.contactFormMessage)
    await this.chooseFileButton.setInputFiles('documents/document123.pdf');
    //Uploaded file name is not visible on UI. Make some assertion here  
    await this.handleConfirmation(true);
    await this.submitButton.click()
    //await expect(this.submissionSuccessMessage).toBeVisible()
    await this.homeButton.click()
    await expect(this.testCasesButton).toBeVisible()
}
}