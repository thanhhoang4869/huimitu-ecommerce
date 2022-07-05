import {ErrorHandler} from '#src/middlewares/errorHandler.mdw'

export default function unknownEndpoint(req, res) {
    throw new ErrorHandler(404, "Unknown endpoint")
};