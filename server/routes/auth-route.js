const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth-controller')

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).json("Successful Login")
})

router.post('/register', authController.registration, passport.authenticate('local'), async (req, res) => {
    res.status(200).json("Successful Register")
})

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

router.get('/google/callback', passport.authenticate('google', {}), async (req, res) => {
    res.status(200).json("Successful Login via Google")
})

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {}), async (req, res) => {
    res.status(200).json("Successful Login via Facebook")
})

router.post('/password-reset', authController.passwordReset)

router.get('/reset/:link', authController.reset)

router.post('/reset/:link', authController.updatePassword)

router.get('/logout', authController.logout)

router.get('/activate/:link', authController.activate)


module.exports = router
