import db from '#src/utils/db'

export default {
    async getPassword(email) {
        const result = await db('account').select('password').where({
            email: email
        })
        try {
            return result[0].password;
        } catch (err) {
            return null;
        }
    },

    async updateInformation(email, entity) {
        const { fullname, birthday, phone, gender } = entity
        const result = await db('account').where({
            email: email
        }).update({
            fullname: fullname,
            birthday: birthday,
            phone: phone,
            gender: gender
        })
        return result;
    },

    async signup(data) {
        return db('account').insert({
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            verified: data.verified,
            token: data.token,
            role: data.role
        });
    },

    async verifyAccount(token) {
        const result = await db('account').update({
            verified: true,
        }).where({
            token: token
        })
        return result;
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