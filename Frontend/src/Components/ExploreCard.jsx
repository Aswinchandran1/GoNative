import React from 'react';
import { Link } from 'react-router-dom';

const ExploreCard = () => {

    return (
        <div className='bg-slate-50 rounded-xl overflow-hidden shadow-md relative' >
            <button className='absolute top-2 right-3'><i className="fa-regular fa-heart text-2xl " style={{ color: "#ffff" }}></i>
            </button>
            <div className="flex flex-col gap-2">
                <div className="h-[200px] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://c.ndtvimg.com/2025-02/vpq6lg28_slow-travel-in-kerala_625x300_13_February_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738"
                        alt="Experience Image"
                    />
                </div>

                <div className="flex flex-col gap-4 px-4 py-2 mb-4">
                    <h1 className="text-xl font-semibold">Tea Plantation Tour</h1>

                    <div className='flex justify-between text-gray-600 text-sm'>
                        <h5>Location: Munnar</h5>
                        <h5 className="font-bold">500 INR</h5>
                    </div>

                    <div className='flex justify-between items-center'>
                        <span className='px-4 py-1 border rounded-xl bg-gray-100 text-sm font-medium'>Unique</span>
                        <p className="flex items-center gap-1">
                            <i class="fa-solid fa-star" style={{ color: "#e7c54b" }}> </i> 4.1
                        </p>
                    </div>

                    <div className='flex justify-center'>
                        <Link to="/view-detail" className='px-10 py-2 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition'>View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCard;
