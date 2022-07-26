import db from '#src/utils/db'

export default {

    // For checkout only
    async getVoucherByCodeEmail(voucherCode, email) {
        const result = await db('voucher as v1').whereNotIn(
            'v1.voucher_code',
            db('voucher_user as v2').where({
                "v2.email": email
            }).select("v2.voucher_code")
        ).where({
            'voucher_code': voucherCode
        }).where(
            'start_date', '<=', 'now()'
        ).where(
            "end_date", ">=", 'now()'
        ).where(
            "current_usage", "<", db.raw("maximum_usage")
        ).select(
            "voucher_code",
            "percentage_discount",
            "minimum_price",
            "maximum_discount_price",
            "start_date",
            "end_date",
            "maximum_usage",
            "current_usage"
        )
        return result[0] || null;
    },

    async getVoucherByCode(voucherCode) {
        const result = await db('voucher').where({
            'voucher_code': voucherCode
        }).select(
            "voucher_code",
            "percentage_discount",
            "minimum_price",
            "maximum_discount_price",
            "start_date",
            "end_date",
            "maximum_usage",
            "current_usage"
        )
        return result[0] || null;
    },

    async addVoucher(entity) {
        const {
            voucherCode,
            percentageDiscount,
            minimumPrice,
            maximumDiscountPrice,
            startDate,
            endDate,
            maximumUsage,
        } = entity;
        const result = await db('voucher').insert({
            'voucher_code': voucherCode,
            'percentage_discount': percentageDiscount,
            'minimum_price': minimumPrice,
            "maximum_discount_price": maximumDiscountPrice,
            "start_date": startDate,
            'end_date': endDate,
            "maximum_usage": maximumUsage,
        })
        return result;
    },

    async getAllVoucher() {
        const result = await db('voucher').select(
            "voucher_code",
            "percentage_discount",
            "minimum_price",
            "maximum_discount_price",
            "start_date",
            "end_date",
            "maximum_usage",
            "current_usage"
        )
        return result || null;
    },

    async useVoucher(email, voucherCode) {
        const result = await db('voucher_user').insert({
            email: email,
            voucher_code: voucherCode
        })
        return result;
    },

    async deleteVoucher(voucherCode) {
        const result = await db('voucher').where({
            voucher_code: voucherCode
        }).delete()
        return result;
    }
}