import db from '#src/utils/db'

export default {
    async getVoucherByCode(voucherCode) {
        const result = await db('voucher').where({
            voucher_code: voucherCode
        }).select(
            "voucher_code",
            "percentage_discount",
            "minimum_price",
            "maximum_discount_price",
            "start_date",
            "end_date"
        )
        return result[0] || null;
    },

}