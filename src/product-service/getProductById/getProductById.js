import { client } from '../../db-service/db-client'
import { createResponse } from '../../utils/api-response';

export const getProductById = async (event) => {

    const { id } = event.pathParameters || '';

    await client.connect()

    try {

      const { rows: product } = await client.query(
        'SELECT product.*, stock.count FROM product LEFT JOIN stock ON stock.product_id=product_id WHERE id = $1', [id]
        );

      if (!product) {
          return createResponse(404, null, `Product with ${id} not found`, true);
        }
      return createResponse(200, product);
    } catch (error) {
      return createResponse(500, error, true);
    }


};