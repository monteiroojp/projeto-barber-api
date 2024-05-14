//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {signUpBarber, loginBarber} = require('../controllers/loginController')

//Routes
router.route('/signUp').post(signUpBarber)
router.route('/login').post(loginBarber)

//Export
module.exports = router
