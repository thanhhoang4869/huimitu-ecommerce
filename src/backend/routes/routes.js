const checkout = require('./checkout')
const signup = require('./signup')
const account = require('./account')

function assignRoutes(app){
    signup.assignRoutes(app)
    checkout.assignRoutes(app)
    account.assignRoutes(app)
}

module.exports = {
    assignRoutes
}