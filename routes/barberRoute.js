//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {getAllBarbers, getBarber, createBarber, updateBarber, deleteBarber} = require('../controllers/barberController')

//Routes
router.route('/').get(getAllBarbers).post(createBarber)
router.route('/:id').get(getBarber).patch(updateBarber).delete(deleteBarber)

//Export
module.exports = router
