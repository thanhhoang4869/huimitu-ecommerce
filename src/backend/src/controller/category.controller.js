import categoryModel from '#src/models/category.model'

const buildRoot = (parentId, category) => {
    const root = category.filter(item => item.parent_id === parentId)
    if (root.length === 0) {
        return undefined
    } else {
        for (let i = 0; i < root.length; i++) {
            const children = buildRoot(root[i].id, category)
            if (children) {
                root[i].children = children;
            }
        }
    }
    const result = root.map(item => ({
        id: item.id,
        categoryName: item.category_name,
        description: item.description,
        children: item.children
    }))
    return result
}

export default {
    async get(req, res, next) {
        try {
            const category = await categoryModel.get()
            const result = buildRoot(null, category)
            res.status(200).send({
                exitcode: 0,
                message: "Get categories successfully",
                categories: result
            })
        } catch (err) {
            next(err)
        }
    }
} 