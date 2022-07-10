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
          ...item,
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