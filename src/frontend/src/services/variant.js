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
    },

    async createVariant({ productId, variantName, price, discountPrice, stock }) {
        const requestBody = {
            productId,
            variantName,
            price,
            discountPrice,
            stock
        }
        const respone = await api.post('/variant', requestBody)
        return respone
    },

    async updateVariant(data) {
        const respone = await api.patch(`/variant/${data.variantId}`, data)
        return respone
    }
}

export default variantService;