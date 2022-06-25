import express from 'express'
import cors from 'cors'
import routes from '#src/routes/index.routes'
import log from '#src/middlewares/log.mdw'
import auth from '#src/middlewares/auth.mdw'
import config from '#src/config/config'

const app = express()
//==================== Library =======================

//#region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(log)
app.use(auth)
//#endregion middleware

//Bind route
app.use(routes)

//Start listen
app.listen(config.PORT, () => {
    console.log("Begin listen on port %s...", config.PORT);
})
