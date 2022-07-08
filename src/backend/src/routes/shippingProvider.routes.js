import shippingProvider from '#src/controller/shippingProvider.controller'
import express from 'express'

const router = express.Router();

router.route('/')
    .get(shippingProvider.getShippingProvider)
    
export default router;