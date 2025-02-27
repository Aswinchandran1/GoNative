import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const HostLogin = () => {
  // State for form data
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('Host Login Successful:', formData);
      setErrors({}); // Clear errors if validation passes
    } catch (validationErrors) {
      // Map Yup errors into an object
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
        <h1 className="text-center font-bold text-2xl">Host Login</h1>

        {/* Host Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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
            {/* Show error message if validation fails */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
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
            {/* Show error message if validation fails */}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-fit mx-auto" variant="contained">
              Login
            </Button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4">
          Don't have an account? 
          <Link to={'/host-register'} className="cursor-pointer text-blue-600 hover:text-blue-500 hover:underline">
            {' '}Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HostLogin;
