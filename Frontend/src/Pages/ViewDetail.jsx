import React, { useEffect, useState } from 'react';
import Booking from '../Components/Booking';
import { useParams } from 'react-router-dom';
import { getAHost, getAnExperience } from '../Services/allAPI';
import { toast } from 'react-toastify';

const ViewDetail = () => {
  const [experience, setExperience] = useState(null);
  const [host, setHost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams(); // Get experience ID from the URL parameters

  useEffect(() => {
    fetchExperience(); // Fetch experience details when the component mounts or ID changes
  }, [id]);

  // Function to fetch experience details from API
  const fetchExperience = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const res = await getAnExperience(id, reqHeader);
      setExperience(res.data);
      if (res.data.hostId) {
        fetchHost(res.data.hostId, reqHeader);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch host details based on hostId
  const fetchHost = async (hostId, reqHeader) => {
    try {
      const res = await getAHost(hostId, reqHeader);
      setHost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Exp", experience);
  console.log("host", host);
  const servicesArray = experience?.additionalServices?.split(',') || [];


  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '89vh' }}>
        <div className="mx-36 my-8">
          {/* Experience Title, Location, Favorite Button & Rating */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="pb-2 text-2xl font-bold">{experience?.title}</h1>
              <h5 className="text-xl font-bold">{experience?.location}</h5>
            </div>
            <div className="flex gap-5 items-center">
              <h1>
                <i className="fa-solid fa-star text-xl font-bold" style={{ color: '#e7c54b' }}> </i> 4.1
              </h1>
              <h1 className="border px-1 py-1 rounded bg-gray-200 cursor-pointer hover:bg-gray-300">
                <i className="fa-regular fa-heart text-xl font-bold" style={{ color: '#db1f1f' }}></i> Add to Fav
              </h1>
            </div>
          </div>

          {/* Experience Images */}
          <div className="sm:mx-8 md:mx-9 lg:mx-32 border my-6 sm:h-[350px]">
            <div className="sm:grid grid-cols-2 gap-2">
              <div>
                <img
                  className="w-full h-full object-cover mb-2"
                  src={`http://localhost:5000/${experience?.experienceImages?.[0] || 'default.jpg'}`}
                  alt="Experience Image"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div style={{ height: '175px' }} className="flex justify-center items-center">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000/${experience?.experienceImages?.[1]}`}
                    alt="Experience Image"
                  />
                </div>
                <div style={{ height: '175px' }} className="flex justify-center items-center">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000/${experience?.experienceImages?.[2]}`}
                    alt="Experience Image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Experience Details and Booking Section */}
          <div className="sm:grid grid-cols-[60%_30%] gap-20 mt-10">
            {/* Experience Info: About Host, Description, Additional Services */}
            <div>
              {/* Host Information */}
              <div className="flex justify-between items-center pb-5 border-gray-400 border-b-2">
                <h1 className="text-xl font-bold">Hosted By, {host?.userName}</h1>
                <div className="overflow-hidden rounded-full" style={{ height: '60px', width: '60px' }}>
                  <img
                    src={host?.profilePic
                      ? `http://localhost:5000/${host.profilePic}`
                      : "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569"}
                    alt="Host Profile"
                  />
                </div>
              </div>

              {/* Experience Description */}
              <div className="mt-4 pb-5 border-gray-400 border-b-2">
                <h1 className="text-xl font-bold pb-3">What you'll do</h1>
                <p className="text-justify">{experience?.description}</p>
              </div>

              {/* Additional Services Included */}
              <div className="mt-4 pb-5 border-gray-400 border-b-2">
                <h1 className="text-xl font-bold pb-3">What's included</h1>
                <div className="flex gap-5 flex-wrap">
                  {servicesArray.length > 0 ? (
                    servicesArray.map((service, index) => (
                      <div key={index} className="border border-black py-6 px-8 rounded-xl">
                        {service}
                      </div>
                    ))
                  ) : (
                    <p>No additional services available</p>
                  )}
                </div>
              </div>

              {/* Host Bio */}
              <div className="my-4">
                <div className="flex items-center gap-5">
                  <div className="overflow-hidden rounded-full" style={{ height: '60px', width: '60px' }}>
                    <img
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569"
                      alt="Host"
                    />
                  </div>
                  <h1 className="text-xl font-bold">Meet your host, {host?.userName}</h1>
                </div>
                <p className="pt-2 text-justify">{host?.bio}</p>
              </div>
            </div>

            {/* Booking Section */}
            <div className="mb-4">
              <Booking />
            </div>
          </div>

          {/* Google Map Integration */}
          <div className="border-gray-400 border-t-2">
            <h1 className="text-xl font-bold pt-4 pb-3">Where you’ll be</h1>
            <iframe
              src={experience?.googleMapLink}
              width="100%"
              height="450"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Comments Section */}
          <h3 className='text-center mt-3 text-xl font-bold'>Comments</h3>
          <div className="flex gap-4 items-center my-5">
            <input 
              type="text" 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..." 
              className="border border-gray-400 px-4 py-2 rounded-lg w-full"
            />
            <button 
              onClick={handleCommentSubmit} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </div>
         

          <div className="grid md:grid-cols-2 gap-x-16 mt-16">
            <div>
              <div className="flex gap-4 items-center pb-4">
                <div className="overflow-hidden rounded-full" style={{ height: '40px', width: '40px' }}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569" alt="User" />
                </div>
                <p>Max <br />22 Feb</p>
              </div>
              <p className="text-justify text-gray-700">Lorem ipsum...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetail;
