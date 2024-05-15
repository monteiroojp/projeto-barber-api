//Import status codes
const {StatusCodes} = require('http-status-codes')

//Error handler function
const errorHandler = (error, req, res, next) => {
    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || `Something went wrong, try again later`
    }

    if(error.code == 11000){
        customError.statusCode = 400
        customError.msg = `Duplicated values in ${Object.keys(error.keyValue)} fild/filds`
    }

    else if(error.name == "CastError"){
        customError.statusCode = 400
        customError.msg = `The sintax of the value ${error.path} is incorrect`
    }

    return res.status(customError.statusCode).send(customError.msg)
}

//Export
module.exports = errorHandler