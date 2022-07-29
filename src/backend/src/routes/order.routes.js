import orderController from '#src/controller/order.controller'
import express from 'express'

const router = express.Router();

router.get('/', orderController.getList)

router.route('/:orderId')
    .get(orderController.getOrder)
    .patch(orderController.updateState);

export default router;
