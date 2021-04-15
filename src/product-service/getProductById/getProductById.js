import { client } from '../../db/db-client'
import { createResponse } from '../../utils/api-response';

let pool;

export const getProductById = async (event) => {

  const { id } = event.pathParameters;

  pool = await client.connect();

  try {

    const { rows } = await pool.query(
      'SELECT product.*, stock.count FROM product LEFT JOIN stock ON stock.product_id=product.id WHERE id = $1', [id]
    );

    const product = rows[0];

    if (!product) {
      return createResponse(404, null, `Product with ${id} not found`, true);
    }
    return createResponse(200, product);
  } catch (error) {
    return createResponse(500, error, true);
  } finally {
    pool.release();
  }

};