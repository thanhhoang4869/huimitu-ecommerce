import api from "utils/api";

const account = {
  async googleLogin(token) {
    const data = {
      tokenId: token,
    };
    const response = await api.post("/auth/loginGoogle", data);
    return response;
  },

  async login(email, password) {
    const data = { email, password };

    const response = await api.post("/auth/login", data);
    return response;
  },

  async verify(token) {
    const data = { token };
    const response = await api.post("/auth/verify", data);
    return response;
  },

  getLocalToken() {
    return localStorage.getItem("token");
  },

  logout() {
    localStorage.removeItem("token");
  },

  async signup(entity) {
    const response = await api.post("/auth/signup", entity);
    return response;
  },

  async addProductToCart(variantId, quantity) {
    const data = {variantId, quantity}
    const respone = await api.post("/cart", data,)
    return respone
  }
};

export default account;
