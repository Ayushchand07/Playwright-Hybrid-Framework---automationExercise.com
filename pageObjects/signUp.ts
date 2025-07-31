import { Page, Locator, expect } from '@playwright/test';
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
  readonly titleRadioButton: Locator;
  readonly preFilledNameField: Locator;
  readonly preFilledEmailField: Locator;
  readonly passwordField :Locator;
  readonly dateOfBirthDate: Locator
  readonly dateOfBirthMonth: Locator
  readonly dateOfBirthYear: Locator
  readonly newsLetterCheckBox: Locator
  readonly specialOffersCheckBox: Locator



  constructor(page: Page) {
    this.page = page; 
    this.signUpLoginOption = page.locator(".fa-lock");
    this.siteLogo = page.locator(".logo.pull-left");
    this.loginText = page.getByText("Login to your account");
    this.signUpText = page.getByText("New User Signup!");
    this.signUpName = page.locator("[data-qa=signup-name]");
    this.signUpEmail = page.locator("[data-qa=signup-email]");
    this.signUpButton = page.locator("[data-qa=signup-button]");
    this.titleRadioButton = page.locator("#uniform-id_gender1");
this.preFilledNameField = page.locator("[data-qa=name]");
this.preFilledEmailField = page.locator("[data-qa=email]");
this.passwordField = page.locator("[data-qa=password]");
this.dateOfBirthDate = page.locator("[data-qa=days]");
this.dateOfBirthMonth = page.locator("[data-qa=months]");
this.dateOfBirthYear = page.locator("[data-qa=years]");
this.newsLetterCheckBox = page.locator("#newsletter");
this.specialOffersCheckBox = page.locator("#newsletter");
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
  }
}
