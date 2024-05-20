//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {getAllServices,getService, createService, updateService, deleteService} = require('../controllers/serviceController')

//Routes
router.route('/').get(getAllServices).post(createService)
router.route('/:id').get(getService).patch(updateService).delete(deleteService)

//Export
module.exports = router
