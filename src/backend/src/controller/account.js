const Account = require('models/account')
const jwt = require('jsonwebtoken')
const config = require('config/config')

const login = (req, res) => {
    const data = {
        email: req.body.email,
    }
    const password = req.body.password
    Account.getPassword(data, (err, result) => {
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

const signup = (req, res) => {
    const data = Object.values(req.body)
    Account.signup(data, (err, result) => {
        if (err) {
            if(err.code === '23505') {
                let resMap = {
                    'email': {exitcode: 101, message: 'Email already exists'},
                    'phone': {exitcode: 102, message: 'Phone already exists'},
                }
                res.send(resMap[
                    err.detail.substring(
                        err.detail.indexOf('(') + 1,
                        err.detail.indexOf(')=')
                    )
                ])
                return
            }
            res.send({
                exitcode: 1,
                message: "Fail to signup"
            })
        }

        if (result) {
            res.send({
                exitcode: 0,
                message: "Create account successfully"
            })
        }
    })
}

module.exports = {
    login,
    signup
}
