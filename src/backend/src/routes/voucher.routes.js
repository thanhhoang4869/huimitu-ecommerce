import voucher from '#src/controller/voucher.controller'
import express from 'express'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'

const router = express.Router();

router.route('/')
    .get(voucher.getVoucher)
    .post(verifyAdmin, voucher.addVoucher)

export default router;