import paymentModel from '#src/models/payment.model'

export default {
    async getPayment(req, res, next) {
        try {
            const result = await paymentModel.getPayment();
            const payments = result.map(item => ({
                id: item.id,
                provider: item.provider
            }))
            res.status(200).send({
                exitcode: 0,
                message: "Get payments successfully",
                payments: payments
            })
        } catch (err) {
            next(err)
        }
    }
}