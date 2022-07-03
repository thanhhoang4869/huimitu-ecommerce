import checkout from '#src/routes/checkout.routes'
import auth from '#src/routes/auth.routes'
import account from '#src/routes/account.routes'
import product from '#src/routes/product.routes'
import category from '#src/routes/category.routes'
import location from '#src/routes/location.routes'
import express from 'express'

const router = express.Router();
router.use('/auth', auth)
router.use('/account', account)
router.use('/checkout', checkout)
router.use('/product', product)
router.use('/category', category)
router.use('/location', location)

export default router;