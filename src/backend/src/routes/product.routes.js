import product from '#src/controller/product.controller'
import express from 'express'

const router = express.Router();
router.get('/bestSeller', product.getBestSeller)
router.get('/newestArrival', product.getNewestArrival)

router.post('/', product.createProduct)
router.route('/:productId')
    .get(product.getSingleProduct)
    .patch(product.updateProduct)
    .delete(product.deleteProduct)

export default router;