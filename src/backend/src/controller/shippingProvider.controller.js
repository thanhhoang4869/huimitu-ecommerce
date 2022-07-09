import shippingProviderModel from '#src/models/shippingProvider.model'

export default {
    async getShippingProvider(req, res, next) {
        try {

            const result = await shippingProviderModel.getShippingProvider();
            const shippingProviders = result.map(item => ({
                id: item.id,
                shippingProviderName: item.shipping_provider_name,
            }));
            res.status(200).send({
                exitcode: 0,
                message: "Get shipping provider successfully",
                shippingProviders: shippingProviders
            })
        } catch (err) {
            next(err)
        }
    }
}