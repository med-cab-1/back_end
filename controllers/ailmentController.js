const Ailment = require('../models/ailmentModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const axios = require('axios')

exports.getAllAilments = catchAsync(async (req, res, next) => {
    let allAilments = await Ailment.find()
    res.status(201).json({
        status: 201,
        results: allAilments.length,
        data: {
            Ailments: allAilments
        }
    })
})

exports.postAilment = async (req, res, next) => {

    const { input_phrase } = req.body

    console.log(input_phrase)

    try {
        let response = await axios.post('https://med-cab-2020.herokuapp.com/predict', { input_phrase })
        let recommendation = response.data

        let newAilment = {
            name: req.body.name,
            description: req.body.description,
            owner: req.user._id,
            recommendation
        }

        let ailment = await Ailment.create(newAilment)
        res.status(200).json({
            status: 200,
            payload: {
                ailment
            }
        })
    } catch (error) {
        next(new AppError("Unable to create ailment", 500))
    }
}

exports.getAilment = async (req, res, next) => {
    try {
        const { id } = req.params

        let ailment = await Ailment.findById(id)

        res.status(201).json({
            status: 200,
            payload: {
                ailment
            }
        })
    } catch (error) {
        return next(new AppError(`Couldn't find ailment with id of ${req.params.id}`, 404))
    }
}

exports.deleteAilment = async (req, res, next) => {
    let { id } = req.params

    try {
        let ailment = await Ailment.findById(id)

        let userIsOwnerOfAilment = ailment.isOwner(req.user, ailment)

        //  Return error if user isn't owner of the ailment
        if (!userIsOwnerOfAilment && req.user.role !== 'admin') {
            return next(new AppError("You don't own this ailment", 401))
        }

        // otherwise delete ailment
        await Ailment.findByIdAndDelete(id)

        res.status(200).json({
            status: 200,
            message: `Successfully deleted ailment with ID of ${id}`
        })
    } catch (error) {
        res.send('shit')
    }
    next()
}

exports.updateAilment = async (req, res, next) => {
    let { id } = req.params

    try {

        let ailment = await Ailment.findById(id)

        let userIsOwnerOfAilment = ailment.isOwner(req.user, ailment)

        //  Return error if user isn't owner of the ailment
        if (!userIsOwnerOfAilment && req.user.role !== 'admin') {
            return next(new AppError("You don't own this ailment", 401))
        }

        let newAilment = await Ailment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: 201,
            payload: {
                ailment: newAilment
            }
        })
    } catch (error) {
        next(new AppError(`Unable to update ailment with ID of ${id}`))
    }
}

