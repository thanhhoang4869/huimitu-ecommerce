import api from "utils/api";

const variantService = {
    async getByProductId(productId) {
        const requestBody = {
            productId: productId
        }
        const response = await api.post('/variant/getByProductId', requestBody)
        return response;
    },
}

export default variantService;