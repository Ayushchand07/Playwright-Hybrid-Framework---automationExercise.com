import { test, expect} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';
import expectedResponseBody from '../../testData/apiTestData/getAllProducts.json';
import getAllProductsSchema from '../../testData/apiTestData/getAllProductsSchema.json'

dotenv.config();

test('API 1: Get All Products List', async ({ request }) => {

    const client = new APIClient()

    await client.init()
    const response = await client.getAllProducts()

    await client.validateStatusCode(response,200)
    await client.validateSchema(response, getAllProductsSchema)
    await client.validateResponseBody(response,expectedResponseBody)

})

test ('API 2: POST To All Products List', async({request})=>{
    const client = new APIClient()

    await client.init()
    const response = await client.postAllProducts()
    await client.validateResponseCode(response,405)
})