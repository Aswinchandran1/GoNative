import React from 'react'
import ExploreCard from '../Components/ExploreCard'

const Explore = () => {
    return (
        <section  style={{ paddingTop: '80px', minHeight: "89vh" }}>
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
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                </div>
            </div>
        </section>
    )
}

export default Explore