import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAHost } from '../Services/allAPI';

const HostProfile = () => {
  const [hostDetail, setHostDetail] = useState([])
  useEffect(() => {
    fetchHostDetails()
  }, [])

  const fetchHostDetails = async () => {
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
      }
      const res = await getAHost(hostId._id, reqHeader)
      if (res.status == 200) {
        setHostDetail(res.data)
      }
    } catch (error) {
      toast.error("Failed to fetch Host details.");
    }
  }

  console.log(hostDetail);
  console.log("HostProfile profilePic:", hostDetail.profilePic);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Host Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
            <img
              src={
                hostDetail?.profilePic ?  `http://localhost:5000/${hostDetail?.profilePic}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s"
              }

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
              <p className="text-gray-600 text-sm">User name</p>
              <p className="text-gray-900 font-semibold">{hostDetail?.userName}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
            <FaEnvelope className="text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-gray-900 font-semibold">{hostDetail?.email}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
            <FaPhone className="text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600 text-sm">Phone</p>
              <p className="text-gray-900 font-semibold">{hostDetail?.phone}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Description About Host</p>
            <p className="text-gray-900 font-semibold">
              {hostDetail?.bio}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Link
            to={`/host/edit-host-profile/${hostDetail?._id}`}
            className="px-8 py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default HostProfile;
``
