const checkout = require('routes/checkout')
const account = require('routes/account')

function assignRoutes(app){
    checkout.assignRoutes(app)
    account.assignRoutes(app)
}

module.exports = {
    assignRoutes
}