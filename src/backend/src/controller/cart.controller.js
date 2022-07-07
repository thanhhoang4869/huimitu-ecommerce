import cartModel from '#src/models/cart.model'
import variantModel from '#src/models/variant.model'

export default {
    async getCart(req, res, next) {
        try {
            const { email } = req.payload;

            const cartResult = await cartModel.getCartByEmail(email);
            const { id, count, total } = cartResult;

            const variantsResult = await variantModel.getByCartId(id);
            const variants = variantsResult.map(item => ({
                id: item.id,
                variantName: item.variant_name,
                price: item.price,
                discountPrice: item.discount_price,
                stock: item.stock,
                quantity: item.quantity
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
            const { email } = req.payload;
            const { variantId, quantity } = req.body;

            const cartResult = await cartModel.getCartByEmail(email);
            const { id } = cartResult;

            const variantsResult = await variantModel.getByCartId(id);
            const listVariantId = variantsResult.map(item => item.id);

            if (variantId in listVariantId) {
                return res.status(200).send({
                    exitcode: 102,
                    message: "Item already in your cart"
                })
            }

            const variant = await variantModel.getByVariantId(variantId);
            if (variant === null) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Item not found"
                })
            }

            const result = await cartModel.addVariantToCart(email, variantId, quantity);
            res.send({
                exitcode: 0,
                message: "Add item to cart successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async updateVariantOfCart(req, res, next) {
        try {
            const { email } = req.payload;
            const { variantId, quantity } = req.body;

            if (quantity < 1) {
                res.status(200).send({
                    exitcode: 103,
                    message: "Quantity must be equal or greater than 1"
                })
            }

            const result = await cartModel.updateVariantOfCart(email, variantId, quantity);
            if (result > 0) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Update item of cart successfully"
                })
            } else {
                res.send({
                    exitcode: 101,
                    message: "Item not found"
                })
            }
        } catch (err) {
            next(err)
        }
    },

    async deleteVariantFromCart(req, res, next) {
        try {
            const { variantId, email } = req.payload;

            const result = await cartModel.deleteVariantFromCart(email, variantId);
            if (result > 0) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Delete item of cart successfully"
                })
            } else {
                res.send({
                    exitcode: 101,
                    message: "Item not found"
                })
            }
        } catch (err) {
            next(err)
        }
    },
} 