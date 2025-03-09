const express = require('express')
const userRouter = express.Router()
const userController = require('../Controllers/userController')
const multerMiddleware = require('../Middlewares/multerMiddleware')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

//Traveler-Registration
userRouter.post('/register', userController.travelerRegisterController)

//Traveler-login
userRouter.post('/login', userController.travelerLoginController)

module.exports = userRouter