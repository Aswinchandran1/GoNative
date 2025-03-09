import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAHost, updateHostDetails } from '../Services/allAPI';
import * as yup from 'yup';

const hostProfileSchema = yup.object().shape({
    userName: yup.string().required('User Name is required').min(3, 'Must be at least 3 characters'),
    phone: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    bio: yup.string().required('Description is required').min(20, 'Must be at least 20 characters'),
});

const EditHostProfile = () => {
    const [data, setData] = useState({
        userName: "",
        phone: "",
        bio: "",
        profilePic: null
    });

    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null); // State for preview image
    const { id } = useParams();

    useEffect(() => {
        fetchHostDetails();
    }, []);

    const fetchHostDetails = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }

        try {
            const reqHeader = { Authorization: `Bearer ${token}` };
            const res = await getAHost(id, reqHeader);
            if (res.status === 200) {
                setData({
                    userName: res.data.userName,
                    phone: res.data.phone,
                    bio: res.data.bio,
                    profilePic: res.data.profilePic || null,
                });
                setPreview(res.data.profilePic);
            }
        } catch (error) {
            toast.error("Failed to fetch Host details.");
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Validate file type
        if (file && !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            toast.error("Only JPG, JPEG, and PNG images are allowed!");
            return;
        }

        setData((prev) => ({ ...prev, profilePic: file }));
        setPreview(URL.createObjectURL(file)); // Set preview for the selected image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await hostProfileSchema.validate(data, { abortEarly: false });
            setErrors({});
            try {
                const formData = new FormData();
                formData.append('userName', data.userName);
                formData.append('phone', data.phone);
                formData.append('bio', data.bio);
                if (data.profilePic) {
                    formData.append('profilePic', data.profilePic);
                }
                const token = sessionStorage.getItem('token');
                if (!token) {
                    toast.error("No token found. Please log in.");
                    return;
                }
                const reqHeader = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                };
                // Api Call
                const res = await updateHostDetails(id, formData, reqHeader)
                if (res.status == 200) {
                    toast.success('Profile updated successfully!');
                }
            } catch (error) {
                toast.error('Profile updatation Failed!');
                console.log(error);
            }

        } catch (err) {
            const newErrors = {};
            err.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
        }
    };
    console.log("data", data);
    console.log("EditHostProfile profilePic:", data.profilePic);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="shadow-xl bg-white p-10 rounded-lg w-full max-w-lg">
                <ToastContainer />

                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                        <label htmlFor="img3" className="cursor-pointer">
                            <input type="file" id="img3" style={{ display: "none" }} onChange={handleImageChange} />
                            <img
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s'
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Click to change profile photo</p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">User Name:</label>
                        <TextField
                            className="bg-gray-100 rounded-md"
                            label="Enter your name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name='userName'
                            value={data?.userName}
                            onChange={handleChange}
                        />
                        {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">Phone:</label>
                        <TextField
                            className="bg-gray-100 rounded-md"
                            label="Enter your phone number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name='phone'
                            value={data?.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
                            name='bio'
                            value={data?.bio}
                            onChange={handleChange}
                        />
                        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mt-6">
                        <Button type="submit" variant="contained" color="primary" className="px-6 py-2 text-lg">
                            Save Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditHostProfile;
