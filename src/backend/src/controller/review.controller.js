import reviewModel from '#src/models/review.model'

export default {
    async createReview(req, res, next) {
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
            const result = await reviewModel.createReview(entity);
            res.status(200).send({
                exitcode: 0,
                message: "Create product review successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async getReview(req, res, next) {
        try {
            const { productId } = req.body;
            const entity = { productId: productId }
            const result = await reviewModel.getReview(entity);
            const reviews = result.map(review => {
                return {
                    productVariantId: review.product_variant_id,
                    orderId: review.order_id,
                    rating: review.rating,
                    comment: review.comment
                }
            })
            res.status(200).send({
                exitcode: 0,
                message: "Get product review successfully",
                reviews: reviews
            })
        } catch (err) {
            next(err)
        }
    }
}