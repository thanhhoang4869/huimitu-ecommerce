const account = require('../models/account')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const login = (req, res) => {
    const data = {
        email: req.body.email,
    }
    const password = req.body.password
    account.getPassword(data, (err, result) => {
        if (err) {
            res.send({
                exitcode: 1,
                message: "Fail to login"
            });
            return;
        }

        const queryRes = result.rows;
        if (queryRes.length < 1 || queryRes[0].password !== password) {
            res.send({
                exitcode: 3,
                message: "Email or password is not correct"
            });
            return;
        }

        const payload = {
            email: data.email
        }
        res.send({
            exitcode: 0,
            message: "Login successfully",
            token: jwt.sign(payload, config.server.secret, {
                expiresIn: config.server.expTime
            }),
        })
    })
}

module.exports = {
    login
}
