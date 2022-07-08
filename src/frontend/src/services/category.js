import api from "utils/api";

const category = {
  async getCategoryList() {
    const response = await api.get("/category");
    return response;
  },
};

export default category;
