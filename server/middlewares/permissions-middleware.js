class PermissionsMiddleware {
    async isAdmin(req, res, next) {
        try {
            const userRoles = req.user.roles;

            let isAdmin = false
            userRoles.forEach(role => {
                if ('ADMIN'.includes(role)) {
                    isAdmin = true
                }
            })

            if (isAdmin) return next()
            return res.status(400).json({'message': 'You don\'t have access!'})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PermissionsMiddleware()