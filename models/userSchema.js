//Import util modules
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Must provide a email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must provide a password']
    }
}, {timestamps: true})

//Schema pre functions
userSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

//Schema methods
userSchema.methods.createToken = async function () {
    return jwt.sign({userID: this._id, username: this.name}, process.env.JWT_SECRET, {expiresIn: '90d'})
}

userSchema.methods.verifyPassword = async function (passwordToVerify) {
    return bcryptjs.compare(passwordToVerify, this.password)
}

//Export model
module.exports = mongoose.model('user', userSchema)