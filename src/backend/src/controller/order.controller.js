import variantModel from '#src/models/variant.model'

export default {
    async getOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const { email } = req.payload;
        } catch (err) {
            next(err)
        }
    },
}