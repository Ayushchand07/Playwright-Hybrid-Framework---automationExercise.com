import { APIRequestContext, request, expect } from '@playwright/test';
import { endpoints } from '../../fixtures/endPoints';
import * as dotenv from 'dotenv';
import Ajv from "ajv";

dotenv.config();

export class APIClient {
  private apiContext!: APIRequestContext; // non-null assertion

  constructor() {}

  // Initialize the API context before making requests
  async init() {
    this.apiContext = await request.newContext({
      baseURL: endpoints.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
  }

  async getAllProducts() {
    return await this.apiContext.get(endpoints.GET_PRODUCTS);

  }

  async validateStatusCode(response, expectedStatusCode){
    expect(response.status()).toBe(expectedStatusCode);
  }

  async validateResponseBody(response, expectedResponseBody){
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);
  }

  async validateSchema(response, expectedSchema){
    const responseBody = await response.json();
    const ajv = new Ajv();
    const validate = ajv.compile(expectedSchema);
    const isValid = validate(responseBody)

    await expect(isValid).toBeTruthy()
  }

  async validatePerformance(){

  }

  async postAllProducts(){
    return await this.apiContext.post(endpoints.GET_PRODUCTS);
  }

  async validateResponseCode(response, responseCode){
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(responseCode)
  }

  async close() {
    await this.apiContext.dispose();
  }
}
