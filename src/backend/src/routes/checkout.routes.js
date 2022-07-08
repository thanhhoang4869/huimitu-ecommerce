import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/buyNow', checkout.buyNow)
router.post('/buyFromCart', checkout.buyFromCart)
router.post('/momoSuccess', checkout.successMomo)
router.post('/paypalSuccess', checkout.successPaypal)

export default router;