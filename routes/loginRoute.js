//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {signUpUser, loginUser, updateUser} = require('../controllers/loginController')

//Routes
router.route('/signUp').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/forgotPassword').patch(updateUser)

//Export
module.exports = router
