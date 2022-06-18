const Account = require('../model/account')

const save = (req, res) => {
    const data = Object.values(req.body)
    Account.signup(data, (err, result) => {
        if (err) {
            res.send({
                exitcode: 1,
                message: err
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
    save,
}