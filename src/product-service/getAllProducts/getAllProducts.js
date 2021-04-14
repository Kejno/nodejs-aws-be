import { client } from '../../db-service/db-client'
import { createResponse } from '../../utils/api-response';

export const getAllProducts = async () => {

    await client.connect()

    try {

        const { rows: products } = await client.query(`SELECT product.*, stock.count FROM product LEFT JOIN stock ON stock.product_id=product.id`);
        console.log({ products, count: products.length })
        return createResponse(200, { products, count: products.length });

    } catch (error) {

        return createResponse(500, error, true);

    } finally {

        client.end();

    }
};