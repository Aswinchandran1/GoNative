const express = require('express')
const { hostRegisterController, hostLoginController, getAHostDetails, updateHostProfile } = require('../Controllers/HostController')
const multerMiddleware = require('../Middlewares/multerMiddleware')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const hostRouter = express.Router()


//Host-Registration & Experience Creation
hostRouter.post('/register', multerMiddleware.array("experienceImages", 3), hostRegisterController)

//Host-login
hostRouter.post('/login', hostLoginController)

//Get a host
hostRouter.get('/getAHost/:hostId',jwtMiddleware,getAHostDetails)

hostRouter.put('/edit-host-details/:id',multerMiddleware.single('profilePic'),jwtMiddleware,updateHostProfile)

module.exports = hostRouter