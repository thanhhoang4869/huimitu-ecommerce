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
            const order = await orderModel.getOrderById(orderId);
            if (order===null){
                return res.status(200).send({
                    exitcode: 101,
                    message: "Order not found"
                })
            }
            if (order.reviewed) {
                return res.status(200).send({
                    exitcode: 102, 
                    message: "Order has been reviewed"
                })
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
            const result = await reviewModel.getReview(productId);
            const reviews = result.map(review => ({
                email: review.email,
                fullName: review.fullname,
                avatarPath: review.avatar_path, 
                productVariantId: review.product_variant_id,
                orderId: review.order_id,
                rating: review.rating,
                comment: review.comment,
                createdTime: review.created_time
            }))
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