import db from '#src/utils/db'
import config from '#src/config/config'

export default {
    async getBestSeller() {
        const result = await db('product')
            .join('variant', 'variant.product_id', 'product.id')
            .join('order_variant', 'order_variant.variant_id', 'variant.id')
            .join('order', 'order.id', 'order_variant.order_id')
            .join('order_state', 'order_state.order_id', 'order.id')
            .where('order_state.state', 'completed')
            .groupBy('product.id')
            .orderByRaw('count("order".id) desc')
            .select(
                'product.id',
                'product.name',
                'product.category_id',
                'product.description',
                'product.avg_rating',
                'product.count_rating'
            )
            .limit(config.BEST_SELLER_LIMIT)
        return result || null;
    }
}