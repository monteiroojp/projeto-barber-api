//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {signUpUser, loginUser} = require('../controllers/loginController')

//Routes
router.route('/signUp').post(signUpUser)
router.route('/login').post(loginUser)

//Export
module.exports = router
