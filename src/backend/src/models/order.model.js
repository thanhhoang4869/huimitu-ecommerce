import db from '#src/utils/db'

export default {
    async getOrderById(orderId) {
        const result = await db('order').where({
            'order.id': orderId,
        })
            .join('shipping_address', 'order.shipping_address_id', 'shipping_address.id')
            .join('shipping_provider', 'order.shipping_provider_id', 'shipping_provider.id')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .join('payment', 'order.payment_id', 'payment.id')
            .join('order_state', 'order_state.order_id', 'order.id')
            .select(
                'order.id',
                "order.email",
                "order.created_time",
                'order_state.state',
                "payment.provider AS payment_name",
                "province_name",
                "district_name",
                "ward_name",
                "total",
                "shipping_provider_name",
                "shipping_price",
                "voucher_code",
                "receiver_name",
                "receiver_phone"
            )
            .orderBy('order_state.created_time', 'desc')
            .limit(1)
        return result[0] || null;
    },

    async getCountOrder(email) {
        const result = await db('order').where({
            email: email
        }).count();
        try {
            return result[0].count;
        } catch (err) {
            return null;
        }
    },

    async getListOrder(email, limit, offset) {
        const distinctCols = [
            "order.id",
            "order.created_time",
            "payment.provider",
            "province_name",
            "district_name",
            "ward_name",
            "total",
            "shipping_provider_name",
            "shipping_price",
            "voucher_code",
            "receiver_name",
            "receiver_phone",
        ]
        const selectCols = [
            ...distinctCols,
            'order_state.state'
        ]
        const result = await db('order').where({
            'order.email': email
        })
            .join('shipping_address', 'order.shipping_address_id', 'shipping_address.id')
            .join('shipping_provider', 'order.shipping_provider_id', 'shipping_provider.id')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .join('payment', 'order.payment_id', 'payment.id')
            .join('order_state', 'order_state.order_id', 'order.id')
            .select(selectCols)
            .distinctOn(distinctCols)
            .orderBy([...selectCols, 'order_state.created_time'].map((item) => ({
                column: item,
                order: 'desc'
            })))
            .limit(limit).offset(offset)
        return result || null;
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