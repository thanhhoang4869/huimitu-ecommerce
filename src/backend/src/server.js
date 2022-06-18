const   express = require('express')
        app = express()
        route = require('./routes/routes')
        jwt = require('jsonwebtoken')
        config = require('./config/config')
        cors = require('cors')
        logger = require('./logger/logger')
        auth = require('./auth/auth')
        db = require('./utils/db')

//==================== Library =======================

//#region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(logger.logger)
app.use(auth.auth)
//#endregion middleware

//Bind route
route.assignRoutes(app)

//Start listen
app.listen(config.server.port, () => {
    console.log("Begin listen on port %s...",config.server.port);
})
