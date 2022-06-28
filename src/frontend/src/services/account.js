import api from '../utils/api'

const account = {
    async googleLogin(token) {
        const data = {
            tokenId: token,
        };
        const response = await api.post("/auth/loginGoogle", data);
        return response
    }
}

export default account