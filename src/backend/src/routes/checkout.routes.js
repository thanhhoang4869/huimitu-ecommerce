import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/checkoutBuyNow', checkout.checkoutBuyNow)
router.post('/checkoutCart', checkout.checkoutCart)
router.post('/momoSuccess', checkout.successMomo)
router.post('/paypalSuccess', checkout.successPaypal)

export default router;