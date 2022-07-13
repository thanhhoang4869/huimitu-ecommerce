import db from '#src/utils/db'

export default {
    async getProduct(keyword, limit, offset, minPrice, maxPrice, sortType) {
        const convertedTS = await db.select(
            db.raw(
                'plainto_tsquery(vn_unaccent(?)) AS query', [keyword]
            )
        );
        const query = convertedTS[0].query;

        let builder;
        let alias = "";

        builder = db('product').join(
            'category',
            'product.category_id',
            'category.id'
        ).select(
            db.raw('ts_rank_cd(product_fts, (?)) AS rank', [query]),
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
        ).whereRaw(
            '(?) @@ product.product_fts', [query]
        ).as("searched")
        alias = "searched"

        if (minPrice && maxPrice) {
            builder = db.from(builder).where(
                `${alias}.min_price`, '>=', minPrice
            ).andWhere(
                `${alias}.min_price`, '<=', maxPrice
            ).as("filtered")
            alias = "filtered"
        }

        if (sortType) {
            builder = db.from(builder).orderBy(`${alias}.min_price`, sortType)
        } else {
            builder = db.from(builder).orderBy(`${alias}.rank`, 'desc')
        }

        const result = await builder.offset(offset).limit(limit)
        return result
    },

    async countProduct(keyword, minPrice, maxPrice) {
        const convertedTS = await db.select(
            db.raw(
                'plainto_tsquery(vn_unaccent(?)) AS query', [keyword]
            )
        );
        const query = convertedTS[0].query;

        let builder;
        let alias = "";

        builder = db('product').select(
            db.raw('ts_rank_cd(product_fts, (?)) AS rank', [query]),
            'product.min_price',
            'product.max_price',
        ).whereRaw(
            '(?) @@ product.product_fts', [query]
        ).as("searched")
        alias = "searched"

        if (minPrice && maxPrice) {
            builder = db.from(builder).where(
                `${alias}.min_price`, '>=', minPrice
            ).andWhere(
                `${alias}.min_price`, '<=', maxPrice
            ).as("filtered")
        }

        const result = await db.from(builder).count()

        return result[0] || null;
    }
}