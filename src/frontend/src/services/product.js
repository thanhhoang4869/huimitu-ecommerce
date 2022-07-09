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
    const respone = await api.post("/review/getReview", { productId });
    return respone;
  },

  async getProductsByCategory(request) {
    const response = await api.post("/product/getByCategory", request);
    return response;
  },

  async countByCategory(categoryId) {
    const response = await api.post("/product/countByCategory", { categoryId });
    return response;
  },
};

export default product;
