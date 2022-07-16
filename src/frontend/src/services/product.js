import api from "utils/api";

const product = {
  async getBestSellers() {
    const response = await api.get("/product/bestSeller");
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

  async countByCategory(request) {
    const response = await api.post("/product/countByCategory", request);
    return response;
  },

  async getProductsBySearchQuery(request) {
    const response = await api.post("/search/get", request);
    return response;
  },

  async countBysearchQuery(request) {
    const response = await api.post("/search/count", request);
    return response;
  },

  async getNewArrivals() {
    const response = await api.get("/product/newestArrival");
    return response;
  },

  async getRelatedProducts(productId) {
    const response = await api.get(`/product/related/${productId}`)
    return response;
  }
};

export default product;
