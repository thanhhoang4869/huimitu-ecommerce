import db from '#src/utils/db'

export default {
    async getByProductId(productId) {
        const result = await db('product_variant')
            .join('product', 'product.id', 'product_variant.product_id')
            .where({
                "product.id": productId,
            })
            .select(
                "product_variant.id",
                "product_variant.variant_name",
                "product_variant.price",
                "product_variant.discount_price",
                "product_variant.stock"
            )
        return result || null;
    },

    async createVariant(entity) {
        const {
            productId,
            variantName,
            price,
            discountPrice,
            stock
        } = entity
        const result = await db('product_variant').insert({
            product_id: productId,
            variant_name: variantName,
            price: price,
            discount_price: discountPrice,
            stock: stock
        })
        return result;
    },

    async updateVariant(variantId, entity) {
        const {
            variantName,
            price,
            discountPrice,
            stock
        } = entity
        const result = await db('product_variant').where({
            id: variantId
        }).update({
            variant_name: variantName,
            price: price,
            discount_price: discountPrice,
            stock: stock

        })
        return result;
    },

    async deleteVariant(variantId) {
        const result = await db('product_variant').where({
            id: variantId
        }).delete()
        return result;
    }
}