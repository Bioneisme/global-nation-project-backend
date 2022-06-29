const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth-controller')

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).send("Successful")
})

router.post('/register', authController.registration, passport.authenticate('local'), async (req, res) => {
    res.status(200).send("Successful")
})

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

router.get('/google/callback', passport.authenticate('google', {}), async (req, res) => {
    res.status(200).send("Successful")
})

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {}), async (req, res) => {
    res.status(200).send("Successful")
})

router.get('/logout', authController.logout)

router.get('/activate/:link', authController.activate)


module.exports = router
