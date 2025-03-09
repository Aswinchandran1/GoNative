import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavorites, toggleFavorite } from '../Services/allAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ExploreCard = ({ displayData }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchUserFavorites();
    }, []);

    const fetchUserFavorites = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                return;
            }
            const reqHeader = {
                Authorization: `Bearer ${token}`
            };
            const res = await getUserFavorites(reqHeader);
            setIsFavorite(res.data.favorites.includes(displayData?._id));
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    }

    const handleFavoriteToggle = async () => {
        try {
            const token = sessionStorage.getItem("token");
            
            if (!token) {
                toast.error("Please log in to add to favorites.");
                return;
            }

            const reqHeader = { Authorization: `Bearer ${token}` };
            const res = await toggleFavorite(displayData._id, reqHeader);

            setIsFavorite(!isFavorite); // Optimistically update UI

            if (isFavorite) {
                toast.info("Removed from favorites", { theme: "colored", style: { backgroundColor: "#f87171" } }); // Red color
            } else {
                toast.success("Added to favorites", { theme: "colored", style: { backgroundColor: "#4ade80" } }); // Green color
            }
            // toast.success(res.data.message );
        } catch (error) {
            toast.error("Failed to update favorites.");
            console.error(error);
        }
    }

    return (
        <div className='bg-slate-50 rounded-xl overflow-hidden shadow-md relative' >
            <button onClick={handleFavoriteToggle} className='absolute top-2 right-3'>
                <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart text-2xl`} style={{ color: isFavorite ? "red" : "#fff" }}></i>
            </button>
            <div className="flex flex-col gap-2">
                <div className="h-[200px] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={`http://localhost:5000/${displayData?.experienceImages[0]}`}
                        alt="Experience Image"
                    />
                </div>

                <div className="flex flex-col gap-4 px-4 py-2 mb-4">
                    <h1 className="text-xl font-semibold">{displayData?.title}</h1>

                    <div className='flex justify-between text-gray-600 text-sm'>
                        <h5>Location: {displayData?.location}</h5>
                        <h5 className="font-bold">{displayData?.pricePerPerson} INR</h5>
                    </div>

                    <div className='flex justify-between items-center'>
                        <span className='px-4 py-1 border rounded-xl bg-gray-100 text-sm font-medium'>{displayData?.category
                        }</span>
                        <p className="flex items-center gap-1">
                            <i className="fa-solid fa-star" style={{ color: "#e7c54b" }}> </i> 4.1
                        </p>
                    </div>

                    <div className='flex justify-center'>
                        <Link to={`/view-detail/${displayData?._id}`} className='px-10 py-2 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition'>View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCard;
