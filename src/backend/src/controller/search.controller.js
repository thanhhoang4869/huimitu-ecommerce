import searchModel from '#src/models/search.model'
import productModel from '#src/models/product.model'

export default {
  async getProduct(req, res, next) {
    try {
      const { searchQuery, limit, offset } = req.body;
      const resultProduct = await searchModel.getProduct(searchQuery, limit, offset);
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
          soldQuantity: item.sold_quantity,
          image: imagePath
        }
      });
      const products = await Promise.all(promises)
      res.status(200).send({
        exitcode: 0,
        message: "Get search results successfully",
        products: products,
      })
    } catch (err) {
      next(err)
    }
  },

  async countProduct(req, res, next) {

    try {
      const { searchQuery } = req.body;
      const result = await searchModel.countProduct(searchQuery);
      res.status(200).send({
        exitcode: 0,
        message: "Count search results successfully",
        count: result.count,
      })
    } catch (err) {
      next(err)
    }
  }
}