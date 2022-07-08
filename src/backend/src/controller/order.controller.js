import variantModel from '#src/models/variant.model'

export default {
    async createBuyNow(req, res, next) {
        try {
            const { email } = req.payload;
            const {
                variantId,
                quantity,
            } = req.body;

        } catch (err) {
            next(err)
        }
    },

    async createFromCart(req, res, next) {

    },
}