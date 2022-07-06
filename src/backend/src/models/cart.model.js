import db from '#src/utils/db'

export default {
    async getCart(email) {
        const result = await db('cart').where({
            "cart.email": email,
        })
        .select(
            "cart.id",
            "cart.count",
            "cart.total",
        )
        return result[0] || null;
    },
}