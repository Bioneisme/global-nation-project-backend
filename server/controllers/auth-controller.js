const User = require('../models/user-model')
const userService = require('../services/user-service')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, nickname, first_name, last_name, password} = req.body
            if (await User.findOne({email: email})) return res.status(409).json({'message': 'User with this email already exist'})
            await userService.registration(email, nickname, first_name, last_name, password)
            return next()
        } catch (e) {
            next(e)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const code = req.body.code
            if (!await User.findOne({resetCode: code}))
                return res.status(400).json({'message': 'Password code is invalid or has expired'})
            await userService.updatePassword(code, req.body.password)

            res.status(200).json({'message': 'Successful. Password changed'})
        } catch (e) {
            next(e)
        }
    }

    async resetCode(req, res, next) {
        try {
            if (req.user != null)
                await userService.passwordReset(req.user._id, null)
            else {
                if (!await User.findOne({email: req.body.email}))
                    return res.status(409).json({'message': 'User with this email already exist'})
                await userService.passwordReset(null, req.body.email)
            }
            req.logout()
            res.status(200).json({'message': 'Successful. Code has been sent to mail'})
        } catch (e) {
            next(e)
        }
    }

    async confirmResetCode(req, res, next) {
        try {
            const resetCode = req.body.code;
            const user = await User.findOne({resetCode})
            if (!user) return res.status(400).json({'message': 'Reset Code is invalid or has expired'})

            res.status(200).json({user: user, message: 'Password code accepted'})
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationCode = req.body.code;
            const user = await User.findOne({activationCode})

            if (!user) return res.status(400).json({'message': 'Incorrect Activation Code'})
            user.isActivated = true
            user.activationCode = null
            await user.save()
            res.status(200).json({'message': 'Successful Activated'})
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            req.logout()
            res.status(200).json({'message': 'Successful Logout'})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()