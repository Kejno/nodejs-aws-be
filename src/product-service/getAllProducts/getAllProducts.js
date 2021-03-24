import { products } from '../../products'

export const getAllProducts = async () => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            products,
            count: products.length
        }),
    };
};