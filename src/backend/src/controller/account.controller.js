import account from '#src/models/account.model'

export default {
    async getInformation(req, res, next) {
        try {
            const reqEmail = req.payload.email;
            const result = await account.getByEmail(reqEmail);
            const { email, phone, fullname, birthday, gender, account_type, verified } = result;
            res.status(200).send({
                exitcode: 0,
                account: {
                    email: email,
                    phone: phone,
                    fullname: fullname,
                    birthday: birthday,
                    gender: gender,
                    accountType: account_type,
                    verified: verified
                },
                message: "Get information successfully"
            })
        } catch (err) {
            next(err)
        }
    }
}