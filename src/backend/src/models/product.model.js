import db from '#src/utils/db'
import config from '#src/config/config'

export default {
    async getBestSeller() {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .join('product_variant', 'product_variant.product_id', 'product.id')
            .leftJoin('order_variant', 'order_variant.variant_id', 'product_variant.id')
            .leftJoin('order', 'order.id', 'order_variant.order_id')
            .leftJoin('order_state', 'order_state.order_id', 'order.id')
            .where('order_state.state', config.orderState.SUCCESS)
            .groupBy('product.id', 'category.category_name')
            .sum('order_variant.quantity as sold_quantity')
            .orderBy('sold_quantity', 'desc')
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

    async getProductById(productId) {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .join('product_variant', 'product_variant.product_id', 'product.id')
            .leftJoin('order_variant', 'order_variant.variant_id', 'product_variant.id')
            .leftJoin('order', 'order.id', 'order_variant.order_id')
            .leftJoin('order_state', 'order_state.order_id', 'order.id')
            .where({
                "product.id": productId,
                "order_state.state": config.orderState.SUCCESS
            })
            .groupBy('product.id', 'category.id', 'category.category_name')
            .sum('order_variant.quantity as sold_quantity')
            .select({
                id: 'product.id',
                product_name: 'product.product_name',
                category_id: 'category.id',
                category_name: 'category.category_name',
                description: 'product.description',
                avg_rating: 'product.avg_rating',
                count_rating: 'product.count_rating',
                min_price: 'product.min_price',
                max_price: 'product.max_price',
                stock: 'product.stock',
                created_time: 'product.created_time'
            })
        return result[0] || null;
    },

    async getImageById(productId) {
        const result = await db('product_image')
            .join('product', 'product.id', 'product_image.product_id')
            .where({
                'product.id': productId
            })
            .select('product_image.id', 'path')
        return result || null;
    },

    async getSingleImageById(productId) {
        const result = await db('product_image')
            .join('product', 'product.id', 'product_image.product_id')
            .where({
                'product.id': productId
            })
            .select('product_image.id', 'path').limit(1)
        try {
            return result[0].path;
        } catch (err) {
            return null
        }
    },

    async updateProduct(productId, entity) {
        const { productName, categoryName, description } = entity
        const result = await db('product').where({
            id: productId
        }).update({
            product_name: productName,
            description: description,
            category_id: (categoryName) ? (db('category').where({
                category_name: categoryName
            }).select('id')) : (undefined)
        }).select('id')
        return result;
    },

    async deleteProduct(productId) {
        const result = await db('product').where({
            id: productId
        }).delete()
        return result
    },

    async createProduct(entity) {
        const { productName, description, categoryName } = entity

        const result = await db('product').insert({
            product_name: productName,
            description: description,
            category_id: db('category').where({
                category_name: categoryName
            }).select('id')
        }).returning('id')

        try {
            return result[0].id;
        } catch (err) {
            return null;
        }
    },

    async insertImages(productId, listImage) {
        const entities = listImage.map(item => ({
            product_id: productId,
            path: item.path,
            filename: item.fileName
        }))
        const result = await db('product_image').insert(entities)
        return result;
    },

    async getProductByCategoryList(listId, limit, offset, minPrice, maxPrice, sortType) {
        let builder = db('product').select(
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
        ).join(
            'category',
            'product.category_id',
            'category.id'
        ).whereIn('category.id', listId).as('searched')
        let alias = 'searched'

        if (minPrice && maxPrice) {
            builder = db.from(builder).where(
                `${alias}.min_price`, '>=', minPrice
            ).andWhere(
                `${alias}.max_price`, '<=', maxPrice
            ).as('filtered')
            alias = 'filtered'
        }

        if (sortType) {
            builder = db.from(builder).orderBy(
                `${alias}.min_price`,
                sortType
            ).as('sorted');
            alias = 'sorted'
        }

        const result = await db.from(builder).offset(offset).limit(limit)
        return result || null;
    },

    async countProductByCategoryList(listId, minPrice, maxPrice) {
        let builder = db('product')
            .join('category', 'product.category_id', 'category.id')
            .whereIn('category.id', listId)
            .select(
                'min_price',
                'max_price'
            )
            .as('searched')
        let alias = 'searched'

        if (minPrice && maxPrice) {
            builder = db.from(builder).where(
                `${alias}.min_price`, '>=', minPrice
            ).andWhere(
                `${alias}.max_price`, '<=', maxPrice
            ).as('filtered')
            alias = 'filtered'
        }

        const result = await db.from(builder).count();
        return result[0].count;
    }
}