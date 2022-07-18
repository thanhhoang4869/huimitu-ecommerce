import api from "utils/api";

const variantService = {
    async getByProductId(productId) {
        const requestBody = {
            productId: productId
        }
        const response = await api.post('/variant/getByProductId', requestBody)
        return response;
    },

    async getByVariantId(variantId) {
        const response = await api.get(`/variant/${variantId}`)
        return response
    }
}

export default variantService;