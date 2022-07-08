import review from '#src/controller/review.controller'
import express from 'express'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'

const router = express.Router();
router.post("/createReview", verifyLogin, verifyEmailVerified, review.createReview)
router.post("/getReview", review.getReview)

export default router;