import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center ">
        {/* Left side - Logo */}
        <a href="/" className="text-blue-600 text-5xl font-bold">
          Go<span className='text-textColor text-3xl '>Native</span>
        </a>

        {/* Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-blue-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Center - Links */}
        <div className="hidden lg:flex space-x-8">
          <a href="#home" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>Home</a>
          <a href="#about" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>About</a>
          <a href="#services" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>Services</a>
        </div>

        {/* Right side - Login Button */}
        <div className='relative'>
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col items-center space-y-4 mt-4">
          <a href="#home" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>Home</a>
          <a href="#about" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>About</a>
          <a href="#services" className="text-text-textColor hover:text-gray-500  font-bold" style={{ fontSize: '21px' }}>Services</a>
        </div>
      )}
    </nav>

  );


}

export default Header