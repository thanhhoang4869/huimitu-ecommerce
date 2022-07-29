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

    async getOrderList({ email, orderState, limit, offset }) {
        const params = {
            email,
            orderState,
            limit,
            offset
        }
        const response = await api.get("/order", { params });
        return response;
    },

    async getTotalOrder({ email, orderState }) {
        const params = {
            email,
            orderState,
            getTotal: true
        }
        const response = await api.get('/order', { params });
        return response;
    }

};

export default orderService;
