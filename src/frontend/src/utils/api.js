import axios from "axios";
import config from "config/config";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (currentConfig) => {
  const customHeaders = {};

  const accessToken = localStorage.getItem(config.storageKeys.ACCESS_TOKEN);
  if (accessToken) {
    customHeaders.Authorization = accessToken;
  }

  return {
    ...currentConfig,
    headers: {
      ...customHeaders, // Attach token
      ...currentConfig.headers, // The remain data
    },
  };
});

export default api;
