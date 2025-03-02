const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require("../Models/userModel");

// Registration for travalers
exports.travelerRegisterController = async (req, res) => {
    console.log("inside travelerRegisterController");
    const { userName, nationality, email, password } = req.body;
    try {
        const isExistingUser = await users.findOne({ email });
        if (isExistingUser) {
            return res.status(409).json({ message: "Email already exists, please login" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new users({
            userName,
            nationality,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in travelerRegisterController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Login for travelers
exports.travelerLoginController = async (req, res) => {
    console.log("Inside travelerLoginController");
    const { email, password } = req.body
    try {

        const existingUser = await users.findOne({ email,role: "traveler" })
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token=jwt.sign({userId:existingUser._id,role: existingUser.role},process.env.JWTPASSWORD)
        console.log(token);
        
        res.status(200).json({user:existingUser,token})
    } catch (error) {
        console.log("Error in travelerLoginController", error);
        res.status(500).json({ message: "Internal server error" })
    }
}
