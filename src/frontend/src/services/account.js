import api from 'utils/api';
import huimitu from "api/huimitu";

const account = {
    async googleLogin(token) {
        const data = {
            tokenId: token,
        };
        const response = await api.post("/auth/loginGoogle", data);
        return response
    },

    async login(email, password) {
        const data = { email, password };

        const response = await huimitu.post("/auth/login", data);
        return response
    },

    getLocalToken() {
        return localStorage.getItem("token");
    },

    logout() {
        localStorage.removeItem("token");
    }
}

export default account