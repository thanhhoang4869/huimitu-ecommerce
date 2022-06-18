const db = require('../utils/db');

function getPassword(data, callback) {
    const email = data.email || "";

    db.pool.query(`
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
}

module.exports = {
    getPassword
}