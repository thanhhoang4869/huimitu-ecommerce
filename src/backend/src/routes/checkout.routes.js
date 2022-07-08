import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/:orderId', checkout.checkoutOrder)
router.post('/momoSuccess', checkout.successMomo)
router.post('/paypalSuccess', checkout.successPaypal)

export default router;