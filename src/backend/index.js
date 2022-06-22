import express from 'express'
import route from './src/routes/routes.js'
import config from './src/config/config.js'
import cors from 'cors'
import logger from './src/logger/logger.js'
import auth from './src/auth/auth.js'

const app = express()
//==================== Library =======================

//#region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(logger)
app.use(auth)
//#endregion middleware

//Bind route
route.assignRoutes(app)

//Start listen
app.listen(config.server.port, () => {
    console.log("Begin listen on port %s...", config.server.port);
})
