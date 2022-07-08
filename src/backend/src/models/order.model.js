import db from '#src/utils/db'

export default {
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