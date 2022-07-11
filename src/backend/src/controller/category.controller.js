import categoryModel from "#src/models/category.model";
import { buildCategoryRoot } from "#src/utils/utils";

export default {
    async get(req, res, next) {
        try {
            const result = await categoryModel.get()
            const categories = buildCategoryRoot(result)
            res.status(200).send({
                exitcode: 0,
                message: "Get categories successfully",
                categories: categories
            })
        } catch (err) {
            next(err)
        }
    }
};
