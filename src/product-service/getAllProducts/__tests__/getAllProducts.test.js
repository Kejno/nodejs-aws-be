import { createResponse } from '../../../utils/api-response';
import { getAllProducts } from '../getAllProducts';
import { products } from "../../../products";

jest.mock('../../../utils/api-response', () => ({
    createResponse: jest.fn(),
}));

describe('getAllProducts.js', () => {
  test('should return all products', async () => {
    await getAllProducts();

    expect(createResponse).toHaveBeenCalledWith(200, { products, count: products.length } );
  });
});
