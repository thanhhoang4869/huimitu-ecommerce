const checkout = require('../controller/checkout')

function assignRoutes(app) {
   app.post("/create-payment",checkout.create_payment);
   app.post("/execute-payment",checkout.execute_payment);
}

module.exports = {
    assignRoutes
}