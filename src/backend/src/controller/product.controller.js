import productModel from '#src/models/product.model'
import categoryModel from '#src/models/category.model'
import { buildCategoryRoot, searchCategoryTree, toListCategory } from '#src/utils/utils';

export default {
    async getBestSeller(req, res, next) {
        try {
            const result = await productModel.getBestSeller()
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
            const result = await productModel.getNewestArrival()
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

    async getProductByCategory(req, res, next) {
        try {
            const { categoryName, limit, offset } = req.body;
            const category = await categoryModel.get()

            const categoryTree = buildCategoryRoot(null, category);
            const selectedRoot = searchCategoryTree(categoryTree, categoryName);
            const listSelectedCategory = toListCategory(selectedRoot)
            const listSelectedName = listSelectedCategory.map(item => item.categoryName)

            const result = await productModel.getProductByCategoryList(listSelectedName, limit, offset);
            res.status(200).send({
                exitcode: 0,
                message: "Get product successfully",
                products: result
            })
        } catch (err) {
            next(err)
        }
    },

    async getSingleProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const result = await productModel.getProductById(productId)
            if (result === null) {
                res.status(200).send({
                    exitcode: 101,
                    message: "Product not found"
                })
            }

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
            const { productName, categoryName, description } = req.body;
            const entity = {
                productName,
                categoryName,
                description
            }
            const result = await productModel.updateProduct(productId, entity);
            if (result > 0) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Update product successfully",
                })
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Product not found"
                })
            }
        } catch (err) {
            next(err)
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const result = await productModel.deleteProduct(productId);
            if (result > 0) {
                res.status(200).send({
                    exitcode: 0,
                    message: "Delete product successfully"
                })
            } else {
                res.status(200).send({
                    exitcode: 101,
                    message: "Product not found"
                })
            }
        } catch (err) {
            next(err)
        }
    },


    async createProduct(req, res, next) {
        try {
            const {
                productName,
                description,
                categoryName
            } = req.body;
            const entity = {
                productName: productName,
                description: description,
                categoryName: categoryName,
            }
            const result = await productModel.createProduct(entity);
            res.status(200).send({
                exitcode: 0,
                message: "Create product successfully"
            })
        } catch (err) {
            next(err)
        }
    }
}