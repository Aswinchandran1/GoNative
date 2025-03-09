import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const isHostRoute = location.pathname.startsWith("/host");
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if it's an admin route

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-blue-600 text-5xl font-bold">
          Go<span className="text-textColor text-3xl">Native</span>
        </Link>

        {/* Login & Logout */}
        <div className="relative">
          {location.pathname === "/" ? (
            <>
              <button
                onClick={() => setShowLoginOptions(!showLoginOptions)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 text-xl font-bold transition"
              >
                Login
              </button>

              {/* Dropdown for Login Options */}
              {showLoginOptions && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-blue-500 rounded-lg shadow-lg w-40">
                  <ul className="text-gray-700">
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setShowLoginOptions(false)}
                        className="w-full block px-4 py-2 hover:bg-gray-100"
                      >
                        User Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/host-login"
                        onClick={() => setShowLoginOptions(false)}
                        className="w-full block px-4 py-2 hover:bg-gray-100"
                      >
                        Host Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-6 items-center">
              {/* Show Favourites only if NOT an admin route */}
              {!isHostRoute && !isAdminRoute && (
                <Link
                  to="/favourites"
                  className="text-lg font-semibold border border-gray-300 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
                >
                  Favourites <i className="fa-solid fa-heart text-red-500"></i>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
