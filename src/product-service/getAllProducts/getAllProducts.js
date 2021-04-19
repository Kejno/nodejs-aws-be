import { Client } from 'pg';
import { dbOptions } from '../../db/db-options';
import { createResponse } from '../../utils/api-response';

export const getAllProducts = async () => {

    const client = new Client(dbOptions);
    await client.connect();

    try {

        const { rows: products } = await client.query(`SELECT product.*, stock.count FROM product LEFT JOIN stock ON stock.product_id=product.id`);

        return createResponse(200, { products, count: products.length });

    } catch (error) {

        return createResponse(500, error, true);

    } finally {

        client.end();

    }
};