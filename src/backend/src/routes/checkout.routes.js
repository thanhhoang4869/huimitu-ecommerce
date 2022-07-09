import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/buynow', checkout.checkoutBuyNow)
router.post('/cart', checkout.checkoutCart)
router.post('/momoSuccess', checkout.successMomo)
router.post('/paypalSuccess', checkout.successPaypal)

export default router;