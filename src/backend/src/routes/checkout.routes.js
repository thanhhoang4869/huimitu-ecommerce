import checkout from '#src/controller/checkout.controller'
import express from 'express'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'

const router = express.Router();
router.post('/', verifyLogin, verifyEmailVerified, checkout.checkout)

router.post('/successMomo', checkout.successMomo)
router.post('/successPaypal', checkout.successPaypal)

router.post('/price', verifyLogin, verifyEmailVerified, checkout.getPrice);

export default router;