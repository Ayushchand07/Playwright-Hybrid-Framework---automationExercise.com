import { Locator, Page, expect, } from "playwright/test"
import testData from "../fixtures/testData.json"


export class HomePage{

    readonly page: Page
    readonly subscriptionHeading: Locator
    readonly subscriptionEmailField: Locator
    readonly subscribeButton: Locator
    readonly subcriptionSuccessToaster: Locator

    constructor(page: Page){
        this.page = page;
        this.subscriptionHeading = page.getByText('Subscription');
        this.subscribeButton = page.locator('#subscribe')
        this.subscriptionEmailField = page.locator('#susbscribe_email')
        this.subcriptionSuccessToaster = page.getByText("You have been successfully subscribed!")
    }

    async verifySubscription(){
        await this.subscriptionHeading.scrollIntoViewIfNeeded()
        await expect(this.subscriptionHeading).toBeVisible()
        await this.subscriptionEmailField.fill(testData.email)
        await this.subscribeButton.click()
        await expect(this.subcriptionSuccessToaster).toBeVisible()
    }
}