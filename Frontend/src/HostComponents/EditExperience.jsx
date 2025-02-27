import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaUpload } from 'react-icons/fa';

const EditExperience = () => {
  const [position, setPosition] = useState('');

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Edit Experience</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600 text-sm">Experience Title</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Enter your service name" variant="outlined" size="small" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Google Map Location</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Enter your Google map location" variant="outlined" size="small" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Additional Services</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Service1,Service2,Service3..." variant="outlined" size="small" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Price per Person</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Enter price" variant="outlined" size="small" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Category</label>
            <FormControl fullWidth>
              <InputLabel>Select category</InputLabel>
              <Select value={position} onChange={handleChange} size="small" className="bg-gray-100">
                <MenuItem value="Cultural">Cultural</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Wellness">Wellness</MenuItem>
                <MenuItem value="Unique">Unique</MenuItem>
                <MenuItem value="*">Others</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Location</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Enter your location" variant="outlined" size="small" />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="text-gray-600 text-sm">Upload Images</label>
            <div className="flex gap-3 mt-2">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <div key={index} className="relative w-24 h-24 border-2 border-dashed rounded-lg flex justify-center items-center hover:border-blue-500 cursor-pointer">
                    <input type="file" id={`img${index + 1}`} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <FaUpload className="text-gray-400 text-xl" />
                  </div>
                ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-gray-600 text-sm">Description</label>
            <TextField fullWidth className="bg-gray-100 rounded" label="Describe your service" multiline rows={4} variant="outlined" />
          </div>
        </div>

        <div className="text-center mt-6">
          <Button variant="contained" color="primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
            Update Experience
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;
