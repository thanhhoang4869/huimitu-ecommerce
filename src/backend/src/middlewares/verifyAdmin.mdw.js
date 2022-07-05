import config from '#src/config/config'
import accountModel from '#src/models/account.model'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'

export default async function verifyAdmin(req, res, next) {
    try {
        const email = req.payload.email;
        const result = await accountModel.getByEmail(email);
        if (result.role !== config.role.ADMIN) {
            throw new ErrorHandler(403, "Only admin can call this route")
        }
        next()
    } catch (err) {
        next(err)
    }
} 