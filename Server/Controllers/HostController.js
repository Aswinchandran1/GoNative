const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require("../Models/userModel");
const experiences = require('../Models/ExperienceModel');

exports.hostRegisterController = async (req, res) => {
    console.log("Inside hostRegisterController");
    const { userName, phone, email, password, bio, title, location, googleMapLink, category, pricePerPerson, additionalServices, experienceImages, description, } = req.body

    try {
        const isExistingUser = await users.findOne({ email });
        if (isExistingUser) {
            return res.status(409).json({ message: "Email already exists, please login" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new users({
            userName,
            phone,
            role: "host",
            email,
            bio,
            password: hashedPassword,
        });
        await newUser.save();

        const newExperience = new experiences({
            hostId: newUser._id,
            title,
            location,
            googleMapLink,
            category,
            pricePerPerson,
            additionalServices,
            experienceImages,
            description
        })
        await newExperience.save()

        res.status(201).json({ message: "Host registered successfully", user: newUser, experience: newExperience });
    } catch (error) {
        console.log("Error in hostRegisterController", error);
        res.status(500).json({ message: "Internal server error" })
    }
}