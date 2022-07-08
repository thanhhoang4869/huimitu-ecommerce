import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/buyNow', checkout.buyNow)
router.post('/buyFromCart', checkout.buyFromCart)

export default router;