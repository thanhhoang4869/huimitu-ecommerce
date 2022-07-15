import axios from "axios";
import config from "config/config";
import tokenService from "services/token";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (currentConfig) => {
  const customHeaders = {};

  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    customHeaders['x-access-token'] = accessToken;
  }

  return {
    ...currentConfig,
    headers: {
      ...customHeaders, // Attach token
      ...currentConfig.headers, // The remain data
    },
  };
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && originalConfig.url !== "/auth/loginGoogle" && err.response) {
      if (err.response.status === 401) {
        localStorage.removeItem(config.storageKeys.ACCESS_KEY);
        window.location.assign(`/login`);
      }
    }
  }
)

export default api;
