import api from "utils/api";

const shippingAddress = {
    async getListShippingAddress() {
        const response = await api.get("/shippingAddress");
        return response;
    },

    async deleteShippingAddress(shippingAddressId) {
        const response = await api.delete(`/shippingAddress/${shippingAddressId}`);
        return response;
    }
};

export default shippingAddress;
