import checkout from '#src/routes/checkout'
import account from '#src/routes/account'
import category from '#src/routes/category'

export default {
    assignRoutes(app) {
        checkout.assignRoutes(app)
        account.assignRoutes(app)
        category.assignRoutes(app)
    }
}