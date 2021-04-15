import { v4 as uuidv4 } from 'uuid';
import { client } from '../../db/db-client'
import { createResponse } from '../../utils/api-response';

let pool;

export const createProduct = async (event) => {
    console.log(`Event body: ${event.body}`);

    pool = await client.connect();

    const body = JSON.parse(event.body || '{}');

    const {
        name, image, description, brand, category, price, rating, numReviews, count
    } = body;

    try {

        const newProduct = await client.query(
            `INSERT INTO products(id, name, image, description, brand, category, price, rating, numreviews) values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [uuidv4(), name, image, description, brand, category, price, rating, numReviews]
        );
        console.log('New product success: ', newProduct.rows[0])
        const newProductStock = await client.query(`INSERT INTO stocks values($1, $2) RETURNING *`, [newProduct.rows[0].id, count]);
        
        console.log('New products stock success: ', newProductStock.rows[0])
        return createResponse(200, { ...newProduct.rows[0], count: newProductStock.rows[0].count });

    } catch (error) {

        return createResponse(500, error, true);

    } finally {

        pool.release();

    }
};