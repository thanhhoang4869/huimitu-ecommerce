import account from '#src/models/account.model'
import jwt from 'jsonwebtoken'
import config from '#src/config/config'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID)

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
                token: jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: config.JWT_EXP_TIME
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
        const email = data.email;
        const phone = data.phone;

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
    },

    async loginGoogle(req, res) {
        const { tokenId } = req.body;
        console.log(tokenId)

        try {
            const result = await client.verifyIdToken({
                idToken: tokenId,
                audience: config.GOOGLE_CLIENT_ID
            })
            const { email } = result.payload;
            const currentAccount = await account.getByEmail(email);
            if (currentAccount === null) {
                const newAccount = {
                    email: email
                }
                await account.signup(newAccount);
            }
            const payload = {
                email: email
            }
            res.send({
                exitcode: 0,
                message: "Login successfully",
                token: jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: config.JWT_EXP_TIME
                }),
            });
        } catch (err) {
            console.error(err)
            res.status(400).send({
                exitcode: 1,
                message: "Login failed"
            })
        }
    }
}