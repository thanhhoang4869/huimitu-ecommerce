import review from '#src/controller/review.controller'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'
import express from 'express'

const router = express.Router();
router.post("/createReview", verifyLogin, review.createReview)
router.post("/getReview", review.getReview)

export default router;