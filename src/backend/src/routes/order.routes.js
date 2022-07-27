import orderController from '#src/controller/order.controller'
import express from 'express'

const router = express.Router();

router.route('/')
    .post(orderController.getListOrder)
    .get(orderController.getCountOrder)

router.route('/:orderId')
    .get(orderController.getOrder)
    .patch(orderController.updateState);

export default router;
