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

  async getAllBrands(){
    return await this.apiContext.get(endpoints.GET_BRANDS);
  }

  async putAllBrands(){
    return await this.apiContext.put(endpoints.GET_BRANDS)
  }

  async postLogin(){
    return await this.apiContext.post(endpoints.LOGIN, /*params*/)
  }

  async postLoginInWithoutEmail(){
    return await this.apiContext.post(endpoints.LOGIN)
  }

  async deleteLogin(){
    return await this.apiContext.delete(endpoints.LOGIN)
  }


  async validatePerformance(){

  }

  async postAllProducts(){
    return await this.apiContext.post(endpoints.GET_PRODUCTS);
  }

  async close() {
    await this.apiContext.dispose();
  }
}
