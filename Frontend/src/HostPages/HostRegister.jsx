import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { hostRegisterAPI } from '../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stepOneSchema = yup.object().shape({
  title: yup.string().required("Experience title is required"),
  googleMapLink: yup.string().url("Enter a valid URL").required("Google Map location is required"),
  additionalServices: yup.string().required("At least one service is required"),
  pricePerPerson: yup.number().typeError("Price must be a number").positive("Price must be greater than 0").required("Price is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().min(20, "Description should be at least 20 characters long").required("Description is required"),
  experienceImages: yup.array().min(3, "All the three image are required").required("Images are required"),
});

const stepTwoSchema = yup.object().shape({
  userName: yup.string().min(3, "Name must be at least 3 characters").required("User name is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  bio: yup.string().min(20, "Description should be at least 20 characters long").required("Host description is required"),
});

const HostRegister = () => {

  const [regData, setregData] = useState({
    title: "",
    googleMapLink: "",
    additionalServices: "",
    pricePerPerson: "",
    category: "",
    location: "",
    experienceImages: [],
    description: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    bio: ""
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setregData({ ...regData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, experienceImages: "Only JPG, PNG, and JPEG formats are allowed" });
        return;
      }

      const newImages = [...regData.experienceImages]; // Copy existing images array
      newImages[index] = {
        file: file,
        preview: URL.createObjectURL(file), // Generate preview URL
      };

      setregData({ ...regData, experienceImages: newImages });
      setErrors({ ...errors, experienceImages: "" });
    }
  };

  const goToNext = async (e) => {
    e.preventDefault()
    try {
      await stepOneSchema.validate(regData, { abortEarly: false });
      console.log('Registration Successful:', regData);
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
      await stepTwoSchema.validate(regData, { abortEarly: false });
      console.log('Registration Successful:', regData);
      setErrors({});
      try {
        const formData = new FormData()

        Object.keys(regData).map((key) => {
          if (key === "experienceImages") {
            regData.experienceImages.forEach((imgObj, index) => {
              if (imgObj?.file) {
                formData.append(`experienceImages`, imgObj.file); // Append actual file
              }
            });
          } else {
            formData.append(key, regData[key]);
          }
        });

        const reqHeader = {
          "Content-Type": "multipart/form-data",
        };

        const res = await hostRegisterAPI(formData, reqHeader)
        if (res.status == 201) {
          toast.success(res.data.message);
          setTimeout(() => navigate('/host-login'), 1000);
        }

      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      }

    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
    }
  }

  console.log("HostRegister", regData);


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
                  value={regData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Google map location :</label>
                <TextField className='bg-gray-100' id="" label="Enter your google map location" variant="outlined" size="small"
                  name="googleMapLink"
                  value={regData.googleMapLink}
                  onChange={handleChange}
                />
                {errors.googleMapLink && <p className="text-red-500 text-sm mt-1">{errors.googleMapLink}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Additional services (separate with comas) :</label>
                <TextField className='bg-gray-100' id="" label="Service1,Service2,Service3...." variant="outlined" size="small"
                  name="additionalServices"
                  value={regData.additionalServices}
                  onChange={handleChange}
                />
                {errors.additionalServices && <p className="text-red-500 text-sm mt-1">{errors.additionalServices}</p>}
              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Price/person :</label>
                <TextField className='bg-gray-100' id="" label="Enter price" variant="outlined" size="small"
                  name="pricePerPerson"
                  value={regData.pricePerPerson}
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
                    value={regData.category}
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
                  value={regData.location}
                  onChange={handleChange}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              {/* IMAGES */}
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Images:</label>
                <div className="flex justify-around gap-4">
                  <div className="w-32 h-32 border-2 shadow p-3 rounded flex items-center justify-center overflow-hidden">
                    <label htmlFor="img1" className="cursor-pointer w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        id="img1"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageChange(e, 0)}
                      />
                      <img
                        className="w-full h-full object-cover"
                        src={regData.experienceImages[0]?.preview || "https://cdn-icons-png.flaticon.com/512/4725/4725573.png"}
                        alt="Preview 1"
                      />
                    </label>
                  </div>

                  <div className="w-32 h-32 border-2 shadow p-3 rounded flex items-center justify-center overflow-hidden">
                    <label htmlFor="img2" className="cursor-pointer w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        id="img2"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageChange(e, 1)}
                      />
                      <img
                        className="w-full h-full object-cover"
                        src={regData.experienceImages[1]?.preview || "https://cdn-icons-png.flaticon.com/512/4725/4725573.png"}
                        alt="Preview 2"
                      />
                    </label>
                  </div>

                  <div className="w-32 h-32 border-2 shadow p-3 rounded flex items-center justify-center overflow-hidden">
                    <label htmlFor="img3" className="cursor-pointer w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        id="img3"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageChange(e, 2)}
                      />
                      <img
                        className="w-full h-full object-cover"
                        src={regData.experienceImages[2]?.preview || "https://cdn-icons-png.flaticon.com/512/4725/4725573.png"}
                        alt="Preview 3"
                      />
                    </label>
                  </div>
                </div>
                {errors.experienceImages && <p className="text-red-500 text-sm mt-1">{errors.experienceImages}</p>}
              </div>


              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Description :</label>
                <TextField className='bg-gray-100 ' id="" label="Write a detail description about your service" placeholder="Placeholder" rows={4} multiline
                  name="description"
                  value={regData.description}
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
                    value={regData.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'> Phone:</label>
                  <TextField className='bg-gray-100' label="Enter your phone number" variant="outlined" size="small"
                    name="phone"
                    value={regData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Email :</label>
                  <TextField className='bg-gray-100' label="Enter Your email" variant="outlined" size="small"
                    name="email"
                    value={regData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Password :</label>
                  <TextField className='bg-gray-100' label="Enter Your password" variant="outlined" size="small" type='password'
                    name="password"
                    value={regData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Description About Host:</label>
                <TextField className='bg-gray-100 ' id="outlined-textarea" label="Describe your expertise, experience, and what makes you a trustworthy host." rows={4} multiline
                  name="bio"
                  value={regData.bio}
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
      <ToastContainer position="top-center" autoClose={1000} />

    </div>
  )
}

export default HostRegister