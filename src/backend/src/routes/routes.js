const checkout = require('./checkout')
const account = require('./account')

function assignRoutes(app){
    checkout.assignRoutes(app)
    account.assignRoutes(app)
}

module.exports = {
    assignRoutes
}