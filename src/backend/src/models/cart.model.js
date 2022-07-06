import db from '#src/utils/db'

export default {
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
    }
}