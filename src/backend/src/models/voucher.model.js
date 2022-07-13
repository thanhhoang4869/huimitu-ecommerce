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

    async getVoucherByEmail(email) {
        const result = await db('voucher as v1').whereNotIn(
            'v1.voucher_code',
            db('order as o').join(
                'voucher as v2',
                'o.voucher_code',
                'v2.voucher_code'
            ).where({
                "o.email": email
            }).select("v2.voucher_code")
        ).select(
            "voucher_code",
            "percentage_discount",
            "minimum_price",
            "maximum_discount_price",
            "start_date",
            "end_date"
        )
        return result;
    },

    async addVoucher(entity) {
        const {
            voucherCode,
            percentageDiscount,
            minimumPrice,
            maximumDiscountPrice,
            startDate,
            endDate
        } = entity;
        const result = await db('voucher').insert({
            voucher_code: voucherCode,
            percentage_discount: percentageDiscount,
            minimum_price: minimumPrice,
            maximum_discount_price: maximumDiscountPrice,
            start_date: startDate,
            end_date: endDate
        })
        return result;
    }
}