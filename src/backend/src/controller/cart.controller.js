import productModel from '#src/models/product.model'
import cartModel from '#src/models/cart.model'
import variantModel from '#src/models/variant.model'

export default {
    async getCart(req, res, next) {
        try {
            const { email } = req.payload;

            const cartResult = await cartModel.getCartByEmail(email);
            const { id, count, total } = cartResult;

            const variantsResult = await variantModel.getByCartId(id);
            const promises = variantsResult.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.product_id)

                return {
                    id: item.id,
                    variantName: item.variant_name,
                    price: item.price,
                    discountPrice: item.discount_price,
                    stock: item.stock,
                    quantity: item.quantity,
                    image: imagePath
                }
            });
            const variants = await Promise.all(promises);

            res.status(200).send({
                exitcode: 0,
                message: "Get cart successfully",
                cart: {
                    id: id,
                    count: count,
                    total: total,
                    variants: variants
                },
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
            const listVariantId = variantsResult.map(item => ({
                id: item.id,
                quantity: item.quantity,
            }));

            const matchVariant = listVariantId.filter(item => item.id === variantId)[0];
            if (matchVariant) {
                await cartModel.updateVariantOfCart(
                    email,
                    variantId,
                    quantity + matchVariant.quantity
                );
                return res.status(200).send({
                    exitcode: 0,
                    message: "Add item to cart successfully"
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
                const result = await cartModel.deleteVariantFromCart(email, variantId);

                res.status(200).send({
                    exitcode: 0,
                    message: "Delete variant successfully"
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
            const { email } = req.payload;
            const { variantId } = req.params;

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