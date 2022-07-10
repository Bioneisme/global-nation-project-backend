const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/permissions-middleware')
const courseController = require('../controllers/course-controller')

router.post('/createCourse', isAuth, courseController.createCourse)

router.get('/getCourseToEdit/:id', courseController.getCourseToEdit)

module.exports = router