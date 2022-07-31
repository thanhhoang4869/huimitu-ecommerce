import db from '#src/utils/db'
import { removeUndefined } from '#src/utils/utils'

export default {
    async getOrderById(orderId) {
        const result = await db('order').where({
            'order.id': orderId,
        })
            .join('shipping_address', 'order.shipping_address_id', 'shipping_address.id')
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
                "payment.provider",
                "province_name",
                "district_name",
                "ward_name",
                "total_price",
                "discount_price",
                "shipping_price",
                "final_price",
                "shipping_price",
                "receiver_name",
                "receiver_phone",
            )
            .orderBy('order_state.created_time', 'desc')
            .limit(1)
        return result[0] || null;
    },

    async getCountOrder({ email, orderState }) {
        const query = removeUndefined({
            'email': email,
            'state': orderState
        })
        const orderWithState = db('order')
            .join('order_state', 'order_state.order_id', 'order.id')
            .select('email', 'id', 'state')
            .distinctOn('email', 'id')
            .orderBy(['id', 'email', 'order_state.created_time'].map((item) => ({
                column: item,
                order: 'desc'
            }))).as('orderWithState')
        const result = await db.from(orderWithState).where(query).count();
        return result[0]?.count || null;
    },

    async getListOrder({ email, orderState, limit, offset }) {
        const query = removeUndefined({
            'order.email': email,
            'order_state.state': orderState
        })
        const distinctCols = [
            "order.created_time",
            "order.id",
            "payment.provider",
            "province_name",
            "district_name",
            "ward_name",
            "total_price",
            "discount_price",
            "shipping_price",
            "final_price",
            "receiver_name",
            "receiver_phone",
        ]
        const selectCols = [
            ...distinctCols,
            'order_state.state'
        ]
        const result = await db('order')
            .join('shipping_address', 'order.shipping_address_id', 'shipping_address.id')
            .join('province', 'shipping_address.province_id', 'province.id')
            .join('district', 'shipping_address.district_id', 'district.id')
            .join('ward', 'shipping_address.ward_id', 'ward.id')
            .join('payment', 'order.payment_id', 'payment.id')
            .join('order_state', 'order_state.order_id', 'order.id')
            .select(selectCols)
            .distinctOn(distinctCols)
            .orderBy([...distinctCols, 'order_state.created_time'].map((item) => ({
                column: item,
                order: 'desc'
            }))).where(query)
            .limit(limit).offset(offset)
        return result || null;
    },


    async createOrder(email, orderId, entity) {
        const {
            paymentId,
            shippingAddressId,
            totalPrice,
            discountPrice,
            finalPrice,
            shippingPrice,
            receiverName,
            receiverPhone
        } = entity
        const insertOrder = {
            id: orderId,
            email: email,
            payment_id: paymentId,
            shipping_address_id: shippingAddressId,
            total_price: totalPrice,
            discount_price: discountPrice,
            final_price: finalPrice,
            shipping_price: shippingPrice,
            receiver_name: receiverName,
            receiver_phone: receiverPhone
        }
        const order = await db('order').insert(insertOrder).returning('id')

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
            variant_id: item.id,
            variant_price: item.discountPrice || item.variantPrice,
            quantity: item.quantity,
        }))
        const result = await db('order_variant').insert(listEntity)
        return result;
    }
}