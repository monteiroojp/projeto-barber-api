//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import model
const Barber = require('../models/barberSchema')

//Controllers
const getAllBarbers = async (req, res) => {
    const barber = await Barber.find({})
    res.status(StatusCodes.OK).json({allBarbers: barber, totalBarbers: barber.length})
}

const createBarber = async (req, res) => {
    const barber = await Barber.create(req.body)
    res.status(StatusCodes.CREATED).json({barber})
}

const updateBarber = async (req, res) => {
    const barberID = req.params.id
    const barber = await Barber.findOneAndUpdate({_id: barberID}, req.body, {
        runValidators: true,
        new: true
    })

    if(!barber){
        throw new NotFound('There is no barber with this ID')
    }

    res.status(StatusCodes.OK).json({updated: true, uptadedBarber: barber})
}

const deleteBarber = async (req, res) => {
    const barberID = req.params.id
    const barber = await Barber.findOneAndDelete({_id: barberID})

    if(!barber){
        throw new NotFound('There is no barber with this ID')
    }

    res.status(StatusCodes.OK).json({deleted: true, barberDeleted: barber})
}

//Export
module.exports = {
    getAllBarbers,
    createBarber,
    updateBarber,
    deleteBarber,
}