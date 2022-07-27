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

  async getProducts(request) {
    const response = await api.post("/product/get", request);
    return response;
  },

  async countProducts(request) {
    const response = await api.post("/product/count", request);
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
    const response = await api.get(`/product/related/${productId}`);
    return response;
  },

  async createProduct(data) {
    const response = await api.post("/product", data);
    return response;
  },

  async updateProduct(data, description, selectedImages) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    formData.append("description", description);
    selectedImages.forEach((img) => {
      formData.append("productImg", img);
    });

    const response = await api.patch(`/product/${data.id}`, formData);
    return response;
  },
};

export default product;
