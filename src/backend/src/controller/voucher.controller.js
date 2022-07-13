import voucherModel from '#src/models/voucher.model'

export default {
    async getVoucher(req, res, next) {
        try {
            const { email } = req.payload;
            const result = await voucherModel.getVoucherByEmail(email);
            const vouchers = result.map(item => ({
                voucherCode: item.voucher_code,
                percentageDiscount: item.percentage_discount,
                minimumPrice: item.minimum_price,
                maximumDiscountPrice: item.maximum_discount_price,
                startDate: new Date(item.start_date).toLocaleDateString(),
                endDate: new Date(item.end_date).toLocaleDateString(),
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get vouchers successfully",
                vouchers: vouchers
            })
        } catch (err) {
            next(err)
        }
    },

    async addVoucher(req, res, next) {
        try {
            const {
                voucherCode,
                percentageDiscount,
                minimumPrice,
                maximumDiscountPrice,
                startDate,
                endDate
            } = req.body;
            const resultFind = await voucherModel.getVoucherByCode(voucherCode);
            if (resultFind !== null) {
                return res.send({
                    exitcode: 101,
                    message: "Voucher code existed"
                })
            }
            const resultAdd = await voucherModel.addVoucher({
                voucherCode,
                percentageDiscount,
                minimumPrice,
                maximumDiscountPrice,
                startDate,
                endDate
            })
            res.send({
                exitcode: 0,
                message: "Add voucher successfully"
            })
        } catch (err) {
            next(err)
        }
    }
} 