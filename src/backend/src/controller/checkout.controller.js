import variantModel from '#src/models/variant.model'
import voucherModel from '#src/models/voucher.model'
import paymentModel from '#src/models/payment.model'
import accountModel from '#src/models/account.model'
import shippingAddressModel from '#src/models/shippingAddress.model'
import shippingProviderModel from '#src/models/shippingProvider.model'
import config from '#src/config/config'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'
import { MomoCheckoutProvider, PaypalCheckoutProvider, ShipCodCheckoutProvider } from '#src/utils/checkout'
import orderModel from '#src/models/order.model'
import { getRate } from '#src/utils/currencyConverter'

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
                voucherCode
            } = req.body;

            // Check for stock
            const variant = await variantModel.getByVariantId(variantId)
            const variantStock = variant.stock
            if (variantStock < quantity) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Out of stock"
                })
            }

            // Check for shipping address correctness
            const shippingAddress = await shippingAddressModel.getShippingAddressById(shippingAddressId);
            if (shippingAddress === null || shippingAddress.email !== email) {
                return res.status(200).send({
                    exitcode: 102,
                    message: "Invalid shipping address ID"
                })
            }

            // Verify voucher code
            let percentageDiscount = 0;
            let maxDiscountPrice = 0;
            let minPrice = 0;
            if (voucherCode) {
                const voucher = await voucherModel.getVoucherByCodeEmail(voucherCode, email);
                if (voucher === null) {
                    return res.status(200).send({
                        exitcode: 103,
                        message: "Invalid voucher code"
                    })
                }
                percentageDiscount = voucher.percentage_discount
                maxDiscountPrice = voucher.maximum_discount_price;
                minPrice = voucher.minimum_price;
            }

            // Calculate fee
            const shippingProvider = await shippingProviderModel.getShippingProvider(shippingProviderId);
            if (shippingProvider === null) {
                return res.status(200).send({
                    exitcode: 104,
                    message: "Invalid shipping provider ID"
                })
            }
            const shippingFee = 0;

            // Verify payment ID
            const payment = await paymentModel.getById(paymentId)
            if (payment === null) {
                return res.status(200).send({
                    exitcode: 105,
                    message: "Invalid payment ID"
                })
            }

            // Get user information
            const account = await accountModel.getByEmail(email);
            const { fullname, phone } = account;
            const userInfo = {
                email: email,
                fullname: fullname,
                phoneNumber: phone
            }

            // Create checkout provider
            const providerName = payment.provider;
            const checkoutProvider = (providerName === config.payment.MOMO) ? (
                new MomoCheckoutProvider()
            ) : ((providerName === config.payment.PAYPAL) ? (
                new PaypalCheckoutProvider()
            ) : (
                new ShipCodCheckoutProvider()
            ))

            // Calculate price
            const variantPrice = (variant.discount_price) ? (variant.discount_price) : (variant.price)
            const totalPrice = (variantPrice * quantity)

            // Check for min price of voucher
            if (totalPrice < minPrice) {
                return res.status(200).send({
                    exitcode: 106,
                    message: "Do not reach voucher's minimum price"
                })
            }

            // Calculate final price
            const discountPrice = Math.min(maxDiscountPrice, totalPrice * percentageDiscount)
            const finalPrice = Math.round(
                100 * (totalPrice - discountPrice + shippingFee) * getRate(config.currency.USD, config.currency.VND),
            ) / 100;

            // Create orderId and link
            const [orderId, redirectUrl] = await checkoutProvider.createLink(finalPrice, userInfo);
            console.debug(redirectUrl)

            // Create order
            const basicInfo = {
                paymentId,
                shippingAddressId,
                shippingProviderId,
                voucherCode,
                total: finalPrice,
                shippingPrice: shippingFee
            }
            await orderModel.createOrder(email, orderId, basicInfo)

            // Response
            if (providerName === config.payment.MOMO) {
                res.redirect(301, redirectUrl);
            } else {
                res.status(200).send({
                    exitcode: 0,
                    message: "Checkout successfully",
                    orderId: orderId
                })
            }
        } catch (err) {
            next(err)
        }
    },

    async checkoutCart(req, res, next) {

    },

    async successMomo(req, res, next) {
        try {
            const {
                orderId,
                resultCode,
                amount
            } = req.body;

            // Verify signature
            const provider = new MomoCheckoutProvider();
            if (!provider.verifySignature(req.body)) {
                throw new ErrorHandler(400, "Signature is mismatch");
            }

            // Verify for price
            const order = orderModel.getById(orderId)
            if (order.total !== amount) {
                throw new ErrorHandler(400, "Amount is mismatch");
            }

            // Check for transaction success
            if (resultCode !== 0) {
                throw new ErrorHandler(400, "Transaction failed");
            }

            // Update state
            await orderModel.updateState(orderId, config.orderState.PAID);

            // Response for acknowledge
            res.status(204).send({}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (err) {
            next(err);
        }
    },

    async successPaypal(req, res, next) {
        try {
            const {
                orderId
            } = req.body;
            const provider = new PaypalCheckoutProvider();

            // Update state
            await orderModel.updateState(orderId, config.orderState.PAID);

            const response = await provider.capturePayment(orderId);
            if (response.status === "COMPLETED") {
                res.status(200).send({
                    exitcode: 0,
                    message: "Payment has been captured"
                });
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Payment capture failed"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}