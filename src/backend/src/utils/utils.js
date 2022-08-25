/**
 * Build the category tree from the category list
 * 
 * @param {Category[]} categoryList A list of category with parentId
 * @param {int} parentId The id of parent category node (default `null`)
 * @returns {TreeCategory[]} An array of trie, each tree is a branch of category
 */
const buildCategoryRoot = (categoryList, parentId = null) => {
    const root = categoryList.filter(item => item.parent_id === parentId)
    if (root.length === 0) {
        return undefined
    } else {
        for (let i = 0; i < root.length; i++) {
            const children = buildCategoryRoot(categoryList, root[i].id)
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
const searchCategoryTree = (rootList, categoryId) => {
    if (rootList === null || rootList === undefined) {
        return null;
    }
    for (let i = 0; i < rootList.length; i++) {
        if (+rootList[i].id === +categoryId) {
            return rootList[i]
        }
        if (rootList[i].children) {
            const result = searchCategoryTree(rootList[i].children, categoryId)
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
    if (!root) {
        return null;
    }

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

/**
 * 
 * @param {*} rootList 
 * @param {*} categoryId 
 * @returns 
 */
const getParentBranch = (rootList, categoryId) => {
    if (!rootList) {
        return null;
    }

    for (let i = 0; i < rootList.length; i++) {
        const { children, ...rest } = rootList[i]
        if (+rootList[i].id === +categoryId) {
            return rest;
        }
        if (children) {
            const result = getParentBranch(children, categoryId);
            if (result !== null) {
                return ({
                    ...rest,
                    children: result
                })
            }
        }
    }
    return null;
}

const removeUndefined = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
        else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
}

export {
    buildCategoryRoot,
    searchCategoryTree,
    toListCategory,
    getParentBranch,
    removeUndefined
}