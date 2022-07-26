import voucher from '#src/controller/voucher.controller'
import express from 'express'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'

const router = express.Router();

router.route('/')
    .get(voucher.getVoucher)
    .post(voucher.addVoucher)

router.route('/:voucherCode')
    .get(voucher.getVoucherByCode)
    .delete(voucher.deleteVoucherByCode)

export default router;