const account = require('../controller/account')

function assignRoutes(app) {
    app.post("/login", account.login);
    app.post("/signup", account.signup);
}

module.exports = {
    assignRoutes
}