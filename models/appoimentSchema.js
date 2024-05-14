//Import util modules
const mongoose = require('mongoose')

//Schema
const appoimentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Must provide a userID']
    },
    services: {
        type: String,
        required: [true, 'Must provide the services chosen by the client']
    },
    scheduledTime:{
        type: String,
        required: [true, 'Must provide the appoiments time']
    },
    choosenBarber: {
        type: String,
        required: [true, 'Must provide a chosen barber']
    },
    status: {
        type: String,
        enum: {
            values: ['Created', 'Canceled', 'Done'],
            message: 'The status provided do not match the current options'
        },
        required: [true, 'Must provide a status'],
        default: 'Created'
    },
    appoimentDuration: {
        type: Number,
        required: [true, 'Must provied the appoiments duration']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Must provide the total price of the service']
    }
}, {timestamps: true})

//Export
module.exports = mongoose.model('appoiment', appoimentSchema)