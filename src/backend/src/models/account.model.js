import db from '#src/utils/db'

export default {
    async getPassword(email) {
        const result = await db('account').select('password').where({
            email: email
        })
        return result[0].password || null;
    },

    async signup(data) {
        return db('account').insert(data);
    },

    async getByEmail(email) {
        const result = await db('account').where({
            email: email
        })
        return result[0] || null;
    },
    
    async getByPhone(phone) {
        const result = await db('account').where({
            phone: phone
        })
        return result[0] || null;
    }
}