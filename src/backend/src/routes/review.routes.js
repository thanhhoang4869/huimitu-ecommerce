import review from '#src/controller/review.controller'
import express from 'express'

import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'

const router = express.Router();
router.route("/")
    .get(review.getReview)
    .post(verifyLogin, verifyEmailVerified, review.createReview)

export default router;