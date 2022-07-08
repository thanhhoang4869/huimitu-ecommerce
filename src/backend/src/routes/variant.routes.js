import variantController from '#src/controller/variant.controller'
import express from 'express'

import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'

const router = express.Router();
router.post('/getByProductId', variantController.getByProductId)

router.post('/', verifyLogin, verifyEmailVerified, verifyAdmin, variantController.createVariant)

router.route('/:variantId')
    .get(variantController.getSingleVariant)
    .patch(verifyLogin, verifyEmailVerified, verifyAdmin, variantController.updateVariant)
    .delete(verifyLogin, verifyEmailVerified, verifyAdmin, variantController.deleteVariant)

export default router;