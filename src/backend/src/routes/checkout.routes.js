import checkout from '#src/controller/checkout.controller'
import express from 'express'

const router = express.Router();
router.post('/create-payment', checkout.create_payment)
router.post('/execute-payment', checkout.execute_payment)

export default router;