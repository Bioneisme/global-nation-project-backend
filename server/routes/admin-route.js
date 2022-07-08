const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')

router.get('/getUsers', adminController.getUsers)

module.exports = router