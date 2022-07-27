import variantModel from '#src/models/variant.model'
import voucherModel from '#src/models/voucher.model'
import paymentModel from '#src/models/payment.model'
import accountModel from '#src/models/account.model'
import cartModel from '#src/models/cart.model'
import shippingAddressModel from '#src/models/shippingAddress.model'
import config from '#src/config/config'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'
import { MomoCheckoutProvider, PaypalCheckoutProvider, ShipCodCheckoutProvider } from '#src/utils/checkout'
import orderModel from '#src/models/order.model'
import { getRate } from '#src/utils/currencyConverter'
import { getDistance } from "#src/utils/map"
import { getOrderEmail, createTransport } from "#src/utils/nodemailer";

export default {
    async getBreakDownPrice(req, res, next) {
        try {
            const { email } = req.payload;
            const {
                variantId,
                quantity,
                shippingAddressId,
                orderId,
                voucherCode
            } = req.body;

            // Calculate total price
            let totalPrice = 0;
            let variants = [];
            if (variantId && quantity) {
                const variant = await variantModel.getByVariantId(variantId)
                variants.push({ ...variant, quantity })
            } else if (orderId) {
                const variantsResult = await variantModel.getByOrderId(orderId);
                variants = variantsResult;
            } else {
                const cart = await cartModel.getCartByEmail(email);
                const variantsResult = await variantModel.getByCartId(cart.id)
                variants = variantsResult;
            }
            variants = variants.map(item => ({
                id: item.id,
                variantName: item.variant_name,
                price: item.price,
                discountPrice: item.discount_price,
                stock: item.stock,
                quantity: item.quantity
            }))
            totalPrice = variants.reduce((previous, current) => (
                previous + (+current.discountPrice || +current.price) * current.quantity
            ), 0)

            // Calculate discount
            let voucher = null;
            if (voucherCode) {
                voucher = await voucherModel.getVoucherByCodeEmail(voucherCode, email);
                if (voucher === null) {
                    return res.status(200).send({
                        exitcode: 101,
                        message: "Voucher not found"
                    })
                }
            }

            const minPrice = voucher?.minimum_price || 0
            if (minPrice > totalPrice) {
                return res.status(200).send({
                    exitcode: 102,
                    message: "Total price does not reach voucher requirement"
                })
            }
            const percentageDiscount = voucher?.percentage_discount || 0
            const maxDiscountPrice = voucher?.maximum_discount_price || 0
            const discountPrice = Math.min(maxDiscountPrice, totalPrice * percentageDiscount)

            // Calculate shipping fee
            const shippingAddress = (shippingAddressId) ? await shippingAddressModel.getShippingAddressById(shippingAddressId) : null;
            const distance = (shippingAddress) ? await getDistance(
                config.SHOP_LONG,
                config.SHOP_LAT,
                shippingAddress.long,
                shippingAddress.lat,
            ) : null
            const shippingPrice = distance ? (
                (distance < 5000) ? (20000) : (30000)
            ) : 0;

            // Calculate final price
            const finalPrice = Math.max(0, totalPrice - discountPrice) + shippingPrice;
            req.body.price = {
                totalPrice: totalPrice,
                discountPrice: discountPrice,
                shippingPrice: shippingPrice,
                finalPrice: finalPrice
            }
            req.body.variants = variants;
            next();
        } catch (err) {
            next(err)
        }
    },

    async getPrice(req, res, next) {
        try {
            const { price } = req.body;
            res.status(200).send({
                exitcode: 0,
                message: "Estimate price successfully",
                totalPrice: price.totalPrice,
                discountPrice: price.discountPrice,
                shippingPrice: price.shippingPrice,
                finalPrice: price.finalPrice
            })
        } catch (err) {
            next(err)
        }
    },

    async checkout(req, res, next) {
        try {
            const { email } = req.payload;
            const {
                price,
                receiverName,
                receiverPhone,
                paymentId,
                shippingAddressId,
                voucherCode,
                variants
            } = req.body;

            // Check for stock 
            const insufficientVariants = variants.filter(item => item.stock < item.quantity)
            if (insufficientVariants.length > 0) {
                return res.status(200).send({
                    exitcode: 103,
                    message: "Do not have enough stock"
                })
            }

            // Check valid shipping address
            if (!shippingAddressId) {
                return res.status(200).send({
                    exitcode: 104,
                    message: "Invalid shipping address ID"
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

            // Verify payment ID
            const payment = await paymentModel.getById(paymentId)
            if (payment === null) {
                return res.status(200).send({
                    exitcode: 105,
                    message: "Invalid payment ID"
                })
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

            // Calculate final price
            const { totalPrice, discountPrice, finalPrice, shippingPrice } = price;
            const exchangedPrice = Math.round(100 * finalPrice * getRate(
                checkoutProvider.getCurrency(), config.currency.VND
            )) / 100;

            // Create orderId and link
            const [orderId, redirectUrl] = await checkoutProvider.createLink(
                exchangedPrice,
                userInfo,
                `${req.headers.origin}`,
                `${req.protocol}://${req.get('host')}`
            );
            console.debug(redirectUrl)

            // Create order
            const basicInfo = {
                receiverName: receiverName,
                receiverPhone: receiverPhone,
                paymentId: paymentId,
                shippingAddressId: shippingAddressId,
                totalPrice: totalPrice,
                finalPrice: finalPrice,
                discountPrice: discountPrice,
                shippingPrice: shippingPrice
            }
            await orderModel.createOrder(email, orderId, basicInfo)
            await orderModel.insertListVariantToOrder(orderId, variants);
            await cartModel.deleteCartByEmail(email);
            if (voucherCode) {
                await voucherModel.useVoucher(email, voucherCode)
            }

            // Change to pending without paying
            if (providerName === config.payment.COD) {
                await orderModel.updateState(orderId, config.orderState.PENDING);
            }

            const mailOption = getOrderEmail(email, orderId, variants, basicInfo);
            await createTransport().sendMail(mailOption);

            // Response
            res.status(200).send({
                exitcode: 0,
                message: "Checkout successfully",
                orderId: orderId,
                redirectUrl: redirectUrl
            })
        } catch (err) {
            next(err)
        }
    },

    async notifyMomo(req, res, next) {
        try {
            const {
                orderId,
                resultCode,
                amount
            } = req.body;

            // Verify signature
            const provider = new MomoCheckoutProvider();
            if (!provider.verifyIpnSignature(req.body)) {
                throw new ErrorHandler(400, "Signature is mismatch");
            }

            // Verify for price
            const order = await orderModel.getOrderById(orderId)
            if (+order.final_price !== amount) {
                throw new ErrorHandler(400, "Amount is mismatch");
            }

            // Check for transaction success
            if (resultCode === 0) {
                await orderModel.updateState(orderId, config.orderState.PENDING);
            } else {
                await orderModel.updateState(orderId, config.orderState.CANCEL);
            }

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

    async notifyPaypal(req, res, next) {
        try {
            const {
                orderId
            } = req.body;
            const provider = new PaypalCheckoutProvider();

            const detailResponse = await provider.getDetail(orderId);
            const { status } = detailResponse
            if (status !== "APPROVED") {
                await orderModel.updateState(orderId, config.orderState.CANCEL);
                return res.status(200).send({
                    exitcode: 101,
                    message: "Payment is not approved"
                })
            }

            const captureResponse = await provider.capturePayment(orderId);
            if (captureResponse.status === "COMPLETED") {
                await orderModel.updateState(orderId, config.orderState.PENDING);
                res.status(200).send({
                    exitcode: 0,
                    message: "Payment has been captured"
                });
            } else {
                await orderModel.updateState(orderId, config.orderState.CANCEL);
                res.status(200).send({
                    exitcode: 102,
                    message: "Payment capture failed"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}