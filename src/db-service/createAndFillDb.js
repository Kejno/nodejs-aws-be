import format from 'pg-format'
import { client } from './db-client'
import { products } from '../products'

export const createAndFillDb = async () => {

    const valuesForProductTable = [];
    const valuesForStockTable = [];
    await client.connect();

    try {

        await client.query(`DROP TABLE IF EXISTS product, stock`)

        await client.query(`
        CREATE TABLE IF NOT EXISTS product(
            id uuid PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            brand TEXT NOT NULL,
            category TEXT NOT NULL,
            price FLOAT NOT NULL,
            rating FLOAT NOT NULL,
            numReviews INTEGER NOT NULL
        )`);
        await client.query(`  
        CREATE TABLE IF NOT EXISTS stock(
            product_id uuid PRIMARY KEY,
            count INT CHECK (count >= 0) DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES product(id)
        )`);

        products.forEach(product => {
            const { id, countInStock, ...rest } = product
            valuesForStockTable.push([id, countInStock])
            valuesForProductTable.push([id, ...Object.values(rest)])

        })

        await client.query(format('INSERT INTO product VALUES %L', valuesForProductTable))
        await client.query(format('INSERT INTO stock VALUES %L', valuesForStockTable))

    } catch (err) {

        console.error('Error during database request executing:', err);
    } finally {

        client.end();
    }
};