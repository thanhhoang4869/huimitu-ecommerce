import shippingAddress from '#src/controller/shippingAddress.controller'
import express from 'express'

const router = express.Router();

router.route('/')
    .post(shippingAddress.createShippingAddress)
    .get(shippingAddress.getShippingAddress)

router.delete('/:shippingAddressId', shippingAddress.deleteShippingAddress)
    
export default router;