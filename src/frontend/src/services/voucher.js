import api from "utils/api";

const voucherService = {
    async getVouchers() {
        const response = api.get(`/voucher`)
        return response
    },

    async getVoucherByCode(voucherCode) {
        const response = api.get(`/voucher/${voucherCode}`)
        return response
    },

    async createVoucher(voucher) {
        const response = api.post(`/voucher`, voucher)
        return response
    }
}

export default voucherService;