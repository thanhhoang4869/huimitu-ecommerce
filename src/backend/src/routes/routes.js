import checkout from './../routes/checkout.js'
import account from './../routes/account.js'

export default {
    assignRoutes(app) {
        checkout.assignRoutes(app)
        account.assignRoutes(app)
    }
}