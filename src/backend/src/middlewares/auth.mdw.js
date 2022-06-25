import config from '#src/config/config'
import jwt from 'jsonwebtoken'

export default async function auth(req, res, next) {

    // Check for starting with noTokenUrl
    let requestToken = true;
    const noTokenUrl = config.NO_TOKEN_URL;
    for (let index in noTokenUrl) {
        const position = req.url.indexOf(noTokenUrl[index])
        if (position == 0) {
            requestToken = false;
            break
        }
    }

    if (requestToken) {
        const token = req.headers['access-token']
        try {
            const decoded = await jwt.verify(token, config.JWT_SECRET)
            req.payload = {
                email: decoded.email
            }
            next()
        } catch (err) {
            res.status(403).send({
                exitcode: 2,
                message: err
            })
        }
    } else {
        next()
    }
}