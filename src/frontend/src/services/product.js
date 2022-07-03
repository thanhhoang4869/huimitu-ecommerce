import api from "utils/api";

const product = {
  async getBestSellers() {
    const response = await api.post("/product/bestSeller");
    return response;
  },
};

export default product;
