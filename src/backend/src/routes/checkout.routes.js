import checkout from '#src/controller/checkout.controller'
import express from 'express'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'

const router = express.Router();
router.post('/buynow', verifyLogin, verifyEmailVerified, checkout.checkoutBuyNow)
router.post('/cart',  verifyLogin,  verifyEmailVerified, checkout.checkoutCart)
router.post('/successMomo', checkout.successMomo)
router.post('/successPaypal', checkout.successPaypal)

export default router;