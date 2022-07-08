import payment from '#src/controller/payment.controller'
import express from 'express'

const router = express.Router();

router.get('/', payment.getPayment)

export default router;