const checkout = require('./checkout')
const signup = require('./signup')

function assignRoutes(app){
    checkout.assignRoutes(app)
    signup.assignRoutes(app)
}

module.exports = {
    assignRoutes
}