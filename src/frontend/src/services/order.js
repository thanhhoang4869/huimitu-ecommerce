import api from "utils/api";

const orderService = {

    async updateState(orderId, state) {
        const response = await api.patch(`/order/${orderId}`, {
            state: state
        })
        return response;
    },

};

export default orderService;
