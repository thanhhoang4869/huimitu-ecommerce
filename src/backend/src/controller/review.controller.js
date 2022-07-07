import reviewModel from '#src/models/review.model'

export default {
    async createProductReview(req, res, next) {
        try {
            const {
                productId,
                orderId,
                rating,
                comment
            } = req.body;
            const entity = {
                productId: productId,
                orderId: orderId,
                rating: rating,
                comment: comment,
            }
            const result = await reviewModel.createProductReview(entity);
            res.status(200).send({
                exitcode: 0,
                message: "Create product review successfully"
            })
        } catch (err) {
            next(err)
        }
    },


    async getProductReview(req, res, next) {
        try {
        } catch (err) {
            next(err)
        }
    }
}