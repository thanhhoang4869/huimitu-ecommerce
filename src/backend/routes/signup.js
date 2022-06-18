const signup = require('../controller/signup')

function assignRoutes(app) {
   app.post("/signup", signup.save)
}

module.exports = {
    assignRoutes
}