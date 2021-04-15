import { createResponse } from '../../../utils/api-response';
import { getProductById } from '../getProductById';
import { products } from "../../../products";

jest.mock('../../../utils/api-response', () => ({
    createResponse: jest.fn(),
}));

describe('getAllProducts.js', () => {

  test('should return all products', async () => {
    const id = '6a5d2c9f-1709-414e-b1f0-0faae23c9b2d';

    await getProductById({ pathParameters: { id } });

    expect(createResponse).toHaveBeenCalledWith(200, products.find(item => item.id === id));
  });

  test('should return 404 error if item not found', async () => {
      const id = '2ec005b5-1f8b-495f-85e3-1e47395178ac';
    await getProductById({ pathParameters: { id } });

    expect(createResponse).toHaveBeenCalledWith(404, null, `Product with ${id} not found`, true);
  });

});