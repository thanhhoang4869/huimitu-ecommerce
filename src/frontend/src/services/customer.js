import api from "utils/api";

const customer = {
  async getOrderList() {
    const response = await api.post("/order");
    return response;
  }
};

export default customer;
