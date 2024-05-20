//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import model
const Service = require('../models/serviceSchema')

//Controllers
const getAllServices = async (req, res) => {
    const service = await Service.find(req.body)
    res.status(StatusCodes.OK).json({allservices: service, totalservices: service.length})
}

const getService = async (req, res) => {
    const serviceID = req.params.id
    const service = await Service.findOne({_id: serviceID})

    if(!Service){
        throw new NotFound('There is no user with this ID or the appoiment does not belong to this user')
    }

    res.status(StatusCodes.OK).json({service})
}

const createService = async (req, res) => {
    const service = await Service.create(req.body)
    res.status(StatusCodes.CREATED).json({service})
}

const updateService = async (req, res) => {
    const serviceID = req.params.id
    const service = await Service.findOneAndUpdate({_id: serviceID}, req.body, {
        runValidators: true,
        new: true
    })

    if(!service){
        throw new NotFound('There is no service with this ID')
    }

    res.status(StatusCodes.OK).json({updated: true, uptadedservice: service})
}

const deleteService = async (req, res) => {
    const serviceID = req.params.id
    const service = await Service.findOneAndDelete({_id: serviceID})

    if(!service){
        throw new NotFound('There is no service with this ID')
    }

    res.status(StatusCodes.OK).json({deleted: true, serviceDeleted: service})
}

//Export
module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
}