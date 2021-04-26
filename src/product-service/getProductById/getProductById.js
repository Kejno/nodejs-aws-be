import { Client } from 'pg';
import { validate as uuidValidate } from 'uuid';
import { dbOptions } from '../../db/db-options';
import { createResponse } from '../../utils/api-response';

export const getProductById = async (event) => {

  const { id } = event.pathParameters;

  console.log(`Requested product id ${id}`);

  if (!uuidValidate(id)) {
    return createResponse(400, null, 'Invalid id params', true);
  }

  const client = new Client(dbOptions);
  await client.connect();

  try {

    const { rows } = await client.query(
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
    client.end();
  }

};