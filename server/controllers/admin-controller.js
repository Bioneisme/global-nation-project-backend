const User = require('../models/user-model')

class AdminController {
    async getUsers(req, res, next) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()