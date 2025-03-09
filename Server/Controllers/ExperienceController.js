const Experience = require('../Models/ExperienceModel');
const User = require('../Models/userModel');

//*********************** For Trvelers **************************

// To get all experiences  
exports.getAllExperiences = async (req, res) => {
    console.log("Inside getAllExperiences");
    try {
        const allExperiences = await Experience.find({ isBlocked: false, status: "approved" });

        if (allExperiences.length === 0) {
            return res.status(200).json({ message: "No approved experiences available." });
        }

        res.status(200).json(allExperiences);
    } catch (error) {
        console.error("Error in getAllExperiences:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// To get a prticular experience
exports.getAnExperience = async (req, res) => {
    console.log("Inside getAnExperience");
    const { id } = req.params
    try {
        const experience = await Experience.findById({ _id: id });

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(200).json(experience);
    } catch (error) {
        console.error("Error in getAnExperience:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ADD to Favoutite /Remove form Favoutite
exports.toggleFavorite = async (req, res) => {
    console.log("Inside toggleFavorite");
    const { experienceId } = req.params
    const userId = req.user._id
    console.log(userId);

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User Not FOund" })
        }

        const experience = await Experience.findById(experienceId)
        if (!experience) {
            return res.status(404).json({ message: "Experience Not FOund" })
        }

        const isFavourite = user.favorites.includes(experienceId)
        if (isFavourite) {
            user.favorites = user.favorites.filter(id => id.toString() !== experienceId);
            await user.save();
            return res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
        } else {
            user.favorites.push(experienceId);
            await user.save();
            return res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
        }
    } catch (error) {
        console.error("Error in toggleFavorite:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


}

exports.getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("favorites");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ favorites: user.favorites.map(exp => exp._id) });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getFavorites = async (req, res) => {
    console.log("Inside getFavorites");
    const userId = req.user._id
    try {
        const user = await User.findById(userId).populate("favorites")
        console.log(user.favorites);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error("Error in getFavorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}


//*********************** For Hosts **************************

exports.getAnExperienceForHost = async (req, res) => {
    console.log("Inside getAnExperienceForHost");
    const { hostId } = req.params
    try {
        const experience = await Experience.findOne({ hostId: hostId });

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(200).json(experience);
    } catch (error) {
        console.error("Error in getAnExperience:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

exports.editExperienceDetails = async (req, res) => {
    console.log("inside editExperienceDetails");
    const { id } = req.params
    console.log("id", id);

    try {
        const { title, googleMapLink, additionalServices, pricePerPerson, category, location, description, existingImages } = req.body
        const hostId = req.user._id
        console.log(hostId);

        let parsedExistingImages = [];
        if (existingImages) {
            parsedExistingImages = Array.isArray(existingImages) ? existingImages : [existingImages];
        }

        let newImages = [];
        if (req.files) {
            newImages = req.files.map((file) => file.path);
        }

        const experienceImages = [...parsedExistingImages, ...newImages];

        const updatedExperience = await Experience.findByIdAndUpdate(id, { hostId, title, googleMapLink, additionalServices, pricePerPerson, category, location, description, experienceImages }, { new: true })

        if (!updatedExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(200).json(updatedExperience);
    } catch (error) {
        console.error("Error in editExperienceDetails:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

exports.modifyAvailability = async (req, res) => {
    try {
        const { hostId } = req.params;
        const { dates } = req.body;

        if (!dates || !Array.isArray(dates)) {
            return res.status(400).json({ message: "Invalid dates format." });
        }

        const experience = await Experience.findOne({ hostId: hostId });
        if (!experience) {
            return res.status(404).json({ message: "Experience not found." });
        }

        // Convert dates to Date objects and ensure they are unique
        const newDates = dates.map(date => new Date(date)).filter(date => date > new Date());

        // Merge unique dates without duplication
        const uniqueAvailability = Array.from(new Set([...experience.availability.map(date => date.toISOString()), ...newDates.map(date => date.toISOString())]))
            .map(date => new Date(date));

        experience.availability = uniqueAvailability;

        await experience.save();

        res.status(200).json({ message: "Availability updated successfully.", availability: experience.availability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

exports.getAvailability = async (req, res) => {
    console.log("inside getAvailability");
    
    try {
        const { hostId } = req.params;

        const experience = await Experience.findOne({ hostId: hostId });
        if (!experience) {
            return res.status(404).json({ message: "Experience not found." });
        }

        res.status(200).json({ dates: experience.availability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};