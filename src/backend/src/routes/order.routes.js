import orderController from '#src/controller/order.controller'
import express from 'express'

const router = express.Router();

router.get('/:orderId', orderController.getOrder);
router.post('/get', orderController.getListOrder);
router.get('/count', orderController.getCountOrder);

router.patch('/:orderId', orderController.updateState);

export default router;
