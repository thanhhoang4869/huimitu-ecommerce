import api from "utils/api";

const cartService = {
    async getCart() {
        const response = await api.get('/cart')
        return response;
    },

    async addToCart(variantId, quantity) {
        const requestBody = {
            variantId: variantId,
            quantity: quantity
        }
        const respone = await api.post("/cart", requestBody)
        return respone
    },

    async deleteVariant(variantId) {
        const respone = await api.delete(`/cart/${variantId}`);
        return respone
    }
}

export default cartService;