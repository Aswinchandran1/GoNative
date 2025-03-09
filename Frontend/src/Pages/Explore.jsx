import React, { useEffect, useState } from 'react'
import ExploreCard from '../Components/ExploreCard'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllExperiences } from '../Services/allAPI';

const Explore = () => {
    const [allExperience, setAllExperience] = useState([])
    // console.log(allExperience);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            const userName = user.userName.split(" ")[0];
            toast.success(`Welcome ${userName}`);
        }
    }, []);

    useEffect(() => {
        showExperiences()
    }, [])

    const showExperiences = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }
        try {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            const res = await getAllExperiences(reqHeader);
            if (res?.status === 200) {
                console.log("Fetched Experiences:", res.data);
                setAllExperience(res.data);
            } else {
                console.error("Unexpected Response:", res);
                toast.error("Failed to fetch experiences!");
            }
        } catch (error) {
            console.error("Error fetching experiences:", error);
            toast.error(error.message);
        }
    };


    return (
        <section style={{ paddingTop: '80px', minHeight: "89vh" }}>
            <div className='mx-16 my-8'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='pb-3 text-xl font-bold'>Discover Unique Experiences</h1>
                    <div className='flex'>
                        <input className='bg-gray-200 w-72 h-11 rounded p-2' type="search" placeholder='Search by location' />
                        <button className='bg-gray-600 text-white rounded-md px-4 ms-3'>Search</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-7 ">
                    <div className="bg-gray-300 p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center cursor-pointer">Cultural</div>
                    <div className="bg-gray-300 p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center cursor-pointer">Adventure</div>
                    <div className="bg-gray-300 p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center cursor-pointer">Wellness</div>
                    <div className="bg-gray-300 p-4 shadow-[0px_4px_25px_rgba(255,255,255,0.7)] rounded-2xl text-center cursor-pointer">Unique</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  mt-7">
                    {
                        allExperience.length > 0 ?
                            allExperience.map(experience => (
                                <ExploreCard key={experience._id} displayData={experience} />
                            )) :
                            <div>
                                No Experiences yet
                            </div>
                    }
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={1000} />
        </section>
    )

}

export default Explore