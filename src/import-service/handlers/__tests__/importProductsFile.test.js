import * as AWSMock from 'aws-sdk-mock';
import { createResponse } from '../../../utils/api-response';
import { importProductsFile } from '../importProductsFile';

jest.mock('../../../utils/api-response', () => ({
  createResponse: jest.fn(),
}));

describe('import', () => {
  test('should return error if name was not passed', async () => {
    await importProductsFile({ queryStringParameters: {} });

    expect(createResponse).toHaveBeenCalledWith(500, null, 'Name not passed', true);
  });

  test('should return signed url', async () => {

    AWSMock.mock('S3', 'putObject', function (params, callback) {
      callback(null, "successfully created object");
    });

    AWSMock.mock('S3', 'getSignedUrl', function (method, params, callback) {
      callback(null, 'https://aws:s3:test.scv');
    });

    await importProductsFile({ queryStringParameters: { name: 'test.csv' } });

    expect(createResponse).toHaveBeenCalledWith({ url: 'https://aws:s3:test.scv' });
  });
});