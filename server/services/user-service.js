const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../services/mail-service')
const User = require('../models/user-model')
const UserDto = require('../dtos/user-dto')

class UserService{
    async login(email, password, done){
        const user = await User.findOne({email: email})
            if (!user) {
            return done("User with this email doesnt exist", false)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            return done("Incorrect email or password", false)
        }
        const userDto = new UserDto(user)

        done(null, user)
        return {user: userDto}
    }
    async registration(email, nickname, first_name, last_name, password) {
        const hashPassword = await bcrypt.hash(password, 4)
        const activationLink = uuid.v4()
        const user = await User.create({
            email,
            nickname,
            first_name,
            last_name,
            activationLink,
            password: hashPassword,
            roles: ["USER"]
        })
        await mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)

        return {user: userDto}
    }
    async googleAuth(googleId, first_name, last_name, email, nickname, image = null, token, done) {
        let user = await User.findOne({email: email});
        if (user) {
            user = await User.findOneAndUpdate({email: email}, {
                token: token
            })
            done(null, user)
        } else {
            user = await User.create({
                googleId,
                image,
                first_name,
                last_name,
                email,
                nickname,
                token,
                roles: ["USER"],
                isActivated: true
            })
            done(null, user)
        }
        const userDto = new UserDto(user)

        return {user: userDto}
    }
    async facebookAuth(facebookId, first_name, last_name, email, nickname, image = null, done) {
        let user = await User.findOne({email: email});
        if (user) {
            done(null, user)
        } else {
            user = await User.create({
                facebookId,
                image,
                first_name,
                last_name,
                email,
                nickname,
                roles: ["USER"],
                isActivated: true
            })
            done(null, user)
        }
        const userDto = new UserDto(user)

        return {user: userDto}
    }
    async updatePassword(resetLink, password) {
        const hashPassword = await bcrypt.hash(password, 4)
        await User.findOneAndUpdate({resetLink: resetLink}, {password: hashPassword, resetLink: null})
    }
    async passwordReset(id, email) {
        let user
        if (id != null)
            user = await User.findOne({_id: id})
        else
            user = await User.findOne({email: email})

        const resetLink = uuid.v4()
        await User.findOneAndUpdate({email: user.email}, {resetLink: resetLink})
        await mailService.sendResetLink(user.email, `${process.env.SERVER_URL}/api/reset/${resetLink}`)
    }
}

module.exports = new UserService()