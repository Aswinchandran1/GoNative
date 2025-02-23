import React from 'react'
import ExploreCard from '../Components/ExploreCard'

const Favourites = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: "89vh" }}>
      <div className='mx-16 my-8'>
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
    </div>
  )
}

export default Favourites