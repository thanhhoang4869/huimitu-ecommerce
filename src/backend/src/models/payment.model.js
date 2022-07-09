import db from '#src/utils/db'

export default {
    async getPayment() {
        const result = await db('payment').select(
            'id',
            'provider'
        )
        return result;
    },

    async getById(paymentId) {
        const result = await db('payment').where({
            'id': paymentId
        }).select(
            'id',
            'provider'
        )
        return result[0] || null;
    }
}