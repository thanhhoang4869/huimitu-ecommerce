import config from '#src/config/config'
import nodemailer from 'nodemailer'
import oauthClient from '#src/utils/oauth2'

const accessToken = oauthClient.getAccessToken()

export default nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.GMAIL_USERNAME,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token
    },
})