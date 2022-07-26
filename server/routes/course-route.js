const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/permissions-middleware')
const courseController = require('../controllers/course-controller')

router.post('/createCourse', isAuth, courseController.createCourse)
router.get('/getCourse/:id', courseController.getCourse)
router.get('/getCourseToEdit/:id', courseController.getCourseToEdit)
router.delete('/deleteCourse', courseController.deleteCourse)

router.post('/createLesson', isAuth, courseController.createLesson)
router.get('/getLesson/:id', courseController.getLesson)
router.get('/getLessonToEdit/:id', courseController.getLessonToEdit)
router.delete('/deleteLesson', courseController.deleteLesson)


module.exports = router