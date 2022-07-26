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
import order from '#src/routes/order.routes'
import search from '#src/routes/search.routes'
import voucher from '#src/routes/voucher.routes'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import express from 'express'

const router = express.Router();
router.use('/auth', auth)
router.use('/account', verifyLogin, verifyEmailVerified, account)
router.use('/checkout', checkout)
router.use('/product', product)
router.use('/category', category)
router.use('/location', location)
router.use('/variant', variant)
router.use('/cart', verifyLogin, verifyEmailVerified, cart)
router.use('/review', review)
router.use('/shippingAddress', verifyLogin, verifyEmailVerified, shippingAddress)
router.use('/payment', payment)
router.use('/order', verifyLogin, verifyEmailVerified, order)
router.use('/search', search)
router.use('/voucher', verifyLogin, verifyEmailVerified, verifyAdmin, voucher)

export default router;