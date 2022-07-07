/**
 * Build the category tree from the category list
 * 
 * @param {int} parentId The id of parent category node
 * @param {Category[]} category A list of category with parentId
 * @returns {TreeCategory[]} An array of trie, each tree is a branch of category
 */
const buildCategoryRoot = (parentId, category) => {
    const root = category.filter(item => item.parent_id === parentId)
    if (root.length === 0) {
        return undefined
    } else {
        for (let i = 0; i < root.length; i++) {
            const children = buildCategoryRoot(root[i].id, category)
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

/**
 * Search for a node in the list of Category Tree
 * 
 * @param {TreeCategory[]} rootList An array of category trie
 * @param {string} categoryName The name of category need to find
 * @returns {TreeCategory} The searching node
 */
const searchCategoryTree = (rootList, categoryName) => {
    if (rootList === null || rootList === undefined) {
        return null;
    }
    for (let i = 0; i < rootList.length; i++) {
        if (rootList[i].categoryName === categoryName) {
            return rootList[i]
        }
        if (rootList[i].children) {
            const result = searchCategoryTree(rootList[i].children)
            if (result) {
                return result
            }
        }
    }
    return null;
}

/**
 * Reshape the category tree to an array
 * 
 * @param {TreeCategory} root A node of category tree
 * @returns {Category[]} The category list after reshape 
 */
const toListCategory = (root) => {
    const { children, ...rest } = root
    let result = [rest]
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const childList = toListCategory(children[i])
            result = result.concat(childList)
        }
    }
    return result;
}

export {
    buildCategoryRoot,
    searchCategoryTree,
    toListCategory,
}