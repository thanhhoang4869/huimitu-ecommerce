import account from '#src/controller/account'

export default {
    assignRoutes(app) {
        app.post("/login", account.login);
        app.post("/signup", account.signup);
    }
} 