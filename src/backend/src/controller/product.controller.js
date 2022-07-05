import product from '#src/models/product.model'

export default {
    async getBestSeller(req, res, next) {
        try {
            const result = await product.getBestSeller()
            const products = result.map(
                item => ({
                    id: item.id,
                    productName: item.product_name,
                    categoryName: item.category_name,
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
            next(err)
        }
    },


    async getNewestArrival(req, res, next) {
        try {
            const result = await product.getNewestArrival()
            const products = result.map(
                item => ({
                    id: item.id,
                    productName: item.product_name,
                    categoryName: item.category_name,
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
            next(err)
        }
    },

    async getSingleProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const result = await product.getById(productId)
            const {
                id,
                product_name,
                category_name,
                description,
                avg_rating,
                count_rating,
                min_price,
                max_price,
                stock,
                created_time
            } = result
            res.status(200).send({
                exitcode: 0,
                message: "Get product successfully",
                product: {
                    id: id,
                    productName: product_name,
                    categoryName: category_name,
                    description: description,
                    avgRating: avg_rating,
                    countRating: count_rating,
                    minPrice: min_price,
                    maxPrice: max_price,
                    stock: stock,
                    createdTime: created_time
                }
            })
        } catch (err) {
            next(err)
        }
    },

    async updateProduct(req, res, next) {
        try {
            const productId = req.params.productId;
        } catch (err) {
            next(err)
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.productId;
        } catch (err) {
            next(err)
        }
    },


    async createProduct(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    },
} 