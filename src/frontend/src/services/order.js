import api from "utils/api";

const orderService = {

    async getById(orderId) {
        const response = await api.get(`/order/${orderId}`);
        return response
    },

    async updateState(orderId, state) {
        const response = await api.patch(`/order/${orderId}`, {
            state: state
        })
        return response;
    },

    async getOrderList(query) {
        const params = {
            email: query?.email,
            orderState: query?.orderState,
            limit: query?.limit,
            offset: query?.offset
        }
        const response = await api.get("/order", { params });
        return response;
    },

    async getTotalOrder(query) {
        const params = {
            email: query?.email,
            orderState: query?.orderState,
            getTotal: true
        }
        const response = await api.get('/order', { params });
        return response;
    }

};

export default orderService;
