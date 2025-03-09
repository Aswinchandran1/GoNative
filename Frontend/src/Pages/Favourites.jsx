import React, { useEffect, useState } from 'react'
import ExploreCard from '../Components/ExploreCard'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllFavorites } from '../Services/allAPI';


const Favourites = () => {
  const [favExperiences, setFavExperiences] = useState([])
  useEffect(() => {
    fetchAllFavExperiences()
  }, [])

  const fetchAllFavExperiences = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };

      const res = await getAllFavorites(reqHeader)
      setFavExperiences(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(favExperiences);


  return (
    <div style={{ paddingTop: '80px', minHeight: "89vh" }}>
      <div className='mx-16 my-8'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  mt-7">
          {
            favExperiences.length > 0 ?
            favExperiences.map(experience => (
                <ExploreCard key={experience._id} displayData={experience} />
            )) :
            <div>
                No Experiences yet
            </div>
            
          }

        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  )
}

export default Favourites