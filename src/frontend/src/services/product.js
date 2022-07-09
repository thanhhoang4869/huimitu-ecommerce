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

  async getProductReviews(productId) {
    const respone = await api.post("/review", {productId})
    return respone
  }
};

export default product;
