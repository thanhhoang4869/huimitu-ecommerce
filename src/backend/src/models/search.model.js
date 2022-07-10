import db from '#src/utils/db'

export default {
    async getProduct(tsquery, limit, offset) {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .whereRaw('to_tsquery(lower(?)) @@ product.product_fts', [tsquery])
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
            .offset(offset).limit(limit)
        return result
    },

    async getCategory(tsquery, limit, offset) {
        const result = await db('category')
            .whereRaw('to_tsquery(lower(?)) @@ category_fts', [tsquery])
            .offset(offset).limit(limit)
        return result
    }
}