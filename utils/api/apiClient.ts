import { APIRequestContext, request, expect } from '@playwright/test';
import { endpoints } from '../../fixtures/endPoints';
import expectedResponseBody from '../../testData/apiTestData/getAllProducts.json';
import * as dotenv from 'dotenv';

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
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
  }

  async getAllProducts() {
    const response = await this.apiContext.get(endpoints.GET_PRODUCTS);

    // 1. Validate status code
    expect(response.status()).toBe(200);

    // 2. Parse JSON response and validate the expected data
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);

    // 3. Schema validation

    // 4. Performance validation



    return responseBody;
  }

  async close() {
    await this.apiContext.dispose();
  }
}
