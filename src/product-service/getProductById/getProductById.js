import { products } from '../../products'

export const getProductById = async (event) => {

    const params = event.pathParameters || {};
    const product = products.find((product) => product.id === params.id);
    return {
        statusCode: 200,
        body: JSON.stringify({
            ...product,
        }),
    };
};