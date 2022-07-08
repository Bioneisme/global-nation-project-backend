class UserController {
    async getUser(req, res, next) {
        try {
            if (req.user == null)
                res.status(404).json({'message': 'User not found'})
            res.status(200).json(req.user)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()