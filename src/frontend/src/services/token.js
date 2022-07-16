import config from "config/config";

const tokenService = {
    setAccessToken(token) {
        localStorage.setItem(config.storageKeys.ACCESS_KEY, token)
    },

    getAccessToken() {
        return localStorage.getItem(config.storageKeys.ACCESS_KEY);
    },

    removeAccessToken() {
        localStorage.removeItem(config.storageKeys.ACCESS_KEY);
    }
}

export default tokenService;