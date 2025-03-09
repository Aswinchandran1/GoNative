import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaClipboardList, FaLayerGroup } from 'react-icons/fa';
import { getHostedExperience } from '../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageExperience = () => {
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    fetchHostedExperience();
  }, []);

  const fetchHostedExperience = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }
    const hostData = sessionStorage.getItem("host");
    if (!hostData) {
      toast.error("No host found.Please log in.");
      return;
    }

    const hostId = JSON.parse(hostData);

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const res = await getHostedExperience(hostId._id, reqHeader);

      if (res.data) {
        setExperience(res.data); // Save experience data in state
      } else {
        toast.error("No experience found.");
      }
    } catch (error) {
      toast.error("Failed to fetch experience.");
    }
  };

  if (!experience) {
    return <p className="text-center text-gray-600 mt-10">Loading experience...</p>;
  }

  console.log(experience);

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
              <p className="text-gray-900 font-semibold">{experience?.title}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Google Map Location</p>
              <a
                href={experience?.googleMapLink}
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
              <p className="text-gray-900 font-semibold">{experience?.additionalServices || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaDollarSign className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Price per Person</p>
              <p className="text-gray-900 font-semibold">${experience?.pricePerPerson}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaLayerGroup className="text-blue-600 mr-3 text-lg" />
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="text-gray-900 font-semibold">{experience?.category}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Location</p>
            <p className="text-gray-900 font-semibold">{experience?.location}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Description</p>
            <p className="text-gray-900 font-semibold">{experience?.description}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Images</p>
            <div className="flex gap-3 mt-2">
              {experience?.experienceImages?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt="Experience"
                  className="w-24 h-24 rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Link
            to={`/host/edit-experience/${experience?._id}`}
            className="px-8 py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Experience
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default ManageExperience;
