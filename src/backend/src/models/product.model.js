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
            .orderByRaw('sold_quantity desc')
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
            .sum('order_variant.quantity as sold_quantity')
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
            .where({
                "product.id": productId,
            })
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
                created_tim: 'product.created_time'
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

    async getProductByCategoryList(listName, limit, offset) {
        const result = await db('product')
            .join('category', 'product.category_id', 'category.id')
            .whereIn('category.category_name', listName)
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
        return result || null;
    }
}