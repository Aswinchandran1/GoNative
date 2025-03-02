const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const { hostRegisterController } = require('../Controllers/HostController')

//Traveler-Registration
router.post('/register-traveler', userController.travelerRegisterController)

//Traveler-login
router.post('/login-traveler', userController.travelerLoginController)

//Traveler-Registration
router.post('/register-host', hostRegisterController)

module.exports = router