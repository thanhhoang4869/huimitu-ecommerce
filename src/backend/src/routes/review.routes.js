import review from '#src/controller/review.controller'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import express from 'express'

const router = express.Router();
router.route("/createReview")
    .post(verifyLogin, review.createReview)
router.route("/getReview")
    .post(review.getReview)

export default router;