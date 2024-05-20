//Import util
const mongoose = require('mongoose')

//Service schema
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a service name'],
        trim: true,
        minLength: 2,
        maxLength: 50,
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'Must provide service duration']
    },
    price: {
        type: Number, 
        required: [true, 'Must provide service price']
    },
    description: {
        type: String,
        default: 'Prices are in R$ and duration in minutes'
    }
}, { timestamps: true });


module.exports = mongoose.model('Service', serviceSchema);