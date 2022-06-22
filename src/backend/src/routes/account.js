import account from './../controller/account.js'

export default {
    assignRoutes(app) {
        app.post("/login", account.login);
        app.post("/signup", account.signup);
    }
} 