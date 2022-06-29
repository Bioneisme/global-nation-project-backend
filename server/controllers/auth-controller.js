const User = require('../models/user-model')
const userService = require('../services/user-service')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, nickname, first_name, last_name, password} = req.body
            if (await User.findOne({email: email})) return res.status(409).send('User with this email already exist')
            await userService.registration(email, nickname, first_name, last_name, password)
            return next()
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            req.logout()
            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({activationLink})

            if (!user) return res.status(400).send('Incorrect Activation Link')
            user.isActivated = true
            await user.save()
            res.status(200).send('Successful')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()