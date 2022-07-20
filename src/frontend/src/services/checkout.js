import api from "utils/api";

const checkoutService = {

    async confirmPaypal(orderId) {
        const response = await api.post('/checkout/successPaypal', {
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
            paymentId,
            shippingAddressId,
            voucherCode
        } = data;
        const requestBody = {
            receiverName,
            receiverPhone,
            variantId,
            quantity,
            paymentId,
            shippingAddressId,
            voucherCode
        }
        const response = await api.post('/checkout', requestBody);
        return response
    },

    async getPrice(shippingAddressId, voucherCode, variantId, quantity) {
        const requestBody = {
            shippingAddressId,
            variantId,
            quantity,
            voucherCode
        }
        const response = await api.post('/checkout/price', requestBody)
        return response
    }
};

export default checkoutService;
