import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main style={{ paddingTop: '80px' }}>
      <div className='flex justify-center items-center flex-col' style={{ minHeight: "60vh" }}>

        <h1 className='text-5xl text-center font-bold leading-normal'>Connecting <span className='text-blue-600'>Travelers  with</span>  <br /> Authentic Local Experiences.</h1>
        <p className='p-4 text-xl text-center font-medium'>Connect with locals and immerse yourself in  authentic cultural, adventure, and <br />wellness activities.</p>
        <Link to='/login' className='bg-blue-600 mt-4 text-white px-6 py-2 rounded-full hover:bg-blue-500 text-lg font-bold' >Get Started</Link>

      </div>
      <div className='bg-gradient-to-b from-white to-blue-600 flex justify-center items-center flex-col' style={{ minHeight: '50vh' }}>
        <h1 className='pb-8 font-bold text-3xl text-textColor'>Explore Categories </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-10">
          <div className="bg-white p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center">Cultural</div>
          <div className="bg-white p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center">Adventure</div>
          <div className="bg-white p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center">Wellness</div>
          <div className="bg-white p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center">Unique</div>
        </div>
      </div>
    </main>
  )
}

export default Home