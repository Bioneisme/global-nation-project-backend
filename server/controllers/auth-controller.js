const User = require('../models/user-model')
const userService = require('../services/user-service')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, nickname, first_name, last_name, password} = req.body
            if (await User.findOne({email: email})) return res.status(409).json('User with this email already exist')
            await userService.registration(email, nickname, first_name, last_name, password)
            return next()
        } catch (e) {
            next(e)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const link = req.params.link
            if (!await User.findOne({resetLink: link}))
                return res.status(400).json('Password link is invalid or has expired')
            await userService.updatePassword(link, req.body.password)

            res.status(200).json('Successful. Password changed')
        } catch (e) {
            next(e)
        }
    }

    async passwordReset(req, res, next) {
        try {
            if (req.user != null)
                await userService.passwordReset(req.user._id, null)
            else {
                if (!await User.findOne({email: req.body.email}))
                    return res.status(409).json('User with this email doesnt exists')
                await userService.passwordReset(null, req.body.email)
            }
            req.logout()
            res.status(200).json('Successful. Link has been sent to mail')
        } catch (e) {
            next(e)
        }
    }

    async reset(req, res, next) {
        try {
            const resetLink = req.params.link;
            const user = await User.findOne({resetLink})
            if (!user) return res.status(400).json('Password link is invalid or has expired')

            res.status(200).json({user: user, message: 'Password link accepted'})
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({activationLink})

            if (!user) return res.status(400).json('Incorrect Activation Link')
            user.isActivated = true
            await user.save()
            res.status(200).json('Successful Activated')
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            req.logout()
            res.status(200).json('Successful Logout')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()