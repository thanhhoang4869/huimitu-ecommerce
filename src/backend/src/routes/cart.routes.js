import cart from '#src/controller/cart.controller'
import express from 'express'

const router = express.Router();

router.get('/', cart.getCart)
router.post('/', cart.addVariantToCart)
router.route('/:variantId').delete(cart.deleteVariantFromCart)

export default router;