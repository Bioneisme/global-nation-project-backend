const User = require('../models/user-model')
const Course = require('../models/course-model')
const userService = require("../services/user-service");

class AdminController {
    async getUsers(req, res, next) {
        try {
            const users = await User.find()

            return res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await User.findOne({email: req.params.email})
            if (!user)
                return res.status(400).json({'message': 'User not found'})

            return res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const email = req.body.email
            const user = await User.findOne({email: email})

            if (!user)
                return res.status(400).json({'message': 'User not found'})

            await User.deleteOne({email: email})
            return res.status(200).json({'message': 'User successful deleted'})
        } catch (e) {
            next(e)
        }
    }

    async addUser(req, res, next) {
        try {
            const {email, nickname, first_name, last_name, password} = req.body
            const user = await User.find({
                email: email,
                nickname: nickname
            })
            if (user.length !== 0)
                return res.status(409).json({'message': 'User with this email or nickname already exists'})

            await userService.registration(email, nickname, first_name, last_name, password)
            return res.status(200).json({'message': 'User successful created'})
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        try {
            const {id, email, nickname, first_name, last_name, roles} = req.body
            await User.findOneAndUpdate({_id: id}, {
                email,
                nickname,
                first_name,
                last_name,
                roles
            })
            return res.status(200).json({'message': 'User successful updated'})
        } catch (e) {
            next(e)
        }
    }

    async getCourses(req, res, next) {
        try {
            const courses = await Course.find()

            return res.status(200).json(courses)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()