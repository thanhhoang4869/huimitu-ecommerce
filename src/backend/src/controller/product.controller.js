import product from '#src/models/product.model'

export default {
    async getBestSeller(req, res) {
        try {
            const result = await product.getBestSeller()
            const products = result.map(
                item => ({
                    id: item.id,
                    name: item.name,
                    categoryId: item.category_id,
                    description: item.description,
                    avgRating: item.avg_rating,
                    countRating: item.count_rating,
                    minPrice: item.min_price,
                    maxPrice: item.max_price,
                    stock: item.stock,
                    createdTime: item.created_time
                })
            );
            res.status(200).send({
                exitcode: 0,
                message: "Get best seller products successfully",
                products: products
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Fail to get best seller products"
            })
        }
    },


    async getNewestArrival(req, res) {
        try {
            const result = await product.getNewestArrival()
            const products = result.map(
                item => ({
                    id: item.id,
                    name: item.name,
                    categoryId: item.category_id,
                    description: item.description,
                    avgRating: item.avg_rating,
                    countRating: item.count_rating,
                    minPrice: item.min_price,
                    maxPrice: item.max_price,
                    stock: item.stock,
                    createdTime: item.created_time
                })
            );
            res.status(200).send({
                exitcode: 0,
                message: "Get newest products successfully",
                products: products
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Fail to get newest products"
            })
        }
    }
} 