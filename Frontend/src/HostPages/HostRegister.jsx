import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import * as yup from 'yup';


const stepOneSchema = yup.object().shape({
  title: yup.string().required("Experience title is required"),
  googleMapLocation: yup.string().url("Enter a valid URL").required("Google Map location is required"),
  additionalServices: yup.string().required("At least one service is required"),
  pricePerPerson: yup.number().typeError("Price must be a number").positive("Price must be greater than 0").required("Price is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().min(20, "Description should be at least 20 characters long").required("Description is required"),
});

const stepTwoSchema = yup.object().shape({
  userName: yup.string().min(3, "Name must be at least 3 characters").required("User name is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  bio: yup.string().min(20, "Description should be at least 20 characters long").required("Host description is required"),
});

const HostRegister = () => {
  const [formData, setFormData] = useState({
    title: "",
    googleMapLocation: "",
    additionalServices: "",
    pricePerPerson: "",
    category: "",
    location: "",
    description: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    bio: ""
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const goToNext = async (e) => {
    e.preventDefault()
    try {
      await stepOneSchema.validate(formData, { abortEarly: false });
      console.log('Registration Successful:', formData);
      setErrors({});
      setStep(step + 1)
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await stepTwoSchema.validate(formData, { abortEarly: false });
      console.log('Registration Successful:', formData);
      setErrors({});
      // API CALL
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }


  return (
    <div className='h-screen flex justify-center items-center my-16'>
      {
        step === 1 && (
          <div className='shadow-lg shadow-black p-7 flex flex-col bg-white rounded w-[1050px]'>
            <h1 className='text-center font-bold text-2xl'>Host Registration</h1>
            <div className='grid grid-cols-1  md:grid-cols-2 gap-6 w-full mt-6 justify-center'>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Experience Title :</label>
                <TextField className='bg-gray-100' id="" label="Enter your service name" variant="outlined" size="small"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Google map location :</label>
                <TextField className='bg-gray-100' id="" label="Enter your google map location" variant="outlined" size="small"
                  name="googleMapLocation"
                  value={formData.googleMapLocation}
                  onChange={handleChange}
                />
                {errors.googleMapLocation && <p className="text-red-500 text-sm mt-1">{errors.googleMapLocation}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Additional services (separate with comas) :</label>
                <TextField className='bg-gray-100' id="" label="Service1,Service2,Service3...." variant="outlined" size="small"
                  name="additionalServices"
                  value={formData.additionalServices}
                  onChange={handleChange}
                />
                {errors.additionalServices && <p className="text-red-500 text-sm mt-1">{errors.additionalServices}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Price/person :</label>
                <TextField className='bg-gray-100' id="" label="Enter price" variant="outlined" size="small"
                  name="pricePerPerson"
                  value={formData.pricePerPerson}
                  onChange={handleChange}
                />
                {errors.pricePerPerson && <p className="text-red-500 text-sm mt-1">{errors.pricePerPerson}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Category :</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}

                    size="small" className='bg-gray-100 '>
                    <MenuItem value={"Cultural"}>Cultural</MenuItem>
                    <MenuItem value={"Adventure"}>Adventure</MenuItem>
                    <MenuItem value={"Wellness"}>Wellness</MenuItem>
                    <MenuItem value={"Unique"}>Unique</MenuItem>
                    <MenuItem value={"*"}>Others</MenuItem>
                  </Select>
                </FormControl>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Location :</label>
                <TextField className='bg-gray-100' id="" label="Enter your Location" variant="outlined" size="small"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              {/* IMAGES */}
              <div className='flex flex-col gap-1 mb-5'>

                <label htmlFor="" className='pb-2'>Images : </label>

                <div className="flex justify-around">
                  <div className='border-2 shadow p-3 rounded'>
                    <label htmlFor="img1" >
                      <input type="file" id='img1' style={{ display: "none" }} />
                      <img width={'80px'} src="https://cdn-icons-png.flaticon.com/512/4725/4725573.png" alt="" />
                    </label>
                  </div>

                  <div className='border-2 shadow p-3 rounded'>
                    <label htmlFor="img2" >
                      <input type="file" id='img2' style={{ display: "none" }} />
                      <img width={'80px'} src="https://cdn-icons-png.flaticon.com/512/4725/4725573.png" alt="" />
                    </label>
                  </div>

                  <div className='border-2 shadow p-3 rounded'>
                    <label htmlFor="img3" >
                      <input type="file" id='img3' style={{ display: "none" }} />
                      <img width={'80px'} src="https://cdn-icons-png.flaticon.com/512/4725/4725573.png" alt="" />
                    </label>
                  </div>
                  
                </div>

              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Description :</label>
                <TextField className='bg-gray-100 ' id="" label="Write a detail description about your service" placeholder="Placeholder" rows={4} multiline
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

            </div>

            <Button onClick={goToNext} style={{ height: '50px' }} variant="contained">Next</Button>

            <p className='text-center mt-4'>Already have an account? <Link to={'/host-login'} className='cursor-pointer text-blue-600 hover:text-blue-500 hover:underline '>Sign in</Link ></p>
          </div>
        )
      }
      {
        step === 2 && (
          <>
            <div className='shadow-lg shadow-black p-7 flex flex-col bg-white rounded w-[1050px]'>
              <h1 className='text-center font-bold text-2xl'>Host Registration</h1>
              <div className='grid grid-cols-1  md:grid-cols-2 gap-6 w-full mt-6 justify-center'>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>User Name :</label>
                  <TextField className='bg-gray-100' label="Enter your name" variant="outlined" size="small"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'> Phone:</label>
                  <TextField className='bg-gray-100' label="Enter your phone number" variant="outlined" size="small"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Email :</label>
                  <TextField className='bg-gray-100' label="Enter Your email" variant="outlined" size="small"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Password :</label>
                  <TextField className='bg-gray-100' label="Enter Your password" variant="outlined" size="small" type='password'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Description About Host:</label>
                <TextField className='bg-gray-100 ' id="outlined-textarea" label="Describe your expertise, experience, and what makes you a trustworthy host." rows={4} multiline
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>

              <div className='flex justify-evenly'>
                <Button onClick={() => { setStep(step - 1) }} style={{ height: '50px' }} variant="contained">Previous</Button>
                <Button onClick={handleSubmit} style={{ height: '50px', background: '#28a745' }} variant="contained"  >Register</Button>
              </div>

              <p className='text-center mt-4'>Already have an account?
                <Link to={'/host-login'} className='cursor-pointer text-blue-600 hover:text-blue-500 hover:underline '>Sign in</Link ></p>
            </div>
          </>
        )
      }

    </div>
  )
}

export default HostRegister