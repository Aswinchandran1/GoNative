import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';


const HostRegister = () => {

  const [position, setPosition] = useState("")
  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  const [step, setStep] = useState(1)


  return (
    <div className='h-screen flex justify-center items-center my-16'>
      {
        step === 1 && (
          <div className='shadow-lg shadow-black p-7 flex flex-col bg-white rounded w-[1050px]'>
            <h1 className='text-center font-bold text-2xl'>Host Registration</h1>
            <div className='grid grid-cols-1  md:grid-cols-2 gap-6 w-full mt-6 justify-center'>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Experience Title :</label>
                <TextField className='bg-gray-100' id="" label="Enter your service name" variant="outlined" size="small" />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Google map location :</label>
                <TextField className='bg-gray-100' id="" label="Enter your google map location" variant="outlined" size="small" />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Additional services (separate with comas) :</label>
                <TextField className='bg-gray-100' id="" label="Service1,Service2,Service3...." variant="outlined" size="small" />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Price/person :</label>
                <TextField className='bg-gray-100' id="" label="Enter price" variant="outlined" size="small" />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Category :</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={position} label="Select category" onChange={handleChange}
                    size="small" className='bg-gray-100 '>
                    <MenuItem value={"Cultural"}>Cultural</MenuItem>
                    <MenuItem value={"Adventure"}>Adventure</MenuItem>
                    <MenuItem value={"Wellness"}>Wellness</MenuItem>
                    <MenuItem value={"Unique"}>Unique</MenuItem>
                    <MenuItem value={"*"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Location :</label>
                <TextField className='bg-gray-100' id="" label="Enter your Location" variant="outlined" size="small" />
              </div>
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
                <TextField className='bg-gray-100 ' id="outlined-textarea" label="Write a detail description about your service" placeholder="Placeholder" rows={4} multiline />
              </div>
    
            </div>

            <Button onClick={()=>{setStep(step+1)}} style={{ height: '50px' }} variant="contained">Next</Button>

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
                  <TextField className='bg-gray-100' id="" label="Enter your name" variant="outlined" size="small" />
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'> Phone:</label>
                  <TextField className='bg-gray-100' id="" label="Enter your phone number" variant="outlined" size="small" />
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Email :</label>
                  <TextField className='bg-gray-100' id="" label="Enter Your email" variant="outlined" size="small" />
                </div>

                <div className='flex flex-col gap-1 mb-5'>
                  <label htmlFor="" className='pb-2'>Password :</label>
                  <TextField className='bg-gray-100' id="" label="Enter Your password" variant="outlined" size="small" type='password' />
                </div>

              </div>

              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="" className='pb-2'>Description About Host:</label>
                <TextField className='bg-gray-100 ' id="outlined-textarea" label="Describe your expertise, experience, and what makes you a trustworthy host." rows={4} multiline />
              </div>

              <div className='flex justify-evenly'>
                <Button onClick={()=>{setStep(step-1)}} style={{ height: '50px' }} variant="contained">Previous</Button>
                <Button style={{ height: '50px',background:'#28a745' }} variant="contained"  >Register</Button>
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