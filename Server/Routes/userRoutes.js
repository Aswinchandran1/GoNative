const express = require('express')
const userRouter = express.Router()
const userController = require('../Controllers/userController')

//Traveler-Registration
userRouter.post('/register', userController.travelerRegisterController)

//Traveler-login
userRouter.post('/login', userController.travelerLoginController)


module.exports = userRouter