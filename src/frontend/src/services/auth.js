import api from "utils/api";

const authService = {
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

  async signup(entity) {
    const response = await api.post("/auth/signup", entity);
    return response;
  },
}

export default authService;