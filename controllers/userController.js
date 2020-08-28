const Ailment = require('../models/ailmentModel')
const User = require('../models/userModel')
const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find()
        res.status(201).json({
            status: 201,
            results: users.length,
            data: {
                users
            }
        })
    } catch (error) {
        next(new AppError("No idea man", 500))
    }
};
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.getCurrentUser = async (req, res, next) => {
    const { id } = req.user
    if (!id) return next(new AppError('Please login and try again', 404))

    try {
        const user = await User.findById(id)
        res.status(200).json({
            status: 200,
            payload: {
                user
            }
        })
    } catch (error) {
        next(new AppError(`Couldn't find user with ID of ${id}`))
    }
    next()
}

exports.getCurrentUsersAilments = async (req, res, next) => {
    const { id } = req.user

    try {
        const userAilments = await Ailment.find({owner: req.user._id})
        res.status(200).json({
            status: 200,
            results: userAilments.length
            ,
            payload: {
                ailments: userAilments
            }
        })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
    next()
}