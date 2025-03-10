const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['traveler', 'host', 'admin'],
        default: 'traveler'
    },
    phone: {
        type: String,
    },
    nationality: {
        type: String,
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience"
        }
    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User