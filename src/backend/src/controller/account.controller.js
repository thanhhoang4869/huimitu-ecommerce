import account from '#src/models/account.model'

export default {
    async getInformation(req, res) {
        const email = req.payload.email;
        try {
            const result = await account.getByEmail(email);
            res.status(200).send({
                exitcode: 0,
                account: result,
                message: "Get information successfully"
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                exitcode: 1,
                message: "Get information failed"
            })
        }
    }
}