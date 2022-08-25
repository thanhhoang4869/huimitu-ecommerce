import axios from "axios";
import config from "config/config";
import storageService from "services/storage";
import swal from "sweetalert2";

const api = axios.create({
  baseURL: config.SERVER_PATH,
});

api.interceptors.request.use(async (currentConfig) => {
  const customHeaders = {};

  const accessToken = storageService.getAccessToken();
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
        await swal.fire({
          title: "Thông báo",
          text: "Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại",
          icon: "info",
          confirmButtonText: "OK"

        })
        localStorage.removeItem(config.storageKeys.ACCESS_KEY);
        window.location.assign(`/login`);
      }
    }
  }
)

export default api;
