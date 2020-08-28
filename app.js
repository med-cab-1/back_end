const express = require('express')
const app = express()
const ailmentRouter = require('./routes/ailmentRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require("express-mongo-sanitize")
const xss = require('xss-clean')
const hpp = require('hpp')
const morgan = require('morgan')
const cors = require('cors')
const compression = require("compression")

app.use(compression())
app.use(helmet())
app.use(cors())
// app.use(morgan())

// *** Rate Limiters ***


// API limiter
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again later"
})

// Login limiter 
const loginLimiter = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: "Too many login attempts, please try again later"
})

// GLOBAL MIDDLEWARE

app.use('/api', limiter)
app.use('/api/v1/users/login', loginLimiter)

// JSON Parser
app.use(express.json({ limit: '10kb' }));

// *** Data Sanitization *** //

// noSQL Injection
app.use(mongoSanitize())

// XSS Attacks
app.use(xss())

// Parameter Pollution
app.use(hpp())

//Routes
app.get('/', (req, res) => {
    res.status(200).json({
        api: "Up",
        message: "Welcome to medcab API"
    })
})
app.use('/api/v1/ailments', ailmentRouter)
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})


// Global Error Handler
app.use(globalErrorHandler)

module.exports = app