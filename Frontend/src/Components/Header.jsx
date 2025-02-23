import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const [showLoginOptions, setShowLoginOptions] = useState(false)
  const location = useLocation(); // Get current route



  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center ">
        {/* Left side - Logo */}
        <a href="/" className="text-blue-600 text-5xl font-bold">
          Go<span className='text-textColor text-3xl '>Native</span>
        </a>
        {/* Right side - Login Button */}
        <div className='relative'>
          {
            location.pathname === "/" ?
              (
                <>
                  <button onClick={() => { setShowLoginOptions(!showLoginOptions) }} className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 text-xl font-bold'>Login</button>
                  {
                    showLoginOptions &&
                    <div className="absolute top-full mt-2 right-0 bg-white border border-blue-500 rounded-lg shadow-lg w-40 overflow-hidden">
                      <ul className="text-gray-700">
                        <li>
                          <Link to={'/login'} onClick={() => { setShowLoginOptions(false) }} className='w-full block px-4 py-2 text-left hover:bg-gray-100'>User Login</Link>
                        </li>
                        <li>
                          <Link to={'/host-login'} onClick={() => { setShowLoginOptions(false) }} className='w-full block px-4 py-2 text-left hover:bg-gray-100'>Host Login</Link>
                        </li>
                      </ul>
                    </div>
                  }
                </>
              )
              :
              (
                <div className='flex gap-16 items-center'>
                  <div>
                    <Link className='text-xl font-semibold text-black-600 border border-gray rounded-xl px-2 py-2 ' to={'/favourites'}>Favourite <i className="fa-solid fa-heart"></i></Link>
                  </div>
                  <button className="px-4 py-2 bg-red-700 text-white rounded-md">
                    Logout
                  </button>
                </div>
              )
          }

        </div>
      </div>


    </nav>

  );


}

export default Header