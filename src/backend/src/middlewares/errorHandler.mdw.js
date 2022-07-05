class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;

    console.error(err);

    res.status(statusCode || 500).send({
        exitcode: 1,
        message: statusCode === 500 ? "An error occurred" : message,
    });
};

export {
    ErrorHandler,
    handleError
}