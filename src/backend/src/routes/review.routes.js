import review from '#src/controller/review.controller'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import express from 'express'

const router = express.Router();
router.route("/review")
    .post(verifyLogin, review.createProductReview)
    .get(review.getProductReview)

export default router;