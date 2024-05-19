//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import model
const User = require('../models/userSchema.js')

//Controllers
const signUpUser = async (req, res) => {
    const user = await User.create(req.body)
    const token = await user.createToken()
    res.status(StatusCodes.CREATED).json({token})
}


const loginUser = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if(!user || user.length === 0){
        throw new NotFound('There is no user with this email')  
    }

    const isAuthorized = await user.verifyPassword(password)

    if(!isAuthorized){
        throw new Unauthorized('Invalid credentials')
    }
  
    const token = await user.createToken()
    res.status(StatusCodes.OK).json({token})
}

const updateUser = async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOneAndUpdate(
        { email: email },
        { password: newPassword },
        { runValidators: true, new: true }
    ).select('-password');

    if (!user || user.length === 0) {
        throw new NotFound('There is no user with this email');
    }

    res.status(StatusCodes.OK).json({ updated: true, userUpdated: user });
};

//Export
module.exports = {
    loginUser,
    signUpUser,
    updateUser
}