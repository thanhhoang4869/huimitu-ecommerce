import api from "utils/api";

const orderService = {

    async updateState(orderId, state) {
        const response = await api.patch(`/order/${orderId}`, {
            state: state
        })
        return response;
    },

    async getOrderList(limit, offset) {
        const requestBody = {
            limit: limit,
            offset: offset
        }
        const response = await api.post("/order/", requestBody);
        return response;
    },

    async getTotalOrder() {
        const response = await api.get('/order/');
        return response;
    }

};

export default orderService;
