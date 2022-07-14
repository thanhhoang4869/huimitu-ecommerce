import api from "utils/api";

const accountService = {
  async verify(token) {
    const data = { token };
    const response = await api.post("/auth/verify", data);
    return response;
  },

  async addProductToCart(variantId, quantity) {
    const data = { variantId, quantity }
    const respone = await api.post("/cart", data)
    return respone
  },

  async getInformation() {
    const response = await api.get("/account");
    return response;
  }
};

export default accountService;
