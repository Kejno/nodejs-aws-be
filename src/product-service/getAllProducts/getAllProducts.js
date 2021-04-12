import { products } from '../../products'
import { createResponse } from '../../utils/api-response';

export const getAllProducts = async () => {
    try {

        return createResponse(200, { products, count: products.length });
    } catch (error) {
        return createResponse(500, error, true);

    }
};