import accountModel from '#src/models/account.model'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'

export default async function verifyEmailVerified(req, res, next) {
    try {
        const email = req.payload.email;
        const result = await accountModel.getByEmail(email);
        if (result.verified !== true) {
            throw new ErrorHandler(403, "Account is not verified");
        }
        next()
    } catch (err) {
        next(err)
    }
} 