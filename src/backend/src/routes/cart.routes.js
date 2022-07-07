import cart from '#src/controller/cart.controller'
import express from 'express'

const router = express.Router();

router.route('/')
    .get(cart.getCart)
    .post(cart.addVariantToCart)
    .patch(cart.updateVariantOfCart)
    .delete(cart.deleteVariantFromCart)

export default router;