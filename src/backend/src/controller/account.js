import account from '#src/models/account'
import jwt from 'jsonwebtoken'
import config from '#src/config/config'

export default {
    async login(req, res) {
        const email = req.body.email
        const password = req.body.password
        try {
            const correctPassword = await account.getPassword(email);
            if (correctPassword === null || password !== correctPassword) {
                res.send({
                    exitcode: 3,
                    message: "Email or password is not correct"
                });
                return;
            }
            const payload = {
                email: email
            }
            res.send({
                exitcode: 0,
                message: "Login successfully",
                token: jwt.sign(payload, config.server.secret, {
                    expiresIn: config.server.expTime
                }),
            });
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: "Fail to login"
            })
        }
    },

    async signup(req, res) {
        const data = req.body;
        const email = req.body.email;
        const phone = req.body.phone;

        try {
            const emailAccount = await account.getByEmail(email);
            if (emailAccount !== null) {
                res.send({
                    exitcode: 101,
                    message: "Email already exists"
                })
                return;
            }

            const phoneAccount = await account.getByPhone(phone);
            if (phoneAccount !== null) {
                res.send({
                    exitcode: 102,
                    message: "Phone already exists"
                })
                return;
            }

            const result = await account.signup(data)
            res.send({
                exitcode: 0,
                message: "Create account successfully"
            })
        } catch (err) {
            console.error(err);
            res.send({
                exitcode: 1,
                message: "Fail to signup"
            })
        }
    }
}