import product from '#src/controller/product.controller'
import express from 'express'

const router = express.Router();
router.get('/bestSeller', product.getBestSeller)
router.get('/newestArrival', product.getNewestArrival)

export default router;