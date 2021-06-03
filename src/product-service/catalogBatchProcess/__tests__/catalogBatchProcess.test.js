import * as AWSMock from 'aws-sdk-mock';
import { createProduct } from '../../handler';
import { catalogBatchProcess } from '../catalogBatchProcess';

jest.mock('../../createProduct/createProduct');
jest.mock('pg');

describe('catalogBatchProcess', () => {
  test('should notify sns if product created', async () => {
    AWSMock.mock('SNS', 'publish', () => console.log('message was published'));

    const result = await catalogBatchProcess({ Records: [{ body: '{"a": 1}' }, { body: '{"a": 2}' }] });

    expect(createProduct).toHaveBeenCalledTimes(2);

    expect(result.statusCode).toEqual(201);
  });
});