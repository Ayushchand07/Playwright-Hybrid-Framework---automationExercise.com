import {expect, Locator, Page} from 'playwright/test'

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

  async searchProduct(productToBeSearched: string){
   await this.productsOption.click()
   await this.searchBarProduct.fill(productToBeSearched);
   await this.searchButton.click()
   await expect(this.searchedProductHeading).toBeVisible()
   const productName = (await this.productName.textContent())?.trim() || '';
   await expect(productName).toBe(productToBeSearched)

  }
}