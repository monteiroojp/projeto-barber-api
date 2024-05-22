//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import models
const Appoiment = require('../models/appoimentSchema.js')
const Service = require('../models/serviceSchema')

//Controllers
const getAllAppointments = async (req, res) => {
    const {choosenBarber, sort, status, createdBy} = req.query
    let queryObject = {}

    if(choosenBarber){
        queryObject.choosenBarber = {$regex: choosenBarber, $options: 'i'}
    }
    else if(status){
        queryObject.status = status
    }

    else if(createdBy){
        queryObject.createdBy = req.user._id
    }
    
    let result = Appoiment.find(queryObject)
    
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const skip = (page -1) * limit
    result = result.limit(limit).skip(skip)

    const appoiments = await result
    res.status(200).json({allAppoiments: appoiments, totalAppoiments: appoiments.length})
}

const createAppoiment = async (req, res) => {
    req.body.createdBy = req.user._id
    //Extract service infos
    const service = await Service.findOne({_id: req.body.services})
    req.body.appoimentDuration = service.duration
    req.body.totalPrice = service.price

    //Create appoiment
    const appoiment = await Appoiment.create(req.body)
    res.status(StatusCodes.CREATED).json({appoiment})
}

const getAppoiment = async (req, res) => {
    const appoimentId = req.params.id
    const appoiment = await Appoiment.findOne({_id: appoimentId, createdBy: req.user._id})

    if(!appoiment){
        throw new NotFound('There is no user with this ID or the appoiment does not belong to this user')
    }

    res.status(StatusCodes.OK).json({appoiment})
}

const updateAppoiment = async (req, res) => {
    const appoimentId = req.params.id
    const appoiment = await Appoiment.findOneAndUpdate({_id: appoimentId, createdBy: req.user._id}, req.body, {
        runValidators: true,
        new: true
    })

    if(!appoiment){
        throw new NotFound('There is no user with this ID or the appoiment does not belong to this user')
    }

    res.status(StatusCodes.OK).json({updated: true, uptadedAppoiment: appoiment})
}

const deleteAppoiment = async (req, res) => {
    const appoimentId = req.params.id
    const appoiment = await Appoiment.findOneAndDelete({_id: appoimentId, createdBy: req.user._id})


    if(!appoiment){
        throw new NotFound('There is no user with this ID or the appoiment does not belong to this user')
    }

    res.status(StatusCodes.OK).json({deleted: true, appoimentDeleted: appoiment})
}

//Export
module.exports = {
    getAllAppointments,
    createAppoiment,
    getAppoiment,
    updateAppoiment,
    deleteAppoiment
}