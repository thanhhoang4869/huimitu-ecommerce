import db from '#src/utils/db'

export default {
    async get() {
        const result = await db('category')
        return result || null;
    },
}