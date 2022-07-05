import variantController from '#src/controller/variant.controller'
import verifyAdmin from '#src/middlewares/verifyAdmin.mdw'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import express from 'express'

const router = express.Router();
router.post('/getByProductId', variantController.getByProductId)

router.post('/', verifyLogin, verifyAdmin, variantController.createVariant)

router.route('/:variantId')
    .patch(verifyLogin, verifyAdmin, variantController.updateVariant)
    .delete(verifyLogin, verifyAdmin, variantController.deleteVariant)

export default router;