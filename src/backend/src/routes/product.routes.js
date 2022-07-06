import product from '#src/controller/product.controller'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import express from 'express'

const router = express.Router();
router.get('/bestSeller', product.getBestSeller)
router.get('/newestArrival', product.getNewestArrival)

router.post('/', verifyLogin, verifyAdmin, product.createProduct)
router.route('/:productId')
    .get(product.getSingleProduct)
    .patch(verifyLogin, verifyAdmin, product.updateProduct)
    .delete(verifyLogin, verifyAdmin, product.deleteProduct)
router.route("/:productId/reviews")
    .post(verifyLogin, product.createProductReview)

export default router;