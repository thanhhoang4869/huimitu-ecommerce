import api from "utils/api";

const voucherService = {
    async getVoucherByCode(voucherCode) {
        const response = api.get(`/voucher/${voucherCode}`)
        return response
    }
}

export default voucherService;