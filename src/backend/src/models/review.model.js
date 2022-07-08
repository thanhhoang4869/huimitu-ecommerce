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
            .join('product_variant', 'review.product_variant_id', 'product_variant.id')
            .join('order', 'order.id', 'review.order_id')
            .join('account', 'account.email', 'order.email')
            .where({
                "product_variant.product_id": productId,
            })
            .select(
                'account.email',
                'account.fullname',
                'account.avatar_path',
                'review.product_variant_id',
                'review.order_id',
                'review.rating',
                'review.comment',
                'review.created_time'
            )
        return result
    }
}