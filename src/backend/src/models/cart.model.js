import db from '#src/utils/db'

export default {

    async deleteCartByEmail(email) {
        const result = await db('cart_variant').where({
            cart_id: db('cart').where({
                email: email
            }).select('id')
        }).delete();

        return result;
    },

    async getCartByEmail(email) {
        const result = await db('cart').where({
            "cart.email": email,
        }).select(
            "cart.id",
            "cart.count",
            "cart.total",
        )
        return result[0] || null;
    },

    async addVariantToCart(email, variantId, quantity) {
        const result = await db('cart_variant').insert({
            cart_id: db('cart').where({
                email: email
            }).select('id'),
            variant_id: variantId,
            quantity: quantity
        })
        return result;
    },

    async updateVariantOfCart(email, variantId, quantity) {
        const result = await db('cart_variant').where({
            cart_id: db('cart').where({
                email: email
            }).select('id'),
            variant_id: variantId,
        }).update({
            quantity: quantity
        })
        return result;
    },


    async deleteVariantFromCart(email, variantId) {
        const result = await db('cart_variant').where({
            cart_id: db('cart').where({
                email: email
            }).select('id'),
            variant_id: variantId,
        }).delete()
        return result;
    }
}