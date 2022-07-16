import db from '#src/utils/db'

export default {
    async getOrderById(orderId) {
        const result = await db('order').where({
            id: orderId
        }).select(
            "email",
            "created_time",
            "payment_id",
            "shipping_address_id",
            "total",
            "shipping_provider_id",
            "shipping_price",
            "voucher_code",
            "receiver_name",
            "receiver_phone"
        )
        return result[0] || null;
    },

    async createOrder(email, orderId, entity) {
        const {
            paymentId,
            shippingAddressId,
            shippingProviderId,
            voucherCode,
            total,
            shippingPrice,
            receiverName,
            receiverPhone
        } = entity

        const order = await db('order').insert({
            id: orderId,
            email: email,
            payment_id: paymentId,
            shipping_address_id: shippingAddressId,
            shipping_provider_id: shippingProviderId,
            voucher_code: voucherCode,
            total: total,
            shipping_price: shippingPrice,
            receiver_name: receiverName,
            reciever_phone: receiverPhone
        }).returning('id')

        try {
            return order[0].id;
        } catch (err) {
            return null;
        }
    },

    async updateState(orderId, orderState) {
        const result = await db('order_state').insert({
            order_id: orderId,
            state: orderState
        })
        return result;
    },

    async insertListVariantToOrder(orderId, listVariant) {
        const listEntity = listVariant.map(item => ({
            order_id: orderId,
            variant_id: item.variantId,
            variant_price: item.variantPrice,
            quantity: item.quantity,
        }))
        const result = await db('order_variant').insert(listEntity)
        return result;
    },

    async createOrderByCart(orderId, cartId) {

    }
}