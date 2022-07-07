import db from '#src/utils/db'

export default {
    async getPayment() {
        const result = await db('payment').select(
            'id',
            'provider'
        )
        return result;
    }
}