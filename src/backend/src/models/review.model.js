import db from '#src/utils/db'

export default {
    async createProductReview(entity) {
        const { productId, orderId, rating, comment } = entity
        const result = await db('review').insert({
            product_id: productId,
            order_id: orderId,
            rating: rating,
            comment: comment
        })
        return result
    }
}