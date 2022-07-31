import reviewModel from '#src/models/review.model'
import orderModel from '#src/models/order.model'
import variantModel from '#src/models/variant.model'
import config from '#src/config/config'

export default {
    async createReview(req, res, next) {
        try {
            const {
                variantId,
                orderId,
                rating,
                comment
            } = req.body;
            const { email } = req.payload;

            // Check order exist
            const order = await orderModel.getOrderById(orderId);
            if (order === null) {
                return res.status(200).send({
                    exitcode: 101,
                    message: "Order not found"
                })
            }

            // Check for owner
            if (order.email !== email) {
                return res.status(200).send({
                    exitcode: 102,
                    message: "Only order owner can review"
                })
            }

            // Check for order state (must be success)
            if (order.state !== config.orderState.SUCCESS) {
                return res.status(200).send({
                    exitcode: 103,
                    message: "Order not in success state"
                })
            }

            // Check exist variant in order
            const variants = await variantModel.getByOrderId({ orderId, variantId });
            if (variants?.length < 1) {
                return res.status(200).send({
                    exitcode: 104,
                    message: "Item not in the order"
                })
            }

            // Check reviewed
            if (variants[0].reviewed) {
                return res.status(200).send({
                    exitcode: 105,
                    message: "Item has been reviewed"
                })
            }

            // Create review
            await reviewModel.createReview({
                variantId: variantId,
                orderId: orderId,
                rating: rating,
                comment: comment,
            });
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
            const { productId, orderId, variantId } = req.query;

            const result = await reviewModel.getReview({ productId, orderId, variantId });
            const reviews = result.map(review => ({
                email: review.email,
                fullName: review.fullname,
                avatarPath: review.avatar_path,
                variantId: review.variant_id,
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