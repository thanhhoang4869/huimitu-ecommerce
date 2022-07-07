import productModel from '#src/models/product.model'
import categoryModel from '#src/models/category.model'
import { buildCategoryRoot, searchCategoryTree, toListCategory } from '#src/utils/utils';

export default {
    async getBestSeller(req, res, next) {
        try {
            const resultProduct = await productModel.getBestSeller()
            const promises = resultProduct.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.id)
                return {
                    id: item.id,
                    productName: item.product_name,
                    categoryName: item.category_name,
                    description: item.description,
                    avgRating: item.avg_rating,
                    countRating: item.count_rating,
                    minPrice: item.min_price,
                    maxPrice: item.max_price,
                    stock: item.stock,
                    createdTime: item.created_time,
                    image: imagePath
                }
            });
            const products = await Promise.all(promises)
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
            const resultProduct = await productModel.getNewestArrival()
            const promises = resultProduct.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.id)
                return {
                    id: item.id,
                    productName: item.product_name,
                    categoryName: item.category_name,
                    description: item.description,
                    avgRating: item.avg_rating,
                    countRating: item.count_rating,
                    minPrice: item.min_price,
                    maxPrice: item.max_price,
                    stock: item.stock,
                    createdTime: item.created_time,
                    image: imagePath
                }
            });
            const products = await Promise.all(promises)
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

            const resultProduct = await productModel.getProductByCategoryList(listSelectedName, limit, offset);
            const promises = resultProduct.map(async (item) => {
                const imagePath = await productModel.getSingleImageById(item.id)
                return {
                    id: item.id,
                    productName: item.product_name,
                    categoryName: item.category_name,
                    description: item.description,
                    avgRating: item.avg_rating,
                    countRating: item.count_rating,
                    minPrice: item.min_price,
                    maxPrice: item.max_price,
                    stock: item.stock,
                    createdTime: item.created_time,
                    image: imagePath
                }
            });
            const products = await Promise.all(promises)

            res.status(200).send({
                exitcode: 0,
                message: "Get product successfully",
                products: products
            })
        } catch (err) {
            next(err)
        }
    },

    async getSingleProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const product = await productModel.getProductById(productId)
            if (product === null) {
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
            } = product

            const listImage = await productModel.getImageById(id)
            const images = listImage.map(item => ({
                id: item.id,
                path: item.path
            }))

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
                    createdTime: created_time,
                    images: images
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

            // Create entity to insert to database
            const entity = {
                productName: productName,
                description: description,
                categoryName: categoryName,
            }
            const productId = await productModel.createProduct(entity);

            // Insert images
            const { files } = req;
            const listPath = files.map(item => item.path)
            const result = await productModel.insertImages(productId, listPath)

            res.status(200).send({
                exitcode: 0,
                message: "Create product successfully",
                productId: productId
            })
        } catch (err) {
            next(err)
        }
    },
}