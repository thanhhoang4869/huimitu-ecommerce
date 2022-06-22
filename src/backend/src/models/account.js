import pg from './../utils/db.js'

export default {

    async getPassword(data) {
        const email = data.email || "";

        db.query(`
            SELECT password
            FROM account
            WHERE email=$1
        `, [
            email
        ], (err, res) => {
            if (err) {
                console.error(err.stack);
                callback(err, null);
            }
            callback(null, res)
        })
    },

    signup(data, resultCallback) {
        db.query(`INSERT INTO account VALUES(${data.map((val, i) => `$${i + 1}`).join(',')})`, data, function (err, res) {
            if (err) {
                resultCallback(err, null)
                return
            }

            resultCallback(null, data)
        })
    }

}