import { Page, Locator, expect } from '@playwright/test';
import testData from '../fixtures/testData.json'
import * as dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly signUpLoginOption: Locator;
  readonly siteLogo: Locator;
  readonly loginText: Locator;
  readonly signUpText: Locator;
  readonly loginEmailIdField : Locator
  readonly loginPasswordField: Locator
  readonly loginButton: Locator
  
  readonly loggedInWithUserIcon: Locator
  readonly invalidCredsErrorMessage: Locator

  readonly deleteAccountButton: Locator
  readonly deleteAccountHeading: Locator
  readonly deleteContinueButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.signUpLoginOption = page.locator(".fa-lock");
    this.siteLogo = page.locator(".logo.pull-left");
    this.loginText = page.getByText("Login to your account");
    this.signUpText = page.getByText("New User Signup!");

    this.loginEmailIdField = page.locator("[data-qa=login-email]")
    this.loginPasswordField = page.locator("[data-qa=login-password]")
    this.loginButton = page.locator("[data-qa=login-button]")

    this.deleteAccountHeading = page.locator("[data-qa=account-deleted]")
    this.deleteAccountButton = page.locator(".fa-trash-o")
    this.deleteContinueButton = page.locator("[data-qa=continue-button]")
    this.invalidCredsErrorMessage = page.getByText("Your email or password is incorrect!")
    this.logoutButton = page.getByRole('link', {name:" Logout"});
   
  }

  async navigateToUrl() {
    const url = process.env.SITE_URL;
    if (!url){
        throw new Error("SITE_URL is not defined in .env");
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  async login() {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.PASSWORD;

    if (!name || !email) throw new Error("ADMIN_NAME or ADMIN_EMAIL not set in .env");
    if(!password) throw new Error("Password not set in .env file");

    await this.signUpLoginOption.click();
    await expect(this.siteLogo).toBeVisible();
    await expect(this.loginText).toBeVisible();
    await expect(this.signUpText).toBeVisible();
    await this.loginEmailIdField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.click();
    const loggedInWithUserIcon = this.page.locator('a', { hasText: new RegExp(`Logged in as\\s+${name}`, 'i') })
    await expect(loggedInWithUserIcon).toBeVisible();
  }

  async loginWithIncorrectCredentials(){
    await this.signUpLoginOption.click();
    await expect(this.siteLogo).toBeVisible();
    await expect(this.loginText).toBeVisible();
    await expect(this.signUpText).toBeVisible();
    await this.loginEmailIdField.fill(testData.wrongEmail);
    await this.loginPasswordField.fill(testData.wrongPassword);
    await this.loginButton.click();
    await expect(this.invalidCredsErrorMessage).toBeVisible()
  }

  async deleteUser(){
    await this.deleteAccountButton.click()
    await expect(this.deleteAccountHeading).toContainText("Account Deleted!")
    await this.deleteContinueButton.click();
  }

  async logout(){
    await this.logoutButton.click();
    await expect(this.siteLogo).toBeVisible();
    await expect(this.loginText).toBeVisible();
    await expect(this.signUpText).toBeVisible();
  }
}