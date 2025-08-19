import { Locator, Page, expect, } from "playwright/test"
import testData from "../fixtures/testData.json"
import { LoginPage } from "../utils/login"


export class HomePage extends LoginPage{

    readonly subscriptionHeading: Locator
    readonly subscriptionEmailField: Locator
    readonly subscribeButton: Locator
    readonly subcriptionSuccessToaster: Locator
    
    readonly cartOption: Locator
    readonly shoppingCartText: Locator
    readonly productsOption: Locator

    readonly footerBottom: Locator
    readonly scrollUpArrow: Locator

    constructor(page: Page){
        super(page);
        this.subscriptionHeading = page.getByText('Subscription');
        this.subscribeButton = page.locator('#subscribe')
        this.subscriptionEmailField = page.locator('#susbscribe_email')
        this.subcriptionSuccessToaster = page.getByText("You have been successfully subscribed!")
        this.cartOption = page.getByRole('link', {name: ' Cart'})
        this.shoppingCartText = page.getByText("Shopping Cart")
        this.productsOption = page.getByRole('link', {name: 'Products'})
        this.footerBottom = page.locator('.footer-bottom')
        this.scrollUpArrow = page.locator('#scrollUp')
    }

    async navigateToCart(){
        await this.cartOption.click()
        await expect(this.shoppingCartText).toBeVisible({timeout:5000})
    }

     async navigateToProductPage(){
        await this.productsOption.click()
    }
    async verifySubscription(){
        await this.subscriptionHeading.scrollIntoViewIfNeeded()
        await expect(this.subscriptionHeading).toBeVisible()
        await this.subscriptionEmailField.fill(testData.email)
        await this.subscribeButton.click()
        await expect(this.subcriptionSuccessToaster).toBeVisible()
    }

    async scrollDownToFooter(){
        await this.footerBottom.scrollIntoViewIfNeeded()
        await expect(this.footerBottom).toBeVisible()
    }

    async scrollUpUsingArrow(){
        await this.scrollUpArrow.click()
        await expect(this.siteLogo).toBeVisible()
    }

    async scrollUpWithoutArrow(){
        await this.siteLogo.scrollIntoViewIfNeeded()
        await expect(this.siteLogo).toBeVisible()
    }
}