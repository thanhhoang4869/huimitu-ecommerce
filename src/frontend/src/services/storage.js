import config from "config/config";

const { storageKeys } = config

const storageService = {
    setAccessToken(token) {
        localStorage.setItem(storageKeys.ACCESS_KEY, token)
    },

    getAccessToken() {
        return localStorage.getItem(storageKeys.ACCESS_KEY);
    },

    removeAccessToken() {
        localStorage.removeItem(storageKeys.ACCESS_KEY);
    },
}

export default storageService;