const account = require('../controller/account')

function assignRoutes(app) {
   app.post("/login",account.login);
}

module.exports = {
    assignRoutes
}