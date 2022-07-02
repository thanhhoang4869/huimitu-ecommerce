import { OAuth2Client } from 'google-auth-library'
import config from '#src/config/config'

const oauth2Client = new OAuth2Client(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET)
oauth2Client.setCredentials({
    refresh_token: config.GOOGLE_REFRESH_TOKEN
})

export default oauth2Client