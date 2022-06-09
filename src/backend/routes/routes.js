const checkout = require('./checkout')

function assignRoutes(app){
    checkout.assignRoutes(app)
}

module.exports = {
    assignRoutes
}