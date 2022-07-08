const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth-controller')

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).json(req.user)
})

router.post('/register', authController.registration, passport.authenticate('local'), async (req, res) => {
    res.status(200).json(req.user)
})

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL + '/profile'
}))

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL + '/profile'
}))

router.get('/logout', authController.logout)

router.post('/activate', authController.activate)

router.post('/sendResetCode', authController.resetCode)

router.post('/confirmResetCode', authController.confirmResetCode)

router.post('/updatePassword', authController.updatePassword)


module.exports = router
