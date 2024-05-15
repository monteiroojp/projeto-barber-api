//Create router
const express = require('express')
const router = express.Router()

//Controllers import
const {getAllServices, createService, updateService, deleteService} = require('../controllers/serviceController')

//Routes
router.route('/').get(getAllServices).post(createService)
router.route('/:id').patch(updateService).delete(deleteService)

//Export
module.exports = router
