import api from "utils/api";

const voucherService = {
  async getVouchers() {
    const response = api.get(`/voucher`);
    return response;
  },

  async getVoucherByCode(voucherCode) {
    const response = api.get(`/voucher/${voucherCode}`);
    return response;
  },

  async createVoucher(voucher) {
    const response = api.post(`/voucher`, voucher);
    return response;
  },

  async deleteVoucher(voucherCode) {
    console.log(voucherCode);
    const response = api.delete(`/voucher/${voucherCode}`);
    return response;
  },
};

export default voucherService;
