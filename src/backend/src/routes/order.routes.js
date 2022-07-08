import orderController from '#src/controller/order.controller'
import express from 'express'

const router = express.Router();

router.post('/createBuyNow', orderController.createBuyNow)
router.post('/createFromCart', orderController.createFromCart)

export default router;
