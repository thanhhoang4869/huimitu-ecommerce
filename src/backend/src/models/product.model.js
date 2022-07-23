import db from '#src/utils/db'
import config from '#src/config/config'

export default {
    async getBestSeller() {
        const result = await db.raw(`
        SELECT *, COALESCE(quantity, 0) as sold_quantity FROM (
            SELECT 
                "product".id, 
                "product".product_name, 
                "category".id AS categoryId, 
                "category".category_name, 
                "product".description, 
                "product".avg_rating, 
                "product".count_rating, 
                "product".min_price, 
                "product".max_price, 
                "product".stock, 
                "product".created_time, (
                    SELECT "sucess_order".total
                    FROM (
                        SELECT SUM("order_variant".quantity) as total
                        FROM "product_variant"
                        LEFT JOIN "order_variant" ON "order_variant".variant_id = "product_variant".id
                        LEFT JOIN (
                            SELECT DISTINCT ("sorted_order".order_id), "sorted_order".state
                            FROM (
                                SELECT *
                                FROM "order_state"
                                ORDER BY created_time DESC
                            ) AS "sorted_order"
                        ) AS "last_state" ON "last_state".order_id = "order_variant".order_id
                        WHERE "product_variant".product_id = "product".id
                        AND "last_state".state = (?)
                    ) AS "sucess_order"
                ) AS quantity
            FROM "product"
            JOIN "category" ON "product".category_id = "category".id
            WHERE "product".soft_delete = false
        ) AS "subquery"
        ORDER BY sold_quantity DESC
        LIMIT (?)
        `, [config.orderState.SUCCESS, config.BEST_SELLER_LIMIT])
        console.log(result.rows)
        return result.rows || null;
    },

    async getNewestArrival() {
        const result = await db('product').where({
            soft_delete: false
        }).join('category', 'product.category_id', 'category.id')
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

    async getRelatedProduct(productId) {
        const result = await db('frequent_product').where({
            product_id: productId
        })
            .join('product', 'product.id', 'frequent_product.consequence_id')
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
            ).orderBy('confident', 'desc').limit(config.RELATED_PRODUCT_LIMIT)

        return result || null;
    },

    async getProductById(productId) {
        const result = await db('product').where({
            'product.id': productId,
            "product.soft_delete": false
        })
            .join('category', 'product.category_id', 'category.id')
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
                created_time: 'product.created_time',
                sold_quantity: db.from(
                    db('product_variant').select(
                        'order_state.order_id',
                        'order_state.created_time',
                        'order_variant.variant_id',
                        'order_variant.quantity',
                    )
                        .leftJoin('order_variant', 'order_variant.variant_id', 'product_variant.id')
                        .leftJoin('order_state', 'order_state.order_id', 'order_variant.order_id')
                        .where({
                            "product_variant.product_id": productId,
                            "order_state.state": config.orderState.SUCCESS
                        })
                        .orderBy('order_state.created_time', 'desc')
                        .distinct('order_state.order_id', 'order_variant.variant_id')
                        .as('success_order')
                ).select(db.raw('COALESCE(sum(success_order.quantity), 0) as sold_quantity'))
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
        console.log(productId)
        const result = await db('product').where({
            id: productId
        }).update({
            soft_delete: true
        })
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
            filename: item.filename
        }))
        const result = await db('product_image').insert(entities)
        return result;
    },

    async getProduct(limit, offset, minPrice, maxPrice, sortType, categoryListId = []) {
        let builder = db('product').where({
            soft_delete: false
        }).select(
            'product.id',
            'product.product_name',
            'category.id AS category_id',
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
        ).as('joined')
        let alias = 'joined'

        if (categoryListId.length > 0) {
            builder = db.from(builder)
                .whereIn('category_id', categoryListId)
                .as('searched')
            alias = "searched"
        }

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

    async countProduct(minPrice, maxPrice, categoryListId = []) {
        let builder = db('product').where({
            soft_delete: false,
        })
            .join('category', 'product.category_id', 'category.id')
            .select(
                'min_price',
                'max_price',
                'category.id AS category_id'
            )
            .as('joined')
        let alias = 'joined'

        if (categoryListId.length > 0) {
            builder = db.from(builder)
                .whereIn('category_id', categoryListId)
                .as('searched')
            alias = "searched"
        }

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
    },

    async deleteProductImage(productImageId) {
        const result = await db('product_image').where({
            id: productImageId
        }).select(
            'product_image.path AS product_image_path',
            'product_image.filename AS product_image_filename'
        )
        await db('product_image').where({
            id: productImageId
        }).delete()
        return result[0] || {};
    },
}