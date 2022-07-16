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

    async getByVariantId(variantId) {
        const result = await db('product_variant').where({
            id: variantId,
        }).select(
            "product_variant.id",
            "product_variant.variant_name",
            "product_variant.price",
            "product_variant.discount_price",
            "product_variant.stock"
        )
        return result[0] || null;
    },


    async getByCartId(cartId) {
        const result = await db('cart')
            .join('cart_variant', 'cart.id', 'cart_variant.cart_id')
            .join('product_variant', 'cart_variant.variant_id', 'product_variant.id')
            .where({
                "cart.id": cartId,
            })
            .select(
                "product_variant.id",
                "product_variant.product_id",
                "product_variant.variant_name",
                "product_variant.price",
                "product_variant.discount_price",
                "product_variant.stock",
                "cart_variant.quantity"
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
        }).returning('id')
        try {
            return result[0].id;
        } catch (err) {
            return null;
        }
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