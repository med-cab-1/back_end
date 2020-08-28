const User = require('../models/userModel')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const ailment = require('../models/ailmentModel')


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new AppError('Please login to continue', 401))
    }

    try {
        let decoded = await jwt.verify(token, process.env.JWT_SECRET)

        const currentUser = await User.findById(decoded.id)

        if (!currentUser) {
            return next(new AppError('The User belonging to this token no longer exists', 401))
        }
        req.user = currentUser
    } catch (error) {
        next(new AppError('Please login to continue', 401))
    }
    next()
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(new AppError("You do not have permission to perform this action", 403))
        }
        next()
    }
}

exports.register = async (req, res, next) => {
    try {
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })

        const token = signToken(user._id)

        user.password = undefined

        res.status(201)
            .json({
                status: 201,
                token,
                data: {
                    user
                }
            })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

exports.login = async (req, res, next) => {
    // compare email and password
    const { email, password } = req.body

    if (!email || !password) return next(new AppError('Please provide email and password', 400))
    try {
        const user = await User.findOne({ email }).select('+password')

        const correct = await user.correctPassword(password, user.password)

        if (!user, !correct) return next(new AppError("Incorrect email or password", 401))

        const token = signToken(user._id)

        res.status(200).json({
            status: 200,
            token
        })
    } catch (error) {
        next(new AppError("Incorrect email or password", 401))
    }
}

