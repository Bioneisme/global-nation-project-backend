const Course = require('../models/course-model')

class UserController {
    async getUser(req, res, next) {
        try {
            if (!req.user)
                return res.status(404).json({'message': 'User not found'})
            return res.status(200).json(req.user)
        }
        catch (e) {
            next(e)
        }
    }

    async getUserCourses(req, res, next) {
        try {
            if (!req.user)
                return res.status(404).json({'message': 'User not found'})

            const courses = await Course.find({author: req.user})
            return res.status(200).json(courses)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()