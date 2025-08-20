import { Locator, expect, Page } from "playwright/test";
import { LoginPage } from "../utils/login";
import testData from "../fixtures/testData.json"

export class CartPage extends LoginPage{
    readonly proceddToCheckoutButton: Locator
    readonly loginOption: Locator
    readonly continueOnCartButton: Locator
    readonly addressDetailsHeading: Locator
    readonly deliveryAddressCard: Locator
    readonly billingAddressCard: Locator
    readonly cartOption: Locator
    readonly placeOrderButton: Locator
    readonly paymentHeading: Locator
    readonly nameOnCardField: Locator
    readonly cardNumber: Locator
    readonly cvc : Locator
    readonly expiryMonth: Locator
    readonly expiryYear: Locator
    readonly payAndCofirmOrderButton: Locator
    readonly orderPlacedHeading: Locator
    readonly orderPlacedMessage: Locator
    readonly downloadInvoiceButton: Locator

constructor(page: Page){
    super(page)
    this.proceddToCheckoutButton = page.getByText('Proceed To Checkout' )
    this.loginOption = page.getByRole('link', {name: 'Register / Login'})
    this.continueOnCartButton = page.getByRole('button', {name: 'Continue On Cart'})
    this.addressDetailsHeading = page.getByRole('heading', {name : 'Address Details'})
    this.deliveryAddressCard = page.locator('#address_delivery')
    this.billingAddressCard = page.locator('#address_invoice')
    this.cartOption = page.getByRole('link', {name: 'Cart'})
    this.placeOrderButton = page.getByRole('link', {name: 'Place Order'})
    this.paymentHeading = page.getByRole('heading', {name: 'Payment'})
    this.nameOnCardField = page.locator('[data-qa="name-on-card"]')
    this.cardNumber = page.locator('[data-qa="card-number"]')
    this.cvc = page.locator('[data-qa="cvc"]')
    this.expiryMonth = page.locator('[data-qa="expiry-month"]')
    this.expiryYear = page.locator('[data-qa="expiry-year"]')
    this.payAndCofirmOrderButton = page.locator('[data-qa="pay-button"]')
    this.orderPlacedHeading = page.locator('[data-qa="order-placed"]')
    this.orderPlacedMessage = page.getByText("Congratulations! Your order has been confirmed!")
    this.downloadInvoiceButton = page.getByRole('button', {name: "Download Invoice"})

}

async placeOrder(){
    await this.proceddToCheckoutButton.click()
    
    const loggedIn = this.page.getByText(`logged in as ${testData.firstName}`)
    if(!await loggedIn.isVisible()){
        await this.loginOption.click()
        await this.login()
    }
    await this.cartOption.click()
    await this.proceddToCheckoutButton.click()
    await expect(this.addressDetailsHeading).toBeVisible()
    // await expect(this.deliveryAddressCard).toContainText(testData.firstName)
    // await expect(this.deliveryAddressCard).toContainText(testData.lastName)
    // await expect(this.deliveryAddressCard).toContainText(testData.email)
    // await expect(this.deliveryAddressCard).toContainText(testData.country)
    // await expect(this.deliveryAddressCard).toContainText(testData.address)
    // await expect(this.deliveryAddressCard).toContainText(testData.address2)
    // await expect(this.deliveryAddressCard).toContainText(testData.mobileNumber)
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.placeOrderButton.click();
    await expect(this.paymentHeading).toBeVisible()
    await this.nameOnCardField.fill(testData.nameOnCard)
    await this.cardNumber.fill(testData.cardNumber)
    await this.expiryMonth.fill(testData.expiryMonth)
    await this.cvc.fill(testData.cvc)
    await this.expiryYear.fill(testData.expiryYear)
    await this.payAndCofirmOrderButton.click()
    await expect(this.orderPlacedHeading).toBeVisible()
    await expect(this.orderPlacedMessage).toBeVisible()
    await this.downloadInvoiceButton.click()
        
}
}