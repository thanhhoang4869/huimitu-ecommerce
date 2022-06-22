import checkout from '#src/routes/checkout'
import account from '#src/routes/account'

export default {
    assignRoutes(app) {
        checkout.assignRoutes(app)
        account.assignRoutes(app)
    }
}