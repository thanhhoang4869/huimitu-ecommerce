import category from '#src/models/category'

export default {
    async get(req, res) {
        try {
            const data = await category.get()
            const getChildren = (parent) => {
                let children = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].parent_id === parent.id) {
                        children.push(data[i])
                    }
                }
                if (children.length === 0) {
                    return null
                }
                for (let i = 0; i < children.length; i++) {
                    children[i].children = getChildren(children[i])
                }
                return children
            }
            let result = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].parent_id === null) {
                    data[i].children = getChildren(data[i])
                    result.push(data[i])
                }
            }
            res.send({
                exitcode: 0,
                message: "Get categories successfully",
                categories: result
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: "Fail to get categories"
            })
        }
    }
} 