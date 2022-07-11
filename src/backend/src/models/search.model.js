import db from '#src/utils/db'

export default {
    async getProduct(keyword, limit, offset) {
        const convertedTS = await db.select(
            db.raw(
                'plainto_tsquery(vn_unaccent(?)) AS query', [keyword]
            )
        );
        const query = convertedTS[0].query;

        const result = await db('product')
                .join('category', 'product.category_id', 'category.id')
                .select(
                    db.raw('ts_rank_cd(product_fts, (?)) AS rank',[query]),
                    'product.id',
                    'product.product_name',
                    'category.category_name',
                    'product.description',
                    'product.avg_rating',
                    'product.count_rating',
                    'product.min_price',
                    'product.max_price',
                    'product.stock',
                    'product.created_time',
                )
                .orderBy('rank', 'desc')
                .whereRaw('(?) @@ product.product_fts', [query])
                .offset(offset).limit(limit)
        return result
    },

    async countProduct(keyword) {
        const result = await db('product')
            .whereRaw('plainto_tsquery(vn_unaccent(?)) @@ product.product_fts', [keyword])
            .count()
        return result[0] || null;
    }
}