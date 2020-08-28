const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, "I need your username"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            messsage: "Passwords are not the same"
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    ,
    passwordChangedAt: Date
    // other fields
})



// Password Encryption
userSchema.pre('save', async function (next) {
    // Don't encrypt unless newly created or changed
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined
    next()
})


// Compare passwords 
userSchema.methods.correctPassword = async function (canditatePassword, userPassword) {
    return await bcrypt.compare(canditatePassword, userPassword)
}


const User = mongoose.model('User', userSchema)

module.exports = User