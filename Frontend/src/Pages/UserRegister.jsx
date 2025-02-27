import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('User Name is required'),
  nationality: yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabets allowed').required('Nationality is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', nationality: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('Registration Successful:', formData);
      setErrors({});
    } catch (validationErrors) {
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
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
    </div>
  );
};

export default UserRegister;
