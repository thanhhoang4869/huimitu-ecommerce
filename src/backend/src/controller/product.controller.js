import product from '#src/models/product.model'

export default {
    async getBestSeller(req, res) {
        try {
            const result = await product.getBestSeller()
            res.status(200).send({
                exitcode: 0,
                message: "Get best seller products successfully",
                products: result
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Fail to get best seller products"
            })
        }
    }
} 