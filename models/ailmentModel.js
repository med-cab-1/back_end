const mongoose = require('mongoose')
const { ObjectID } = require('bson')


const ailmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    owner: {
        type: ObjectID,
        required: true
    },
    recommendation: {
        type: Object,
        required: true
    }
    // other fields
})



ailmentSchema.methods.isOwner = (user, ailment) => {
    // Convert to strings for comparison


    userID = String(user._id)
    ownerID = String(ailment.owner)


    return userID === ownerID
}

module.exports = mongoose.model('Ailment', ailmentSchema)



