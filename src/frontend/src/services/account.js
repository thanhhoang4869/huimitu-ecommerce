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
  },

  async updateInformation(data) {
    const requestBody = {
      phone: data.phone,
      birthday: data.birthday,
      gender: data.gender,
      fullname: data.fullname
    }
    const response = await api.patch('/account', requestBody)
    return response
  },

  async changePassword(password, newPassword, confirmPassword) {
    const requestBody = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }
    const response = await api.patch('/account/password', requestBody);
    return response
  },

  async uploadAvatar(file) {
    const form = new FormData();
    form.append("avatar", file)
    const response = await api.patch('/account/avatar', form)
    return response;
  }
};

export default accountService;
