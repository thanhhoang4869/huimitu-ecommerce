import config from '#src/config/config'
import jwt from 'jsonwebtoken'
import { ErrorHandler } from '#src/middlewares/errorHandler.mdw'

export default function verifyLogin(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        throw new ErrorHandler(401, "Missing token");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.payload = {
            email: decoded.email
        }
        next()
    } catch (err) {
        throw new ErrorHandler(401, err.message)
    }
} 