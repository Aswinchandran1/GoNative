import { TextField, Button } from '@mui/material';
import React from 'react';

const EditHostProfile = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="shadow-xl bg-white p-10 rounded-lg w-full max-w-lg">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                        <label htmlFor="img3" className="cursor-pointer">
                            <input type="file" id="img3" style={{ display: "none" }} />
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Click to change profile photo</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">User Name:</label>
                        <TextField 
                            className="bg-gray-100 rounded-md" 
                            label="Enter your name" 
                            variant="outlined" 
                            size="small" 
                            fullWidth 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">Phone:</label>
                        <TextField 
                            className="bg-gray-100 rounded-md" 
                            label="Enter your phone number" 
                            variant="outlined" 
                            size="small" 
                            fullWidth 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">Description About Host:</label>
                        <TextField 
                            className="bg-gray-100 rounded-md" 
                            label="Describe your expertise, experience, and what makes you a trustworthy host."
                            rows={4} 
                            multiline 
                            variant="outlined" 
                            fullWidth 
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center mt-6">
                    <Button variant="contained" color="primary" className="px-6 py-2 text-lg">
                        Save Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditHostProfile;
