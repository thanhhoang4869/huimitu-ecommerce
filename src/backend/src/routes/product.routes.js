import product from '#src/controller/product.controller'
import express from 'express'
import { createUploader } from '#src/utils/cloudinary'
import config from '#src/config/config'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'

const productImageUploader = createUploader(
    config.CLOUDINARY_PRODUCT_PATH,
    ["png", "jpg"]
)

const router = express.Router();
router.get('/bestSeller', product.getBestSeller)
router.get('/newestArrival', product.getNewestArrival)
router.post('/get', product.getProduct)
router.post('/count', product.countProduct)

router.post(
    '/',
    verifyLogin,
    verifyEmailVerified,
    verifyAdmin,
    productImageUploader.array('productImg', config.PRODUCT_IMAGE_NUMBER_LIMIT),
    product.createProduct
)

router.post(
    '/image',
    verifyLogin,
    verifyEmailVerified,
    verifyAdmin,
    productImageUploader.array('productImg', config.PRODUCT_IMAGE_NUMBER_LIMIT),
    product.addImage
)

router.get('/related/:productId', product.relatedProduct);

router.route('/:productId')
    .get(product.getSingleProduct)
    .delete(verifyLogin, verifyEmailVerified, verifyAdmin, product.deleteProduct)
    .patch(
        verifyLogin,
        verifyEmailVerified,
        verifyAdmin,
        productImageUploader.array('productImg', config.PRODUCT_IMAGE_NUMBER_LIMIT),
        product.updateProduct
    )

router.route('/image/:productImageId')
    .delete(verifyLogin, verifyEmailVerified, verifyAdmin, product.deleteProductImage)

export default router;