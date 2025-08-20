import {expect, Locator, Page} from 'playwright/test'

type Product = { name: string; productId: number };
type ProductQty = {name: string; productId: number; qty: string}

export class Productpage{

    readonly page: Page
    readonly productsOption: Locator
    readonly searchBarProduct: Locator
    readonly leftSideBar: Locator
    readonly allProductsHeading : Locator
    readonly searchButton: Locator
    readonly productTiles: Locator
    readonly productPrice: Locator
    readonly productName: Locator
    readonly viewProductButton: Locator

    readonly productDetailsPageName: Locator
    readonly productDetailsPagePrice: Locator
    readonly productDetailsPageAddToCartButton: Locator

    readonly searchedProductHeading: Locator

    readonly addToCartButton: Locator
    readonly continueShoppingButton: Locator
    readonly viewCartOption: Locator
    readonly cartOption: Locator
    readonly quantityField : Locator

    readonly nameField : Locator
    readonly emailField : Locator
    readonly reviewField : Locator
    readonly submitButton : Locator 
    readonly reviewSuccessMessage: Locator 


 constructor(page: Page){
    this.page = page
    this.productsOption = page.getByRole('link', {name: 'Products'})
    this.searchBarProduct = page.locator('#search_product')
    this.searchButton = page.locator('#submit_search')
    this.leftSideBar = page.locator('.left-sidebar')
    this.allProductsHeading = page.locator('.features_items').getByRole('heading', {name: 'All Products'})
    this.productTiles = page.locator('.single-products')
    this.productPrice = page.locator('.single-products .productinfo h2').first()
    this.productName = page.locator('.single-products .productinfo p').first()
    this.viewProductButton = page.locator('.choose').getByRole('link', {name: 'View Product'}).first()

    this.productDetailsPageName = page.locator('.product-information h2')
    this.productDetailsPagePrice = page.locator('.product-information span span')
    this.productDetailsPageAddToCartButton = page.getByRole('button', {name: 'Add to Cart'})
    this.searchedProductHeading = page.getByText("Searched Product") 

    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'})

    this.cartOption = page.getByRole('link', {name: 'Cart'})
    this.viewCartOption = page.getByRole('link', {name: 'View Cart'})
    this.quantityField = page.locator('#quantity')

    this.nameField = page.locator('#name')
    this.emailField = page.locator('#email')
    this.reviewField = page.locator('#review-form textarea')
    this.submitButton = page.locator('#button-review')
    this.reviewSuccessMessage = page.getByText('Thank you for your review.')

 }  
 
 async navigateToProductPage(){
   await this.productsOption.click()
 }

 async navigateToCart(){
   await this.cartOption.click()
 }

async addProductToCart(productlist: Product[]) {

   for (const product of productlist){
      await this.searchBarProduct.fill(product.name)
      await this.searchButton.click();
      await expect(this.searchedProductHeading).toBeVisible();
      const productName = (await this.productName.textContent())?.trim() || '';
      expect(productName).toBe(product.name);
      const addToCartButton = this.page.locator(`[data-product-id="${product.productId}"]`).first();

      await expect(addToCartButton).toBeVisible()
      await addToCartButton.click();
   }
   await this.cartOption.click()

   for(const product of productlist){
      const row = this.page.locator(`#product-${product.productId}`)
      await expect(row).toContainText(product.name)
   }
  }

async addMultipleQty(productQtyList: ProductQty[]){
   for (const product of productQtyList){
      await this.searchBarProduct.fill(product.name)
      await this.searchButton.click();
      await this.viewProductButton.click();
      await this.quantityField.fill(product.qty)
      await this.productDetailsPageAddToCartButton.click()
      await this.continueShoppingButton.click()
      await this.productsOption.click()      
   }
   await this.cartOption.click()

   for(const product of productQtyList){
      const quantityColumn = this.page.locator(`#product-${product.productId} .cart_quantity`)
      await expect(quantityColumn).toHaveText(product.qty)
   }

}  

async removeProductsFromCart(products: Product[]){
   for(const product of products){
      const rowCrossIcon = this.page.locator(`[data-product-id="${product.productId}"]`)
      await rowCrossIcon.click()

      const row = this.page.locator(`#product-${product.productId}`)
      await expect(row).not.toBeVisible();     
   }

}

 async productsPageValidation(){
    await this.productsOption.click()
    await expect(this.searchBarProduct).toBeVisible()
    await expect(this.searchButton).toBeVisible()
    await expect(this.leftSideBar).toBeVisible()
    await expect(this.allProductsHeading).toBeVisible()
    for (let i =0; i<=5; i++){
        await expect(this.productTiles.nth(i)).toBeVisible()
    }

    const productPrice = (await this.productPrice.textContent())?.trim() || '';
    const productName = (await this.productName.textContent())?.trim() || '';
    await this.viewProductButton.click()

    const productPageName = (await this.productDetailsPageName.textContent())?.trim() || '';
    const productPagePrice = (await this.productDetailsPagePrice.textContent())?.trim() || '';
    await expect(productPageName).toBe(productName)
    await expect(productPagePrice).toBe(productPrice)
    await expect(this.productDetailsPageAddToCartButton).toBeVisible()
  }  

  async writeReviewOnProduct(productName: string, customerName: string,customerEmail: string, reviewMessage: string ){
   await this.productsOption.click()
   await this.searchBarProduct.fill(productName);
   await this.searchButton.click()
   await this.viewProductButton.click()
   await this.nameField.fill(customerName);
   await this.emailField.fill(customerEmail);
   await this.reviewField.fill(reviewMessage);
   await this.submitButton.click()
   await expect(this.reviewSuccessMessage).toBeVisible()

  }

  async searchProduct(productToBeSearched: string){
   await this.productsOption.click()
   await this.searchBarProduct.fill(productToBeSearched);
   await this.searchButton.click()
   await expect(this.searchedProductHeading).toBeVisible()
  }

  async clickContinueShoppingButton(){
   await this.continueShoppingButton.click()
  }

  async clickOnViewCareButton(){
   await this.viewCartOption.click()
  }
}