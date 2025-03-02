const express = require('express')
const { hostRegisterController } = require('../Controllers/HostController')
const multerMiddleware = require('../Middlewares/multerMiddleware')
const hostRouter = express.Router()


//Traveler-Registration
hostRouter.post('/register', multerMiddleware.array("experienceImages",3) ,hostRegisterController)

module.exports=hostRouter