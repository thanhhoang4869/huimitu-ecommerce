import db from '#src/utils/db'

export default {
    async getShippingProvider() {
        const result = await db('shipping_provider')
            .select(
                'shipping_provider.id',
                'shipping_provider.shipping_provider_name',
            )
        return result || null;
    }
}