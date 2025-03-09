const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../Models/userModel");
const experiences = require('../Models/ExperienceModel');

exports.hostRegisterController = async (req, res) => {
    console.log("Inside hostRegisterController");
    const { userName, phone, email, password, bio, title, location, googleMapLink, category, pricePerPerson, additionalServices, description, } = req.body
    console.log(req.files); // Check if files are received correctly
    try {
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            return res.status(409).json({ message: "Email already exists, please login" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            userName,
            phone,
            role: "host",
            email,
            bio,
            password: hashedPassword,
        });
        await newUser.save();

        const experienceImages = req.files.map(file => file.path);

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

exports.hostLoginController = async (req, res) => {
    console.log("Inside hostLoginController");
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email, role: "host" })
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ userId: existingUser._id, role: "host" }, process.env.JWTPASSWORD)
        res.status(200).json({ host: existingUser, token })
    } catch (error) {
        console.log("Error in hostLoginController", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getAHostDetails = async (req, res) => {
    console.log("Inside getAHostDetails");
    const { hostId } = req.params

    try {
        const host = await User.findById({ _id: hostId })
        if (!host) {
            return res.status(404).json({ message: "Host not found" });
        }
        res.status(200).json(host);

    } catch (error) {

    }
}

exports.updateHostProfile = async (req, res) => {
    try {
        console.log("inside updateHostProfile");
        const { id } = req.params;
        const updateFields = req.body;

        if (req.file) {
            updateFields.profilePic = req.file.path;
        }

        const updatedHost = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedHost) {
            return res.status(404).json({ error: 'Host not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', host: updatedHost });
    } catch (error) {
        console.error("Error updating host profile:", error);
        res.status(500).json({ error: 'Server error while updating profile' });
    }
};
