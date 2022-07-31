import api from "utils/api";

const reviewService = {
    async getReview({ productId, orderId, variantId }) {
        const params = {
            productId,
            orderId,
            variantId
        }
        const response = await api.get("/review", { params });
        return response;
    },

    async createReview({orderId, variantId, rating, comment}) {
        const requestBody = {
            orderId,
            variantId,
            rating,
            comment
        }
        const response = await api.post('/review', requestBody);
        return response;
    }
}
export default reviewService