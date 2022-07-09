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
            "voucher_code"
        )
        return result[0] || null;
    }

    async createOrder(email, orderId, entity) {
        const {
            paymentId,
            shippingAddressId,
            shippingProviderId,
            voucherId
        } = entity

        const order = await db('order').insert({
            id: orderId,
            email: email,
            payment_id: paymentId,
            shipping_address_id: shippingAddressId,
            shippingProviderId: shippingProviderId,
            voucherId: voucherId
        }).returning('id')

        try {
            return order[0].id;
        } catch (err) {
            return null;
        }
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