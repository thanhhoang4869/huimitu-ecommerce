import orderModel from '#src/models/order.model'
import variantModel from '#src/models/variant.model'
import productModel from '#src/models/product.model'
import accountModel from '#src/models/account.model'
import moment from 'moment'
import config from '#src/config/config'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'

export default {
    async getOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const { email } = req.payload;
            const result = await orderModel.getOrderById(orderId);

            if (result === null || result.email != email) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Order not found"
                })
            }

            const {
                id,
                created_time,
                state,
                provider,
                province_name,
                district_name,
                ward_name,
                total_price,
                discount_price,
                final_price,
                shipping_price,
                receiver_name,
                receiver_phone,
            } = result

            const variantsResult = await variantModel.getByOrderId({ orderId });
            const promises = variantsResult.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.product_id)

                return {
                    id: item.id,
                    variantName: item.variant_name,
                    discount_price: item.discount_price,
                    price: item.price,
                    variant_price: item.variant_price,
                    quantity: item.quantity,
                    reviewed: item.reviewed,
                    image: imagePath
                }
            });
            const variants = await Promise.all(promises);

            res.status(200).send({
                exitcode: 0,
                message: "Get order successfully",
                order: {
                    id: id,
                    createdTime: moment(created_time).format('DD/MM/YYYY HH:mm:ss'),
                    state: state,
                    paymentName: provider,
                    provinceName: province_name,
                    districtName: district_name,
                    wardName: ward_name,
                    totalPrice: total_price,
                    discountPrice: discount_price,
                    shippingPrice: shipping_price,
                    finalPrice: final_price,
                    receiverName: receiver_name,
                    receiverPhone: receiver_phone,
                    variants: variants
                }
            })
        } catch (err) {
            next(err)
        }
    },

    async getList(req, res, next) {
        try {
            const {
                getTotal,
                orderState,
                limit,
                offset
            } = req.query;
            const userEmail = req.payload.email;

            let email = req.query.email;
            const account = await accountModel.getByEmail(userEmail);
            if (account?.role !== config.role.ADMIN) {
                email = userEmail;
            }

            if (getTotal) {
                const result = await orderModel.getCountOrder({
                    orderState,
                    email
                });
                return res.status(200).send({
                    exitcode: 0,
                    message: "Get count of orders successfully",
                    count: result
                })
            }

            const orderResult = await orderModel.getListOrder({ email, orderState, limit, offset });
            const ordersPromise = orderResult.map(async (orderItem) => {

                const variantsResult = await variantModel.getByOrderId({ orderId: orderItem.id });
                const promises = variantsResult.map(async (variantItem) => {
                    const imagePath = await productModel.getSingleImageById(variantItem.product_id)

                    return {
                        id: variantItem.id,
                        productId: variantItem.product_id,
                        variantName: variantItem.variant_name,
                        variantPrice: variantItem.variant_price,
                        discountPrice: variantItem.discount_price,
                        price: variantItem.price,
                        quantity: variantItem.quantity,
                        reviewed: variantItem.reviewed,
                        image: imagePath
                    }
                });
                const variants = await Promise.all(promises);

                return {
                    id: orderItem.id,
                    createdTime: moment(orderItem.created_time).format('DD/MM/YYYY HH:mm:ss'),
                    state: orderItem.state,
                    paymentName: orderItem.provider,
                    provinceName: orderItem.province_name,
                    districtName: orderItem.district_name,
                    wardName: orderItem.ward_name,
                    totalPrice: orderItem.total_price,
                    discountPrice: orderItem.discount_price,
                    shippingPrice: orderItem.shipping_price,
                    finalPrice: orderItem.final_price,
                    receiverName: orderItem.receiver_name,
                    receiverPhone: orderItem.receiver_phone,
                    variants: variants
                }
            })
            const orders = await Promise.all(ordersPromise)

            res.status(200).send({
                exitcode: 0,
                message: "Get list of order successfully",
                orders: orders,
            })
        } catch (err) {
            next(err)
        }
    },

    async updateState(req, res, next) {
        try {
            const { email } = req.payload;
            const { state } = req.body;
            const { orderId } = req.params;

            const account = await accountModel.getByEmail(email);
            const { role } = account;

            const order = await orderModel.getOrderById(orderId);
            if (!order) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Order not found"
                })
            }

            let success = false;
            switch (state) {
                // Pending to shipping (admin only)
                case (config.orderState.SHIPPING): {
                    if (role !== config.role.ADMIN) {
                        throw new ErrorHandler(403, "Only admin can do this operation")
                    }
                    if (order.state !== config.orderState.PENDING) {
                        return res.status(200).send({
                            exitcode: 102,
                            message: "Order can only change to shipping during pending state"
                        })
                    }

                    // Check for stock
                    const variants = await variantModel.getByOrderId({orderId});
                    const insufficientVariants = variants.filter(item => item.stock < item.quantity)
                    if (insufficientVariants.length > 0) {
                        return res.status(200).send({
                            exitcode: 103,
                            message: "Do not have enough stock"
                        })
                    }

                    // Update quantity
                    for (const idx in variants) {
                        const variant = variants[idx]
                        await variantModel.updateVariant(variant.id, {
                            stock: variant.stock - variant.quantity
                        });
                    }

                    await orderModel.updateState(orderId, config.orderState.SHIPPING)
                    success = true;
                    break;
                }
                // Pending to cancel (owner only)
                case (config.orderState.CANCEL): {
                    if (order.email !== email && role !== config.role.ADMIN) {
                        throw new ErrorHandler(403, "Only order owner or admin can do this operation")
                    }
                    if (order.state !== config.orderState.PENDING) {
                        return res.status(200).send({
                            exitcode: 104,
                            message: "Order can only be cancelled during pending state"
                        })
                    }
                    await orderModel.updateState(orderId, config.orderState.CANCEL)
                    success = true;
                    break;
                }
                // Shipping to success (owner only)
                case (config.orderState.SUCCESS): {
                    if (order.email !== email) {
                        throw new ErrorHandler(403, "Only order owner can do this operation")
                    }
                    if (order.state !== config.orderState.SHIPPING) {
                        return res.status(200).send({
                            exitcode: 105,
                            message: "Order can only be cancelled during pending state"
                        })
                    }
                    await orderModel.updateState(orderId, config.orderState.SUCCESS)
                    success = true;
                    break;
                }
                // Shipping to refunding (owner only)
                case (config.orderState.REFUNDING): {
                    if (order.email !== email) {
                        throw new ErrorHandler(403, "Only order owner can do this operation")
                    }
                    if (order.state !== config.orderState.SHIPPING) {
                        return res.status(200).send({
                            exitcode: 105,
                            message: "Order can only be refunded during shipping state"
                        })
                    }
                    await orderModel.updateState(orderId, config.orderState.REFUNDING)
                    success = true;
                    break;
                }
                // Refunding to refunded (admin only)
                case (config.orderState.REFUNDED): {
                    if (role !== config.role.ADMIN) {
                        throw new ErrorHandler(403, "Only admin can do this operation")
                    }
                    if (order.state !== config.orderState.REFUNDING) {
                        return res.status(200).send({
                            exitcode: 106,
                            message: "Order can only be refunded during refunding state"
                        })
                    }

                    // Update quantity
                    const variants = await variantModel.getByOrderId({orderId});
                    for (const idx in variants) {
                        const variant = variants[idx]
                        await variantModel.updateVariant(variant.id, {
                            stock: variant.stock + variant.quantity
                        });
                    }

                    // Update order state
                    await orderModel.updateState(orderId, config.orderState.REFUNDED)
                    success = true;
                    break;
                }
            }

            if (success) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Update order state successfully"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}