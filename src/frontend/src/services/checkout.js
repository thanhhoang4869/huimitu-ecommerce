import api from "utils/api";

const checkout = {

    async confirmPaypal(orderId) {
        const response = await api.post('/checkout/successPaypal',{
            orderId: orderId
        })
        console.log(response)
        return response;
    },

    async checkoutBuyNow(data) {
        const {
            variantId, 
            quantity, 
            paymentId, 
            shippingAddressId, 
            shippingProviderId, 
            voucherCode
        } = data;
        const requestBody = {
            variantId,
            quantity,
            paymentId,
            shippingAddressId,
            shippingProviderId,
            voucherCode
        }
        console.log(requestBody)
        const response = await api.post('/checkout/buyNow', requestBody);
        return response
    },

    async checkoutCart() {
        const response = await api.post("/checkout/cart");
        return response;
    },
};

export default checkout;
