import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaClipboardList, FaImages, FaLayerGroup } from 'react-icons/fa';

const ManageExperience = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Experience Preview</h1>

        {/* Experience Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaClipboardList className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Experience Title</p>
              <p className="text-gray-900 font-semibold">Sunset Trekking</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Google Map Location</p>
              <a
                href="https://maps.app.goo.gl/NovzHc9Q7qxkGWvX9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                Click Here
              </a>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaClipboardList className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Additional Services</p>
              <p className="text-gray-900 font-semibold">Local Guide, Transport</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaDollarSign className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Price per Person</p>
              <p className="text-gray-900 font-semibold">$50</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaLayerGroup className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="text-gray-900 font-semibold">Adventure</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Location</p>
            <p className="text-gray-900 font-semibold">Munnar, Kerala</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Description</p>
            <p className="text-gray-900 font-semibold">
              Experience an unforgettable sunset trek through scenic trails.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Images</p>
            <div className="flex gap-3 mt-2">
              <img
                src="https://munnarinfo.in/uploads/profile/1560610709fdewrjya758276.jpg"
                alt="Experience"
                className="w-24 h-24 rounded-lg shadow-lg"
              />
              <img
                src="https://munnarinfo.in/uploads/profile/1560610709fdewrjya758276.jpg"
                alt="Experience"
                className="w-24 h-24 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Link
            to={'/host/edit-experience/123'}
            className="px-8 py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageExperience;
