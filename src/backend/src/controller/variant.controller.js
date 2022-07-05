import variantModel from '#src/models/variant.model'

export default {
    async getByProductId(req, res, next) {
        try {
            const productId = req.body.productId;
            const result = await variantModel.getByProductId(productId)
            const variants = result.map(item => ({
                variantName: item.variant_name,
                price: item.price,
                discountPrice: item.discount_price,
                stock: item.stock,
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get product successfully",
                variants: variants
            })
        } catch (err) {
            next(err)
        }
    },
} 