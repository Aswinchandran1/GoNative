const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the users collection
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    googleMapLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Cultural', 'Adventure', 'Wellness', 'Unique', 'Others']
    },
    pricePerPerson: {
        type: Number,
        required: true
    },
    additionalServices: {
        type: String
    }
    ,
    experienceImages: [
        { type: String }
    ],
    description: {
        type: String,
        required: true
    },
    availability: [
        {
            type: Date,
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
