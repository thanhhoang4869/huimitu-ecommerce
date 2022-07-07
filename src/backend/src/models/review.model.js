import db from '#src/utils/db'

export default {
    async createReview(entity) {
        const { productId, orderId, rating, comment } = entity
        const result = await db('review').insert({
            product_id: productId,
            order_id: orderId,
            rating: rating,
            comment: comment
        })
        return result
    },

    async getReview(productId) {
        const result = await db('review')
        .join('product_variant','review.product_variant_id', 'product_variant.id')
        .where({
            "product_variant.product_id": productId,
        })
        .select(
            'review.product_variant_id',
            'review.order_id',
            'review.rating',
            'review.comment'
        )
        return result
    }
}