
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(500).json({
            status: 500,
            message: "Something went terribly wrong"
        })
    }
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    switch (process.env.NODE_ENV) {
        case 'development':
            return sendErrorDev(err, res)
        case 'production':
            return sendErrorProd(err, res)
        default:
            return sendErrorProd(err, res)
    }
}