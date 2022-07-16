import api from "utils/api";

const shippingAddress = {
    async getListShippingAddress() {
        const response = await api.get("/shippingAddress");
        return response;
    },

    async deleteShippingAddress(shippingAddressId) {
        const response = await api.delete(`/shippingAddress/${shippingAddressId}`);
        return response;
    },

    async addShippingAddress(address, wardId, districtId, provinceId, lat, long) {
        const requestBody = {
            address: address,
            wardId: wardId,
            districtId: districtId,
            provinceId: provinceId,
            lat: lat,
            long: long
        }
        console.log(requestBody)
        const response = await api.post('/shippingAddress', requestBody);
        return response
    }
};

export default shippingAddress;
