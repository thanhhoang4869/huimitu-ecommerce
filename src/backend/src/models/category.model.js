import db from '#src/utils/db'

export default {
    async get() {
        const result = await db('category').select('*')
        return result || null;
    }
}