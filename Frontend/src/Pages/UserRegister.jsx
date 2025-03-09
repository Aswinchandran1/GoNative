import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { travelerRegisterAPI } from '../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Yup validation schema
const schema = yup.object().shape({
  userName: yup.string().min(3, 'Name must be at least 3 characters').required('User Name is required'),
  nationality: yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabets allowed').required('Nationality is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const UserRegister = () => {
  const [formData, setFormData] = useState({ userName: '', nationality: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      try {
        const res = await travelerRegisterAPI(formData)
        if (res.status == 201) {
          toast.success(res.data.message);
          setTimeout(() => navigate('/login'), 1000);
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      }
    }
    catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="shadow-lg shadow-black p-7 flex flex-col bg-white rounded w-[450px]">
        <h1 className="text-center font-bold text-2xl">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="name" className="pb-1">User Name :</label>
            <TextField
              className="bg-gray-100"
              id="name"
              label="Enter your name"
              variant="outlined"
              size="small"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>

          {/* Nationality */}
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="nationality" className="pb-1">Nationality :</label>
            <TextField
              className="bg-gray-100"
              id="nationality"
              label="Enter your nationality"
              variant="outlined"
              size="small"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="email" className="pb-1">Email :</label>
            <TextField
              className="bg-gray-100"
              id="email"
              label="Enter your email"
              variant="outlined"
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="pb-1">Password :</label>
            <TextField
              className="bg-gray-100"
              id="password"
              label="Enter Password"
              type="password"
              variant="outlined"
              size="small"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Register Button */}
          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-fit mx-auto" variant="contained">
              Register
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?
          <Link to={'/login'} className="cursor-pointer text-blue-600 hover:text-blue-500 hover:underline">
            {' '}Sign in
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default UserRegister;
