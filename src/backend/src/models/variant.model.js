import db from '#src/utils/db'
import config from '#src/config/config'

export default {
    async getByProductId(productId) {
        const result = await db('product_variant')
            .join('product', 'product.id', 'product_variant.product_id')
            .where({
                "product.id": productId,
            })
            .select(
                "product_variant.variant_name",
                "product_variant.price",
                "product_variant.discount_price",
                "product_variant.stock"
            )
        return result || null;
    },
}