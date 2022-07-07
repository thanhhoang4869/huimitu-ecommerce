import product from '#src/controller/product.controller'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import express from 'express'
import { createUploader } from '#src/utils/cloudinary'
import config from '#src/config/config'

const productImageUploader = createUploader(
    config.CLOUDINARY_PRODUCT_PATH,
    ["png", "jpg"]
)

const router = express.Router();
router.get('/bestSeller', product.getBestSeller)
router.get('/newestArrival', product.getNewestArrival)
router.post('/getByCategory', product.getProductByCategory)

router.post(
    '/', 
    verifyLogin, 
    verifyAdmin, 
    productImageUploader.array('productImg', config.PRODUCT_IMAGE_NUMBER_LIMIT), 
    product.createProduct
)

router.route('/:productId')
    .get(product.getSingleProduct)
    .patch(verifyLogin, verifyAdmin, product.updateProduct)
    .delete(verifyLogin, verifyAdmin, product.deleteProduct)

export default router;