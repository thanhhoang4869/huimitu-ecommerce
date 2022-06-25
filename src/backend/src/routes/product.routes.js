import product from '#src/controller/product.controller'
import express from 'express'

const router = express.Router();
router.get('/best-seller', product.getBestSeller)

export default router;