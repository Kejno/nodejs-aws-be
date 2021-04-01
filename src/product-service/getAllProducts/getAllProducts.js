import { products } from '../../products'
import { createResponse } from '../../utils/api-response';

export const getAllProducts = async () => {
    return createResponse(200, { products, count: products.length })
};