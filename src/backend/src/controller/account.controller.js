import accountModel from '#src/models/account.model'

export default {
    async getInformation(req, res, next) {
        try {
            const reqEmail = req.payload.email;
            const result = await accountModel.getByEmail(reqEmail);
            const { email, phone, fullname, birthday, gender, account_type, verified } = result;
            res.status(200).send({
                exitcode: 0,
                account: {
                    email: email,
                    phone: phone,
                    fullname: fullname,
                    birthday: (new Date(birthday)).toLocaleDateString(),
                    gender: gender,
                    accountType: account_type,
                    verified: verified
                },
                message: "Get information successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async updateInformation(req, res, next) {
        try {
            const { phone, fullname, birthday, gender } = req.body;
            const { email } = req.payload;
            const entity = {
                phone,
                fullname,
                birthday,
                gender
            }

            if (phone) {
                const accountPhone = await accountModel.getByPhone(phone)
                if (accountPhone && accountPhone.email !== email) {
                    return res.status(200).send({
                        exitcode: 103,
                        message: "Phone number is already used"
                    })
                }
            }

            const result = await accountModel.updateInformation(email, entity)

            res.status(200).send({
                exitcode: 0,
                message: "Update information successfully"
            })
        } catch (err) {
            next(err)
        }
    }
}