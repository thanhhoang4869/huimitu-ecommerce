import cartModel from '#src/models/cart.model'
import variantModel from '#src/models/variant.model'

export default {
    async getCart(req, res, next) {
        try {
            const { email } = req.payload;
            const cartResult = await cartModel.getCart(email);
            const { id, count, total } = cartResult;
            const variantsResult = await variantModel.getByCartId(id);
            const variants = variantsResult.map(item => ({
                id: item.id,
                variantName: item.variant_name,
                price: item.price,
                discountPrice: item.discount_price,
                stock: item.stock
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get cart successfully",
                cart: {
                    id: id,
                    count: count,
                    total: total
                },
                variants: variants
            })
        } catch (err) {
            next(err)
        }
    },

    async addVariantToCart(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    },

    async deleteVariantFromCart(req, res, next) {
        try {
        } catch (err) {
            next(err)
        }
    },
} 