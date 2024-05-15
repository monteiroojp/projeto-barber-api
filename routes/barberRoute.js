//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {getAllBarbers, createBarber, updateBarber, deleteBarber} = require('../controllers/barberController')

//Routes
router.route('/').get(getAllBarbers).post(createBarber)
router.route('/:id').patch(updateBarber).delete(deleteBarber)

//Export
module.exports = router
