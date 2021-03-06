import variantModel from '#src/models/variant.model'
import productModel from '#src/models/product.model'

export default {
    async getByProductId(req, res, next) {
        try {
            const productId = req.body.productId;
            const result = await variantModel.getByProductId(productId)
            const variants = result.map(item => ({
                id: item.id,
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

    async getSingleVariant(req, res, next) {
        try {
            const { variantId } = req.params;
            const result = await variantModel.getByVariantId(variantId)
            if (result === null) {
                res.status(200).send({
                    exitcode: 101,
                    message: "Variant not found"
                })
            }
            const {
                id,
                variant_name,
                price,
                discount_price,
                stock
            } = result
            res.status(200).send({
                exitcode: 0,
                message: "Get variant successfully",
                variant: {
                    id: id,
                    variantName: variant_name,
                    price: price,
                    discountPrice: discount_price,
                    stock: stock
                }
            })
        } catch (err) {
            next(err)
        }
    },

    async createVariant(req, res, next) {
        try {
            const { productId, variantName, price, discountPrice, stock } = req.body

            const product = await productModel.getProductById(productId);
            if (product === null) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Product not found"
                })
            }

            const entity = {
                productId,
                variantName,
                price,
                discountPrice,
                stock
            }
            const variantId = await variantModel.createVariant(entity);
            res.status(200).send({
                exitcode: 0,
                message: "Create variant successfully",
                variantId: variantId
            })
        } catch (err) {
            next(err)
        }
    },

    async updateVariant(req, res, next) {
        try {
            const { variantId } = req.params;
            const { variantName, price, discountPrice, stock } = req.body;
            const entity = {
                variantName,
                price,
                discountPrice,
                stock
            }
            const result = await variantModel.updateVariant(variantId, entity)
            if (result > 0) {
                return res.status(200).send({
                    exitcode: 0,
                    message: "Update variant successfully"
                })
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Variant not found"
                })
            }
        } catch (err) {
            next(err)
        }
    },

    async deleteVariant(req, res, next) {
        try {
            const { variantId } = req.params;
            const result = await variantModel.deleteVariant(variantId)
            if (result > 0) {
                return res.status(200).send({
                    exitcode: 0,
                    message: "Delete variant successfully"
                })
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Variant not found"
                })
            }
        } catch (err) {
            next(err)
        }
    }
} 