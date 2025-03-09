const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

const jwtMiddleware = async (req, res, next) => {
    console.log("inside jwtMiddleware");
    
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. No Token Provided!" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPASSWORD);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User does not exist" });
        }

        if (user.isBanned) {
            return res.status(403).json({ message: "Forbidden: User is banned" });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "Invalid or Expired Token!" });
    }
};

module.exports = jwtMiddleware