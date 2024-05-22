//Import util modules
const mongoose = require('mongoose')

//Barber schema
const barberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxLength: 50,
        minLength: 2
    },
    phoneNumber: {
        type: String,
        required: [true, 'Must provide a phone number'],
        match: [/^(?:\(?[1-9]{2}\)?) ?(?:9\d{4}|[2-9]\d{3})-?\d{4}$/, 'Please provide a valid phone number']
    },
    email: {
        type: String,
        required: [true, 'Must provide a email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true
    },
    isWorking: {
        type: Boolean,
        required: [true, 'Must provide the working status'],
        default: true
    }
}, {timestamps: true})

//Export
module.exports = mongoose.model('barber', barberSchema)