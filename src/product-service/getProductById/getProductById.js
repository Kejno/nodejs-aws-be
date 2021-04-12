import { createResponse } from '../../utils/api-response';
import { products } from '../../products'

export const getProductById = async (event) => {

    const { id } = event.pathParameters;

    try {
      const product = products.find((product) => product.id === id);
      if (!product) {
          return createResponse(404, null, `Product with ${id} not found`, true);
        }
      return createResponse(200, product);
    } catch (error) {
      return createResponse(500, error, true);
    }


};