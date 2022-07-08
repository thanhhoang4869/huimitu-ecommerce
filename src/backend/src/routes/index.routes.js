import checkout from '#src/routes/checkout.routes'
import auth from '#src/routes/auth.routes'
import account from '#src/routes/account.routes'
import product from '#src/routes/product.routes'
import category from '#src/routes/category.routes'
import location from '#src/routes/location.routes'
import variant from '#src/routes/variant.routes'
import cart from '#src/routes/cart.routes'
import review from '#src/routes/review.routes'
import shippingAddress from '#src/routes/shippingAddress.routes'
import payment from '#src/routes/payment.routes'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'
import express from 'express'

const router = express.Router();
router.use('/auth', auth)
router.use('/account', verifyLogin, verifyEmailVerified, account)
router.use('/checkout', verifyLogin, verifyEmailVerified, checkout)
router.use('/product', product)
router.use('/category', category)
router.use('/location', location)
router.use('/variant', variant)
router.use('/cart', verifyLogin, verifyEmailVerified, cart)
router.use('/review', verifyLogin, verifyEmailVerified, review)
router.use('/shippingAddress', verifyLogin, verifyEmailVerified, shippingAddress)
router.use('/payment', payment)

export default router;