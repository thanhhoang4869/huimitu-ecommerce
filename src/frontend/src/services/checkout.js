import api from "utils/api";

const checkoutService = {

    async notifyPaypal(orderId) {
        const response = await api.post('/checkout/notifyPaypal', {
            orderId: orderId
        })
        return response;
    },

    async checkout(data) {
        const {
            receiverName,
            receiverPhone,
            variantId,
            quantity,
            orderId,
            paymentId,
            shippingAddressId,
            voucherCode
        } = data;
        const requestBody = {
            receiverName,
            receiverPhone,
            variantId,
            quantity,
            orderId,
            paymentId,
            shippingAddressId,
            voucherCode
        }
        const response = await api.post('/checkout', requestBody);
        return response
    },

    async getPrice({ shippingAddressId, orderId, voucherCode, variantId, quantity }) {
        const requestBody = {
            shippingAddressId,
            variantId,
            quantity,
            orderId,
            voucherCode
        }
        const response = await api.post('/checkout/price', requestBody)
        return response
    }
};

export default checkoutService;
