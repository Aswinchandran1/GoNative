import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const HostProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Host Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Host Profile Picture</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
            <FaUser className="text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600 text-sm">User Name</p>
              <p className="text-gray-900 font-semibold">John Doe</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
            <FaEnvelope className="text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-gray-900 font-semibold">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
            <FaPhone className="text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600 text-sm">Phone</p>
              <p className="text-gray-900 font-semibold">+91 9876543210</p>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Description About Host</p>
            <p className="text-gray-900 font-semibold">
              Passionate traveler & host, providing unique experiences for explorers worldwide.
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Link
            to={'/host/edit-host-profile/123'}
            className="px-8 py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
``
