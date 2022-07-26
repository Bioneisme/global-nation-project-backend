const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin-controller')

router.get('/getUsers', adminController.getUsers)

router.get('/getUser/:email', adminController.getUser)

router.post('/deleteUser', adminController.deleteUser)

router.post('/addUser', adminController.addUser)

router.post('/updateUser', adminController.updateUser)

router.get('/getCourses', adminController.getCourses)

module.exports = router