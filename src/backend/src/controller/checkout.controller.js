import variantModel from '#src/models/variant.model'

export default {
    async checkout(req, res, next) {
        try {
            const { email } = req.payload;
            const { orderId } = req.params;
            const {
                payment,
                shippingAddressId,
                voucherCode
            } = req.body;

            // const variant = await variantModel.getByVariantId(variantId)
            // const variantStock = variant.stock
            // if (variantStock < quantity) {
            //     return res.send({
            //         exitcode: 101,
            //         message: "Out of stock"
            //     })
            // }

            const shippingAddress = await shippingAddressModel.getById(shippingAddressId);
            if (shippingAddress === null || shippingAddress.email !== email) {
                return res.send({
                    exitcode: 102,
                    message: "Shipping address not found"
                })
            }

            const voucher = await voucherModel.getByVoucherCode(voucherCode);
            if (voucher === null) {
                return res.send({
                    exitcode: 103,
                    message: "Voucher code not found"
                })
            }

        } catch (err) {
            next(err)
        }
    },

    async successMomo(req, res, next) {

    },

    async successPaypal(req, res, next) {

    }
}