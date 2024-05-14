//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {getAllAppointments, createAppoiment, getAppoiment, updateAppoiment, deleteAppoiment} = require('../controllers/appoimentController')

//Routes
router.route('/').get(getAllAppointments).post(createAppoiment)
router.route('/:id').get(getAppoiment).patch(updateAppoiment).delete(deleteAppoiment)

//Export
module.exports = router
