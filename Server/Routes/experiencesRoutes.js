const express = require('express')
const experienceRouter = express.Router()
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')
const { getAllExperiences, toggleFavorite, getFavorites, getAnExperience, getUserFavorites, getAnExperienceForHost, editExperienceDetails, modifyAvailability, getAvailability } = require('../Controllers/ExperienceController')

experienceRouter.get('/getAll-experiences', jwtMiddleware, getAllExperiences)

experienceRouter.get(`/getAn-experience/:id`, jwtMiddleware, getAnExperience)

experienceRouter.put('/toggle-favorites/:experienceId', jwtMiddleware, toggleFavorite)

experienceRouter.get("/user-favorites", jwtMiddleware, getUserFavorites);

experienceRouter.get('/getAll-favorites', jwtMiddleware, getFavorites)

experienceRouter.get('/get-hostedExp/:hostId', jwtMiddleware, getAnExperienceForHost);

experienceRouter.put('/edit-experience/:id', jwtMiddleware, multerMiddleware.array("experienceImages", 3), editExperienceDetails)

experienceRouter.patch('/add-availability/:hostId', jwtMiddleware, modifyAvailability)

experienceRouter.get("/get-availability/:hostId", jwtMiddleware, getAvailability);


module.exports = experienceRouter