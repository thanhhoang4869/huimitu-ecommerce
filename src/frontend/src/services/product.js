import api from "utils/api";

const product = {
  async getBestSellers() {
    const response = await api.post("/product/bestSeller");
    return response;
  },

  async getProductById(id) {
    const response = await api.get(`/product/${id}`);
    return response;
  },
};

export default product;
