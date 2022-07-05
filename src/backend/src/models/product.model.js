import db from '#src/utils/db'
import config from '#src/config/config'

export default {
    async getBestSeller() {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .join('product_variant', 'product_variant.product_id', 'product.id')
            .join('order_variant', 'order_variant.variant_id', 'product_variant.id')
            .join('order', 'order.id', 'order_variant.order_id')
            .join('order_state', 'order_state.order_id', 'order.id')
            .where('order_state.state', 'completed')
            .groupBy('product.id')
            .orderByRaw('count("order".id) desc')
            .select(
                'product.id',
                'product.product_name',
                'category.category_name',
                'product.description',
                'product.avg_rating',
                'product.count_rating',
                'product.min_price',
                'product.max_price',
                'product.stock',
                'product.created_time'
            )
            .limit(config.BEST_SELLER_LIMIT)
        return result || null;
    },


    async getNewestArrival() {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .select(
                'product.id',
                'product.product_name',
                'category.category_name',
                'product.description',
                'product.avg_rating',
                'product.count_rating',
                'product.min_price',
                'product.max_price',
                'product.stock',
                'product.created_time'
            ).orderBy('created_time', 'desc').limit(config.BEST_SELLER_LIMIT)
        return result || null;
    },

    async getById(productId) {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .where({
                "product.id": productId,
            })
            .select(
                'product.id',
                'product.product_name',
                'category.category_name',
                'product.description',
                'product.avg_rating',
                'product.count_rating',
                'product.min_price',
                'product.max_price',
                'product.stock',
                'product.created_time'
            )
        return result[0] || null;
    }
}