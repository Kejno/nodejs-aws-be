import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { dbOptions } from '../../db/db-options';
import { createResponse } from '../../utils/api-response';

export const createProduct = async (event) => {
    console.log(`Event body: ${event.body}`);

    const client = new Client(dbOptions);
    await client.connect();

    const body = JSON.parse(event.body || '{}');

    const {
        name, image, description, brand, category, price, rating, numReviews, count
    } = body;

    try {
        await client.query('BEGIN');

        // Product table
        const newProduct = await client.query(
            `INSERT INTO product (id, name, image, description, brand, category, price, rating, numreviews) values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [uuidv4(), name, image, description, brand, category, price, rating, numReviews]
        );
        console.log('New product success: ', newProduct.rows[0]);

        // Stock table
        const newProductStock = await client.query(`INSERT INTO stock values($1, $2) RETURNING *`, [newProduct.rows[0].id, count]);
        console.log('New products stock success: ', newProductStock.rows[0]);

        await client.query('COMMIT');

        return createResponse(200, { ...newProduct.rows[0], count: newProductStock.rows[0].count });


    } catch (error) {
        await client.query('ROLLBACK');
        return createResponse(500, error, true);

    } finally {

        client.end();

    }
};