import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (

    <div className='h-screen flex justify-center items-center'>
      <div className='shadow-lg shadow-black p-7 flex flex-col bg-white rounded w-[450px]' >
        <h1 className='text-center font-bold text-2xl'>Login</h1>
        <div className='flex flex-col gap-1 mb-5'>
          <label htmlFor="" className='pb-2'>Email :</label>
          <TextField className='bg-gray-100' id="email" label="email" variant="outlined" size="small" />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="" className='pb-2'>Password :</label>
          <TextField className='bg-gray-100' id="password" label="Password" type='password' variant="outlined" size="small" />
        </div>
        <div className='flex justify-center mt-4'>
          <Button className='w-fit mx-auto' variant="contained">Login</Button>
        </div>
        <p className='text-center mt-4'>Don't have an account? <Link to={'/user-register'} className='cursor-pointer text-blue-600 hover:text-blue-500 hover:underline '>Sign up</Link ></p>
      </div>
    </div>
  )
}

export default Login