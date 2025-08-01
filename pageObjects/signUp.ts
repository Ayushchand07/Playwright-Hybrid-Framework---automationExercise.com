import { Page, Locator, expect } from '@playwright/test';
import testData from '../fixtures/testData.json'
import * as dotenv from 'dotenv';

dotenv.config();

export class SignUp {
  readonly page: Page;
  readonly signUpLoginOption: Locator;
  readonly siteLogo: Locator;
  readonly loginText: Locator;
  readonly signUpText: Locator;
  readonly signUpName: Locator;
  readonly signUpEmail: Locator;
  readonly signUpButton: Locator;
  readonly titleMrRadioButton: Locator;
  readonly preFilledNameField: Locator;
  readonly preFilledEmailField: Locator;
  readonly passwordField :Locator;
  readonly dateOfBirthDate: Locator
  readonly dateOfBirthMonth: Locator
  readonly dateOfBirthYear: Locator
  readonly newsLetterCheckBox: Locator
  readonly specialOffersCheckBox: Locator
  readonly addressInformationHeading: Locator
  readonly accountInformationHeading: Locator
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly companyField: Locator
  readonly addressField: Locator
  readonly address2Field: Locator
  readonly countryDropdown: Locator
  readonly stateField: Locator
  readonly cityField: Locator
  readonly zipCodeField: Locator
  readonly mobileNumberField: Locator
  readonly createAccountButton: Locator

  //account created
  readonly accoundCreatedHeading: Locator
  readonly congratulationMessage: Locator
  readonly continueButton: Locator
  readonly userTab: Locator

  readonly deleteAccountButton: Locator
  readonly deleteAccountHeading: Locator
  readonly






  constructor(page: Page) {
    this.page = page;
    this.signUpLoginOption = page.locator(".fa-lock");
    this.siteLogo = page.locator(".logo.pull-left");
    this.loginText = page.getByText("Login to your account");
    this.signUpText = page.getByText("New User Signup!");
    this.signUpName = page.locator("[data-qa=signup-name]");
    this.signUpEmail = page.locator("[data-qa=signup-email]");
    this.signUpButton = page.locator("[data-qa=signup-button]");
    this.accountInformationHeading = page.getByText("Enter Account Information");
    this.addressInformationHeading = page.getByText("Address Information");
    this.firstNameField = page.locator("[data-qa=first_name]");
    this.lastNameField = page.locator("[data-qa=last_name]")
    this.titleMrRadioButton = page.locator("#uniform-id_gender1");
this.preFilledNameField = page.locator("[data-qa=name]");
this.preFilledEmailField = page.locator("[data-qa=email]");
this.passwordField = page.locator("[data-qa=password]");
this.dateOfBirthDate = page.locator("[data-qa=days]");
this.dateOfBirthMonth = page.locator("[data-qa=months]");
this.dateOfBirthYear = page.locator("[data-qa=years]");
this.newsLetterCheckBox = page.locator("#newsletter");
this.specialOffersCheckBox = page.locator("#newsletter");
   
    this.companyField = page.locator("[data-qa=company]")
    this.addressField = page.locator("[data-qa=address]")
    this.address2Field = page.locator("[data-qa=address2]")
    this.countryDropdown = page.locator("[data-qa=country]")
    this.stateField = page.locator("[data-qa=state]")
    this.cityField = page.locator("[data-qa=city]")
    this.zipCodeField = page.locator("[data-qa=zipcode]")
    this.mobileNumberField = page.locator("[data-qa=mobile_number]")
    this.createAccountButton = page.locator("[data-qa=create-account]")

    //Account created
    this.accoundCreatedHeading = page.locator("[data-qa=account-created]")
    this.congratulationMessage = page.getByText("Congratulations! Your new account has been successfully created!")
    this.continueButton = page.locator("[data-qa=continue-button]")

    this.userTab = page.locator(".fa-user")

    this.deleteAccountButton = page.locator(".fa-trash-o")
   
  }

  async navigateToUrl() {
    const url = process.env.SITE_URL;
    if (!url){
        throw new Error("SITE_URL is not defined in .env");
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
  }

  async signUp() {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;

    if (!name || !email) throw new Error("ADMIN_NAME or ADMIN_EMAIL not set in .env");

    await this.signUpLoginOption.click();
    await expect(this.siteLogo).toBeVisible();
    await expect(this.loginText).toBeVisible();
    await expect(this.signUpText).toBeVisible();

    await this.signUpName.fill(name);
    await this.signUpEmail.fill(email);
    await this.signUpButton.click();

   
    await expect(this.accountInformationHeading).toBeVisible()
    await expect (this.addressInformationHeading).toBeVisible()
    await this.titleMrRadioButton.check();
    await expect(this.preFilledNameField).toHaveText(testData.name);
    await expect(this.preFilledEmailField).toHaveText(testData.email);
    await this.passwordField.fill(testData.password);
    await this.dateOfBirthDate.selectOption(testData.date)
    await this.dateOfBirthMonth.selectOption(testData.month)
    await this.dateOfBirthYear.selectOption(testData.year)
    await this.newsLetterCheckBox.check()
    await this.specialOffersCheckBox.check()

    //Address Information

    await this.firstNameField.fill(testData.firstName);
    await this.lastNameField.fill(testData.lastName);
    await this.companyField.fill(testData.companyName);
    await this.addressField.fill(testData.address);
    await this.address2Field.fill(testData.address2);
    await this.countryDropdown.selectOption(testData.country);
    await this.stateField.fill(testData.state);
    await this.cityField.fill(testData.city);
    await this.zipCodeField.fill(testData.zipCode);
    await this.mobileNumberField.fill(testData.mobileNumber);
    await this.createAccountButton.click();
    await expect(this.accoundCreatedHeading).toContainText("Account Created!")
    await expect(this.congratulationMessage).toBeVisible();
    await this.continueButton.click();
    await expect(this.userTab).toContainText(" Logged in as" + `${testData.firstname}`)
  }

  async deleteUser(){
    await this.deleteAccountButton.click()
    await expect(this.deleteAccountHeading).toHaveText("Account Deleted!")
    await expect(this.)
  }
}