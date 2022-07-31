import db from '#src/utils/db'
import { removeUndefined } from '#src/utils/utils'

export default {
    async createReview({ variantId, orderId, rating, comment }) {
        const result = await db('review').insert({
            variant_id: variantId,
            order_id: orderId,
            rating: rating,
            comment: comment
        })
        return result
    },

    async getReview({ productId, variantId, orderId }) {
        const query = removeUndefined({
            'product_id': productId,
            'variant_id': variantId,
            'order_id': orderId
        })
        const result = await db('review')
            .join('product_variant', 'review.variant_id', 'product_variant.id')
            .join('order', 'order.id', 'review.order_id')
            .join('account', 'account.email', 'order.email')
            .where(query)
            .select(
                'account.email',
                'account.fullname',
                'account.avatar_path',
                'review.variant_id',
                'review.order_id',
                'review.rating',
                'review.comment',
                'review.created_time'
            )
        return result
    }
}