import db from '#src/utils/db'
import { removeEmptyValue } from '#src/utils/utils'

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
        const newEntity = removeEmptyValue(entity)
        const result = await db('account').where({
            email: email
        }).update(newEntity)
        return result;
    },

    async signup(data) {
        const entity = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            verified: data.verified,
            token: data.token,
            role: data.role
        }
        return db('account').insert(entity);
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