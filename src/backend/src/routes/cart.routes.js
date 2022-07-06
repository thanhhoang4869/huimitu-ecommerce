import cart from '#src/controller/cart.controller'
import express from 'express'

const router = express.Router();

router.get('/', cart.getCart)
router.route('/:variantId')
    .post(cart.addVariantToCart)
    .patch(cart.updateVariantOfCart)
    .delete(cart.deleteVariantFromCart)

export default router;