import express from 'express'
import cors from 'cors'
import routes from '#src/routes/index.routes'
import config from '#src/config/config'
import { handleError } from '#src/middlewares/errorHandler.mdw'
import unknownEndpoint from '#src/middlewares/unknownEndpoint.mdw'
import morganBody from 'morgan-body'

//==================== Library =======================
const app = express()

//#region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
morganBody(app)
app.use(routes)
app.use(unknownEndpoint)
app.use(handleError)
//#endregion middleware

//Start listen
app.listen(config.PORT, () => {
    console.log("Begin listen on port %s...", config.PORT);
})
