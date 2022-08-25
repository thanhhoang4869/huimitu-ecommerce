import productModel from "#src/models/product.model";
import categoryModel from "#src/models/category.model";
import {
  buildCategoryRoot,
  searchCategoryTree,
  toListCategory,
  getParentBranch,
} from "#src/utils/utils";
import { cloudinary } from "#src/utils/cloudinary";
import config from "#src/config/config";

const getListCategoryId = async (categoryId) => {
  if (!categoryId) return [];

  const category = await categoryModel.get();
  const categoryTree = buildCategoryRoot(category);
  const selectedRoot = searchCategoryTree(categoryTree, categoryId);
  const listCategory = toListCategory(selectedRoot);
  return listCategory.map((item) => item.id);
};

export default {
  async getBestSeller(req, res, next) {
    try {
      const resultProduct = await productModel.getBestSeller();

      const promises = resultProduct.map(async (item) => {
        const imagePath = await productModel.getSingleImageById(item.id);
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
          soldQuantity: item.sold_quantity,
          image: imagePath,
        };
      });
      const products = await Promise.all(promises);
      res.status(200).send({
        exitcode: 0,
        message: "Get best seller products successfully",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  },

  async getNewestArrival(req, res, next) {
    try {
      const resultProduct = await productModel.getNewestArrival();
      const promises = resultProduct.map(async (item) => {
        const imagePath = await productModel.getSingleImageById(item.id);
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
          image: imagePath,
        };
      });
      const products = await Promise.all(promises);
      res.status(200).send({
        exitcode: 0,
        message: "Get newest products successfully",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  },

  async getProduct(req, res, next) {
    try {
      const { categoryId, minPrice, maxPrice, sortType, limit, offset } =
        req.body;

      const listSelectedId = await getListCategoryId(categoryId);
      const resultProduct = await productModel.getProduct(
        limit,
        offset,
        minPrice,
        maxPrice,
        sortType,
        listSelectedId
      );
      const promises = resultProduct.map(async (item) => {
        const imagePath = await productModel.getSingleImageById(item.id);
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
          image: imagePath,
        };
      });
      const products = await Promise.all(promises);

      res.status(200).send({
        exitcode: 0,
        message: "Get products successfully",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  },

  async countProduct(req, res, next) {
    try {
      const { categoryId, minPrice, maxPrice } = req.body;

      const listSelectedId = await getListCategoryId(categoryId);
      const count = await productModel.countProduct(
        minPrice,
        maxPrice,
        listSelectedId
      );

      res.status(200).send({
        exitcode: 0,
        message: "Get count of products successfully",
        count: count,
      });
    } catch (err) {
      next(err);
    }
  },

  async getSingleProduct(req, res, next) {
    try {
      const productId = req.params.productId;
      const product = await productModel.getProductById(productId);

      if (product === null) {
        return res.status(200).send({
          exitcode: 101,
          message: "Product not found",
        });
      }

      const {
        id,
        product_name,
        category_id,
        description,
        avg_rating,
        count_rating,
        min_price,
        max_price,
        stock,
        created_time,
        sold_quantity,
      } = product;

      const listImage = await productModel.getImageById(id);
      const images = listImage.map((item) => ({
        id: item.id,
        path: item.path,
      }));
      const category = await categoryModel.get();
      const categoryTree = buildCategoryRoot(category);
      const selectedBranch = getParentBranch(categoryTree, category_id);

      res.status(200).send({
        exitcode: 0,
        message: "Get product successfully",
        product: {
          id: id,
          productName: product_name,
          category: selectedBranch,
          description: description,
          avgRating: avg_rating,
          countRating: count_rating,
          minPrice: min_price,
          maxPrice: max_price,
          stock: stock,
          createdTime: created_time,
          soldQuantity: sold_quantity,
          images: images,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async addImage(req, res, next) {
    try {
      const { productId } = req.body;

      // Get inserting images
      const { files } = req;
      const listPath = files.map((item) => ({
        path: item.path,
        filename: item.filename,
      }));

      // Get current image
      const listImage = await productModel.getImageById(productId);
      const images = listImage.map((item) => ({
        id: item.id,
        path: item.path,
        filename: item.filename,
      }));

      // Reach limit then delete and cancel query
      if (
        images.length + listPath.length >=
        config.PRODUCT_IMAGE_NUMBER_LIMIT
      ) {
        for (const idx in listPath) {
          const uploader = cloudinary.uploader;
          try {
            await uploader.destroy(listPath[idx].filename);
          } catch (err) {
            console.log("Cannot delete product image");
          }
        }
        return res.status(200).send({
          exitcode: 102,
          message: `Each product can only have ${config.PRODUCT_IMAGE_NUMBER_LIMIT} image`,
        });
      }

      if (listPath.length > 0) {
        await productModel.insertImages(productId, listPath);
      }

      res.status(200).send({
        exitcode: 0,
        message: "Add images successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const productId = req.params.productId;
      const { productName, categoryId, description } = req.body;
      const entity = {
        productName,
        categoryId,
        description,
      };

      // Get append images
      const { files } = req;
      const listPath = files.map((item) => ({
        path: item.path,
        filename: item.filename,
      }));

      // Get current image
      const listImage = await productModel.getImageById(productId);
      const images = listImage.map((item) => ({
        id: item.id,
        path: item.path,
        filename: item.filename,
      }));

      // Reach limit then delete and cancel query
      if (
        images.length + listPath.length >=
        config.PRODUCT_IMAGE_NUMBER_LIMIT
      ) {
        for (const idx in listPath) {
          const uploader = cloudinary.uploader;
          try {
            await uploader.destroy(listPath[idx].filename);
          } catch (err) {
            console.log("Cannot delete product image");
          }
        }
        return res.status(200).send({
          exitcode: 102,
          message: `Each product can only have ${config.PRODUCT_IMAGE_NUMBER_LIMIT} image`,
        });
      }
      if (listPath.length > 0) {
        await productModel.insertImages(productId, listPath);
      }

      const result = await productModel.updateProduct(productId, entity);
      if (result > 0) {
        res.status(200).send({
          exitcode: 0,
          message: "Update product successfully",
        });
      } else {
        res.status(200).send({
          exitcode: 101,
          message: "Product not found",
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const result = await productModel.deleteProduct(productId);
      if (result > 0) {
        res.status(200).send({
          exitcode: 0,
          message: "Delete product successfully",
        });
      } else {
        res.status(200).send({
          exitcode: 101,
          message: "Product not found",
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async createProduct(req, res, next) {
    try {
      const { productName, description, categoryId } = req.body;
      const { files } = req;

      // Missing image
      if (!files || files.length < 1) {
        return res.status(200).send({
          exitcode: 101,
          message: "Missing product image"
        })
      }

      // Create entity to insert to database
      const entity = {
        productName: productName,
        description: description,
        categoryId: categoryId,
      };
      const productId = await productModel.createProduct(entity);

      // Insert images
      const listPath = files.map((item) => ({
        path: item.path,
        filename: item.filename,
      }));
      listPath.forEach(async (element) => {
        await productModel.insertImage(productId, element);
      });

      res.status(200).send({
        exitcode: 0,
        message: "Create product successfully",
        productId: productId,
      });
    } catch (err) {
      next(err);
    }
  },

  async relatedProduct(req, res, next) {
    try {
      const { productId } = req.params;

      const resultProduct = await productModel.getRelatedProduct(productId);

      if (resultProduct === null) {
        return res.status(200).send({
          exitcode: 101,
          message: "Related product not found",
        });
      }

      const promises = resultProduct.map(async (item) => {
        const imagePath = await productModel.getSingleImageById(item.id);
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
          image: imagePath,
        };
      });
      const products = await Promise.all(promises);

      res.status(200).send({
        exitcode: 0,
        message: "Get related products successfully",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteProductImage(req, res, next) {
    try {
      const { productImageId } = req.params;

      const currentProductImage = await productModel.deleteProductImage(
        productImageId
      );
      const currentFilename = currentProductImage.product_image_filename;
      if (currentFilename) {
        const uploader = cloudinary.uploader;
        try {
          await uploader.destroy(currentFilename);
        } catch (err) {
          console.log("Cannot delete product image");
        }
      }

      res.status(200).send({
        exitcode: 0,
        message: "Delete product image successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
