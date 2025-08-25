import {expect} from 'playwright/test'
import Ajv from 'ajv'

export class schemaValidator{

    static async validateSchema(response, expectedSchema){
    const responseBody = await response.json();
    const ajv = new Ajv();
    const validate = ajv.compile(expectedSchema);
    const isValid = validate(responseBody)

    await expect(isValid).toBeTruthy()
  }
}