//Import errors
const {BadRequest, Unauthorized} = require('../errors/index')

//Import util modules
const jwt = require('jsonwebtoken')

//Import schema models
const Appoiment = require('../models/appoimentSchema')
const User = require('../models/userSchema')

//Auth jwt middleware
const authJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || authHeader.startsWith('Bearer null')){
        throw new BadRequest('Please provide a valid token')
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const payLoad = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({_id: payLoad.userID}).select('-password')
        next()
    } catch (error) {
        next(error)
    }
}

//Export
module.exports = authJwt