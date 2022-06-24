import pg from '#src/utils/db'

export default {
    async get() {
        const result = await pg('category').select('*')
        return result || null;
    }
}