import pg from '#src/utils/db'

export default {
    async getPassword(email) {
        const result = await pg('account').select('password').where({
            email: email
        })
        return result[0].password || null;
    },

    async signup(data) {
        return pg('account').insert(data);
    },

    async getByEmail(email) {
        const result = await pg('account').where({
            email: email
        })
        return result[0] || null;
    },
    
    async getByPhone(phone) {
        const result = await pg('account').where({
            phone: phone
        })
        return result[0] || null;
    }
}