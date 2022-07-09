import categoryModel from "#src/models/category.model";
import { buildCategoryRoot } from "#src/utils/utils";

export default {
  async get(req, res, next) {
    try {
      const category = await categoryModel.get();
      const result = buildCategoryRoot(category);
      res.status(200).send({
        exitcode: 0,
        message: "Get categories successfully",
        categories: result,
      });
    } catch (err) {
      next(err);
    }
  },
};
