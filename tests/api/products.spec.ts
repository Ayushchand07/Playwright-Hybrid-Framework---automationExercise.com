import { test, expect} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';

dotenv.config();

test('TC-01: Get all products', async ({ request }) => {

    const client = new APIClient()

    await client.init()
    await client.getAllProducts()
})