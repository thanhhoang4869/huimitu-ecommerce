import variantController from '#src/controller/variant.controller'
import express from 'express'

const router = express.Router();
router.post('/getByProductId', variantController.getByProductId)

export default router;