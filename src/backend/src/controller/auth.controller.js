import account from '#src/models/account.model'
import jwt from 'jsonwebtoken'
import config from '#src/config/config'
import CryptoJS from 'crypto-js'
import oauth2Client from '#src/utils/oauth2'
import mailer from '#src/utils/nodemailer'

export default {
    async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            // Get the database password
            const encryptedPassword = await account.getPassword(email);
            if (encryptedPassword === null) {
                res.status(200).send({
                    exitcode: 3,
                    message: "Email or password is not correct"
                });
                return;
            }

            // Get salt
            const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedPassword)
            const [salt, hashedCorrectPassword] = CryptoJS.enc.Utf8.stringify(encryptedWordArray).split("&")
            console.log(salt, hashedCorrectPassword)

            // Compare the password
            const hashedPassword = CryptoJS.SHA256(salt + password).toString();
            if (hashedPassword !== hashedCorrectPassword) {
                res.status(200).send({
                    exitcode: 3,
                    message: "Email or password is not correct"
                });
                return;
            }

            // Create payload for encryption
            const payload = {
                email: email
            }

            // Send back response with token
            res.status(200).send({
                exitcode: 0,
                message: "Login successfully",
                token: jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: config.JWT_EXP_TIME
                }),
            });
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Fail to login"
            })
        }
    },

    async signup(req, res) {
        try {
            const { email, phone, password, fullname } = req.body;

            // Check for email duplicated
            const emailAccount = await account.getByEmail(email);
            if (emailAccount !== null) {
                res.status(200).send({
                    exitcode: 101,
                    message: "Email already exists"
                })
                return;
            }

            // Check for phone duplicated
            const phoneAccount = await account.getByPhone(phone);
            if (phoneAccount !== null) {
                res.status(200).send({
                    exitcode: 102,
                    message: "Phone already exists"
                })
                return;
            }

            // 256 bits which provides about 1e+77 possible different number
            // This is enough for preventing brute force
            const nByteToken = 256 / 8;
            const token = CryptoJS.lib.WordArray.random(nByteToken).toString();

            // Encrypt password by salting and hashing
            const nByteSalt = 16 / 8
            const salt = CryptoJS.lib.WordArray.random(nByteSalt).toString();
            const hashedPassword = CryptoJS.SHA256(salt + password).toString();
            const finalWordArray = CryptoJS.enc.Utf8.parse([salt, hashedPassword].join("&"))
            const finalPassword = CryptoJS.enc.Base64.stringify(finalWordArray)

            // Send the time for each mail is different
            // This prevent the html being trimmed by Gmail
            const mailOption = {
                from: config.GMAIL_USERNAME,
                to: email,
                subject: "[Huimitu] Email verification",
                html: `
                <div style="
                    text-align: center; 
                    height: 256px;
                    width: 512px;
                    background-color: hsl(125, 29%, 75%); 
                    padding: 2em; 
                    justify-content: center;"
                >
                    <h1>Huimitu Shop</h1>
                    <h3>Thank you for registering</h3>
                    <div>
                        <a href="http://${req.headers.host}/account/verify/${token}">
                            <button style="
                                font-weight: bold; 
                                padding: 2em; 
                                background-color: #18aeac; 
                                color: #fff; 
                                width: 512px; 
                                border: none;"
                            >
                                Click here to activate your account
                            </button>
                        </a>
                    </div>
                    <div>Sent at ${(new Date()).toUTCString()}</div>
                </div>`
            }
            // await mailer.sendMail(mailOption);

            // Create entity to insert to DB
            const entity = {
                email,
                phone,
                fullname,
                password: finalPassword,
                verified: false,
                token: token
            }
            const result = await account.signup(entity)

            res.status(200).send({
                exitcode: 0,
                message: "Create account successfully"
            })
        } catch (err) {
            console.error(err);
            res.status(500).send({
                exitcode: 1,
                message: "Fail to signup"
            })
        }
    },

    async loginGoogle(req, res) {
        try {
            // Extract and verify token from Google
            const { tokenId } = req.body;
            const result = await oauth2Client.verifyIdToken({
                idToken: tokenId,
                audience: config.GOOGLE_CLIENT_ID
            })

            // Create new account if email not registered
            const { email } = result.payload;
            const currentAccount = await account.getByEmail(email);
            if (currentAccount === null) {
                const newAccount = {
                    email: email
                }
                await account.signup(newAccount);
            }

            // Sign a new token by server
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
            res.status(500).send({
                exitcode: 1,
                message: "Login failed"
            })
        }
    }
}