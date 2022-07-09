import variantModel from '#src/models/variant.model'
import paymentModel from '#src/models/payment.model'
import accountModel from '#src/models/account.model'
import shippingAddressModel from '#src/models/shippingAddress.model'
import config from '#src/config/config'
import { MomoCheckoutProvider, PaypalCheckoutProvider, ShipCodCheckoutProvider } from '#src/utils/checkout'

export default {
    async checkoutBuyNow(req, res, next) {
        try {
            const { email } = req.payload;
            const {
                variantId,
                quantity,
                paymentId,
                shippingAddressId,
                shippingProviderId,
                voucherId
            } = req.body;

            // Check for stock
            const variant = await variantModel.getByVariantId(variantId)
            const variantStock = variant.stock
            if (variantStock < quantity) {
                return res.send({
                    exitcode: 101,
                    message: "Out of stock"
                })
            }

            // Check for shipping address correctness
            const shippingAddress = await shippingAddressModel.getShippingAddressById(shippingAddressId);
            if (shippingAddress === null || shippingAddress.email !== email) {
                return res.send({
                    exitcode: 102,
                    message: "Invalid shipping address ID"
                })
            }

            // Verify voucher code
            if (voucherId) {
                const voucher = await voucherModel.getByVoucherCode(voucherCode);
                if (voucher === null) {
                    return res.send({
                        exitcode: 103,
                        message: "Voucher code not found"
                    })
                }
            }

            // Calculate fee
            const shippingProvider = await shippingProviderModel.getById(shippingProviderId);


            // Create link for order
            const payment = await paymentModel.getById(paymentId)
            if (payment === null) {
                return res.end({
                    exitcode: 104,
                    message: "Invalid payment"
                })
            }

            const providerName = payment.provider;
            const checkoutProvider = (providerName === config.payment.MOMO) ? (
                new MomoCheckoutProvider()
            ) : ((providerName === config.payment.PAYPAL) ? (
                new PaypalCheckoutProvider()
            ) : (
                new ShipCodCheckoutProvider()
            ))

            const account = await accountModel.getByEmail(email);
            const { fullname, phone } = account;
            const userInfo = {
                email: email,
                fullname: fullname,
                phoneNumber: phone
            }
            const amount = 10_000;

            try {
                const [orderId, redirectUrl] = await checkoutProvider.createLink(amount, userInfo);
                if (redirectUrl) {
                    res.redirect(301, redirectUrl);
                } else {
                    res.status(200).send({
                        exitcode: 0,
                        message: "Checkout successfully",
                        orderId: orderId
                    })
                }
            } catch (err) {
                console.error(err.response.data)
                throw err
            }

        } catch (err) {
            next(err)
        }
    },

    async checkoutCart(req, res, next) {

    },

    async successMomo(req, res, next) {

    },

    async successPaypal(req, res, next) {

    }
}