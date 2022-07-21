import orderModel from '#src/models/order.model'
import variantModel from '#src/models/variant.model'
import productModel from '#src/models/product.model'
import moment from 'moment'

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
                payment_name,
                provider,
                district_name,
                ward_name,
                total_price,
                discount_price,
                final_price,
                shipping_price,
                voucher_code,
                receiver_name,
                receiver_phone,
                reviewed
            } = result

            const variantsResult = await variantModel.getByOrderId(orderId);
            const promises = variantsResult.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.product_id)

                return {
                    id: item.id,
                    variantName: item.variant_name,
                    price: item.variant_price,
                    quantity: item.quantity,
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
                    paymentName: payment_name,
                    provinceName: provider,
                    districtName: district_name,
                    wardName: ward_name,
                    totalPrice: total,
                    totalPrice: total_price,
                    discountPrice: discount_price,
                    shippingPrice: shipping_price,
                    finalPrice: final_price,
                    voucherCode: voucher_code,
                    receiverName: receiver_name,
                    receiverPhone: receiver_phone,
                    reviewed: reviewed,
                    variants: variants
                }
            })
        } catch (err) {
            next(err)
        }
    },

    async getListOrder(req, res, next) {
        try {
            const { email } = req.payload;
            const { limit, offset } = req.body;
            const orderResult = await orderModel.getListOrder(email, limit, offset);

            const ordersPromise = orderResult.map(async (orderItem) => {

                const variantsResult = await variantModel.getByOrderId(orderItem.id);
                const promises = variantsResult.map(async (variantItem) => {
                    const imagePath = await productModel.getSingleImageById(variantItem.product_id)

                    return {
                        id: variantItem.id,
                        variantName: variantItem.variant_name,
                        price: variantItem.variant_price,
                        quantity: variantItem.quantity,
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
                    totalPrice: orderItem.total,
                    totalPrice: orderItem.total_price,
                    discountPrice: orderItem.discount_price,
                    shippingPrice: orderItem.shipping_price,
                    finalPrice: orderItem.final_price,
                    voucherCode: orderItem.voucher_code,
                    receiverName: orderItem.receiver_name,
                    receiverPhone: orderItem.receiver_phone,
                    reviewed: orderItem.reviewed,
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

    async getCountOrder(req, res, next) {
        try {
            const { email } = req.payload;
            const result = await orderModel.getCountOrder(email);
            res.status(200).send({
                exitcode: 0,
                message: "Get count of orders successfully",
                count: result
            })
        } catch (err) {
            next(err)
        }
    },

    async updateOrderState(req, res, next) {
        
    }
}