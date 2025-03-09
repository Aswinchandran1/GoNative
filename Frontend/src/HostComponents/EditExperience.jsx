import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAnExperience, updateExperience } from '../Services/allAPI';
import { useNavigate, useParams } from "react-router-dom";


const EditExperience = () => {
  const [experience, setExperience] = useState({
    title: "",
    googleMapLink: "",
    additionalServices: "",
    pricePerPerson: "",
    category: "",
    location: "",
    description: "",
    experienceImages: []
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams()
  console.log(id);
  const navigate = useNavigate()

  useEffect(() => {
    fetchHostedExperience()
  }, [])

  const validationSchema = Yup.object({
    title: Yup.string().required("Experience title is required"),
    googleMapLink: Yup.string()
      .url("Enter a valid URL")
      .required("Google Map location is required"),
    additionalServices: Yup.string().required("At least one service is required"),
    pricePerPerson: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string()
      .min(20, "Description should be at least 20 characters long")
      .required("Description is required"),
    experienceImages: Yup.array()
      .min(3, "All three images are required")
      .required("Images are required"),
  });

  const fetchHostedExperience = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const res = await getAnExperience(id, reqHeader);

      if (res.data) {
        setExperience(res.data);
      } else {
        toast.error("No experience found.");
      }
    } catch (error) {
      toast.error("Failed to fetch experience.");
    }
  };

  const handleChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
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

      setExperience((prev) => {
        const newImages = [...prev.experienceImages];
        newImages[index] = {
          file: file,
          preview: URL.createObjectURL(file),
        };

        return { ...prev, experienceImages: newImages };
      });

      setErrors({ ...errors, experienceImages: "" });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(experience, { abortEarly: false });
      setErrors({});
      try {
        const formData = new FormData();

        Object.keys(experience).forEach((key) => {
          if (key === "experienceImages") {
            experience.experienceImages.forEach((imgObj) => {
              if (imgObj?.file) {
                formData.append("experienceImages", imgObj.file);
              } else if (typeof imgObj === "string") {
                formData.append("existingImages", imgObj);
              }
            });
          } else {
            formData.append(key, experience[key]);
          }
        });

        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        const reqHeader = {
          "Authorization": `Bearer ${token}`,
        };

        const res = await updateExperience(id, formData, reqHeader);
        if (res.status === 200) {
          toast.success("Experience Updated");
          setTimeout(() => {
            navigate('/host/manage-experience')
          }, 100)
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
  };


  console.log(experience);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Edit Experience</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600 text-sm">Experience Title</label>
            <TextField fullWidth className="bg-gray-100 rounded" variant="outlined" size="small"
              name="title"
              value={experience?.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="text-gray-600 text-sm">Google Map Location</label>
            <TextField fullWidth className="bg-gray-100 rounded" variant="outlined" size="small"
              name="googleMapLink"
              value={experience?.googleMapLink}
              onChange={handleChange}
            />
            {errors.googleMapLink && <p className="text-red-500 text-sm">{errors.googleMapLink}</p>}
          </div>

          <div>
            <label className="text-gray-600 text-sm">Additional Services</label>
            <TextField fullWidth className="bg-gray-100 rounded" variant="outlined" size="small"
              name="additionalServices"
              value={experience?.additionalServices}
              onChange={handleChange}
            />
            {errors.additionalServices && <p className="text-red-500 text-sm">{errors.additionalServices}</p>}
          </div>

          <div>
            <label className="text-gray-600 text-sm">Price per Person</label>
            <TextField fullWidth className="bg-gray-100 rounded" variant="outlined" size="small"
              name="pricePerPerson"
              value={experience?.pricePerPerson}
              onChange={handleChange}
            />
            {errors.pricePerPerson && <p className="text-red-500 text-sm">{errors.pricePerPerson}</p>}
          </div>

          <div>
            <label className="text-gray-600 text-sm">Category</label>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Select category</InputLabel> */}
              <Select labelId="demo-simple-select-label" id="demo-simple-select" size="small" className="bg-gray-100"
                name="category"
                value={experience?.category}
                onChange={handleChange}
              >
                <MenuItem value="Cultural">Cultural</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Wellness">Wellness</MenuItem>
                <MenuItem value="Unique">Unique</MenuItem>
                <MenuItem value="*">Others</MenuItem>
              </Select>
            </FormControl>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

          </div>

          <div>
            <label className="text-gray-600 text-sm">Location</label>
            <TextField fullWidth className="bg-gray-100 rounded" variant="outlined" size="small"
              name="location"
              value={experience?.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Image Upload Section */}
          <div className='flex flex-col gap-1 mb-5'>
            <label htmlFor="" className='pb-2'>Images:</label>
            <div className="flex justify-around gap-4">

              {/* Image 1 */}
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
                    src={experience?.experienceImages[0]?.preview
                      ? experience?.experienceImages[0]?.preview
                      : `http://localhost:5000/${experience?.experienceImages?.[0]}`} alt="Preview 1"
                  />
                </label>
              </div>

              {/* Image 2 */}
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
                    src={experience?.experienceImages[1]?.preview
                      ? experience?.experienceImages[1]?.preview
                      : `http://localhost:5000/${experience?.experienceImages?.[1]}`} alt="Preview 2"
                  />
                </label>
              </div>

              {/* Image 3 */}
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
                    src={experience?.experienceImages[2]?.preview
                      ? experience?.experienceImages[2]?.preview
                      : `http://localhost:5000/${experience?.experienceImages?.[2]}`} alt="Preview 3"
                  />
                </label>
              </div>

            </div>
            {errors.experienceImages && <p className="text-red-500 text-sm mt-1">{errors.experienceImages}</p>}
          </div>


          <div className="md:col-span-2">
            <label className="text-gray-600 text-sm">Description</label>
            <TextField fullWidth className="bg-gray-100 rounded" multiline rows={4} variant="outlined"
              name="description"
              value={experience?.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
        </div>

        <div className="text-center mt-6">
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
            Update Experience
          </Button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />

    </div>
  );
};

export default EditExperience;
