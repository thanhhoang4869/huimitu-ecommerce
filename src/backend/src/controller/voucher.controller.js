import voucherModel from '#src/models/voucher.model'
import moment from 'moment'

export default {
    async getVoucher(req, res, next) {
        try {
            const result = await voucherModel.getAllVoucher();
            const vouchers = result.map(item => ({
                voucherCode: item.voucher_code,
                percentageDiscount: item.percentage_discount,
                minimumPrice: item.minimum_price,
                maximumDiscountPrice: item.maximum_discount_price,
                startDate: moment(new Date(item.start_date)).format('DD/MM/YYYY'),
                endDate: moment(new Date(item.end_date)).format('DD/MM/YYYY'),
                maximumUsage: item.maximum_usage,
                currentUsage: item.current_usage,
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

    async getVoucherByCode(req, res, next) {
        try {
            const { email } = req.payload;
            const { voucherCode } = req.params;
            const result = await voucherModel.getVoucherByCodeEmail(voucherCode, email);
            if (result === null) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Voucher not found"
                })
            }
            const voucher = {
                voucherCode: result.voucher_code,
                percentageDiscount: result.percentage_discount,
                minimumPrice: result.minimum_price,
                maximumDiscountPrice: result.maximum_discount_price,
                startDate: moment(new Date(result.start_date)).format('DD/MM/YYYY'),
                endDate: moment(new Date(result.end_date)).format('DD/MM/YYYY')
            }
            res.status(200).send({
                exitcode: 0,
                message: "Get vouchers successfully",
                voucher: voucher
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
                endDate,
                maximumUsage,
            } = req.body;
            const resultFind = await voucherModel.getVoucherByCode(voucherCode);
            if (resultFind !== null) {
                return res.send({
                    exitcode: 101,
                    message: "Voucher code existed"
                })
            }
            await voucherModel.addVoucher({
                voucherCode,
                percentageDiscount,
                minimumPrice,
                maximumDiscountPrice,
                startDate: moment(startDate || new Date(), 'DD/MM/YYYY').toDate(),
                endDate: moment(endDate, 'DD/MM/YYYY').toDate(),
                maximumUsage,
            })
            res.send({
                exitcode: 0,
                message: "Add voucher successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async deleteVoucherByCode(req, res, next) {
        try {
            const {
                voucherCode
            } = req.params;
            const result = await voucherModel.deleteVoucher(voucherCode)
            console.log(result)
            if (result > 0) {
                return res.send({
                    exitcode: 0,
                    message: "Delete voucher successfully"
                })
            }
            res.send({
                exitcode: 101,
                message: "Voucher not found"
            })
        } catch (err) {
            next(err)
        }
    }
} 