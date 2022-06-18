const db = require('../utils/db').pool

const Account = function(){}
Account.signup = function(data, resultCallback) {
    db.query(`INSERT INTO account(email, password, phone, fullname, address, birthday, gender, avatar, account_type) VALUES(${data.map((val, i) => `$${i + 1}`).join(',')})`, data, function(err, res) {
        if (err) {
            console.log("Fail to create: ",err)
            resultCallback(err, null)
            return
        }

        resultCallback(null, data)
    })
}

module.exports = Account