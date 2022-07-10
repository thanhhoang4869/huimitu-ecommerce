import searchModel from '#src/models/search.model'
import productModel from '#src/models/product.model'
import { buildCategoryRoot } from '#src/utils/utils'

export default {
  async getResult(req, res, next) {
    try {
      const { searchQuery, limit, offset } = req.body;
      const tsquery = searchQuery.split(' ').join(' | ');
      const resultProduct = await searchModel.getProduct(tsquery, limit, offset);
      const promises = resultProduct.map(async (item) => {
        const imagePath = await productModel.getSingleImageById(item.id)
        return {
          ...item,
          image: imagePath
        }
      });
      const products = await Promise.all(promises)

      const resultCategory = await searchModel.getCategory(tsquery, limit, offset);
      const categories = buildCategoryRoot(resultCategory) || []
      
      res.status(200).send({
        exitcode: 0,
        message: "Get search results successfully",
        products: products,
        categories: categories
      })
    } catch (err) {
      next(err)
    }
  }
}