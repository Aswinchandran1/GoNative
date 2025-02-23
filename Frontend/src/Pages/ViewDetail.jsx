import React, { useState } from 'react'
import Booking from '../Components/Booking';


const ViewDetail = () => {
  

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: "89vh" }}>
        <div className="mx-36 my-8">
          {/* Location,Title,Add to fav,Rating */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className='pb-2 text-2xl font-bold'>Tea plantaion tour</h1>
              <h5 className='text-xl font-bold'>Munnar</h5>
            </div>
            <div className='flex gap-5 items-center'>
              <h1><i className="fa-solid fa-star text-xl font-bold" style={{ color: "#e7c54b" }}> </i> 4.1</h1>
              <h1 className='border px-1 py-1 rounded bg-gray-200 cursor-pointer  hover:bg-gray-300 '><i className="fa-regular fa-heart text-xl font-bold" style={{ color: "#db1f1f" }}></i> Add to Fav</h1>
            </div>
          </div>
          {/* 3Images */}
          <div className='sm:mx-8 md:mx-9 lg:mx-32 border my-6 sm:h-[350px]'>
            <div className='sm:grid grid-cols-2 gap-2 '>

              <div>
                <img className="w-full h-full object-cover mb-2"
                  src="https://media1.thrillophilia.com/filestore/oigulds3evw4mombm9chsinqghpw_Munnar-Tea-Plantation-Trails.jpg?w=400&dpr=2"
                  alt="Experience Image" />
              </div>

              <div className='flex flex-col gap-2'>
                <div style={{ height: '175px' }}>
                  <img className="w-full h-full object-cover"
                    src="https://media1.thrillophilia.com/filestore/oigulds3evw4mombm9chsinqghpw_Munnar-Tea-Plantation-Trails.jpg?w=400&dpr=2"
                    alt="Experience Image" />
                </div>
                <div style={{ height: '175px' }}>
                  <img className="w-full h-full object-cover"
                    src="https://c.ndtvimg.com/2025-02/vpq6lg28_slow-travel-in-kerala_625x300_13_February_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738" alt="Experience Image" />
                </div>
              </div>

            </div>
          </div>

          {/*Main Potion and select date}*/}
          <div className='sm:grid grid-cols-[60%_30%] gap-20 mt-10' >
            {/*About Exp,Addons,About Host */}
            <div>

              <div className="flex justify-between items-center pb-5 border-gray-400 border-b-2">
                <h1 className='text-xl font-bold'>Hosted By, UserName</h1>
                <div className='overflow-hidden rounded-full' style={{ height: "60px", width: "60px" }}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569" alt="" />
                </div>
              </div>

              <div className='mt-4 pb-5 border-gray-400 border-b-2'>
                <h1 className='text-xl font-bold pb-3'>What you'll do</h1>
                <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus aperiam sed illum nisi nemo fugit suscipit unde quas voluptates, maxime earum impedit sapiente accusamus quisquam vitae doloremque nesciunt enim molestiae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magnam dignissimos aliquam corrupti nostrum, molestiae dolorum officiis modi. Sapiente, tempora illo dolores nisi delectus tenetur provident aliquam sint? Tempora, repellat.</p>
              </div>

              <div className='mt-4 pb-5 border-gray-400 border-b-2'>
                <h1 className='text-xl font-bold pb-3'>What's included</h1>
                <div className='flex gap-5'>
                  <div className='border border-black py-6 px-8 rounded-xl'>
                    Travel
                  </div>
                  <div className='border border-black py-6 px-8 rounded-xl'>
                    Travel
                  </div>
                  <div className='border border-black py-6 px-8 rounded-xl'>
                    Travel
                  </div>
                  <div className='border border-black py-6 px-8 rounded-xl'>
                    Travel
                  </div>
                </div>
              </div>

              <div className='my-4 '>
                <div className="flex items-center gap-5">
                  <div className='overflow-hidden rounded-full' style={{ height: "60px", width: "60px" }}>
                    <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569" alt="" />
                  </div>
                  <h1 className='text-xl font-bold'>Meet your host, UserName</h1>
                </div>
                <p className='pt-2 text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore officiis eligendi, mollitia nulla rerum non molestias repudiandae fugiat error? Unde ea eum veniam alias ipsum laudantium autem suscipit natus accusamus?
                  Blanditiis excepturi sequi mollitia libero aspernatur fugiat adipisci, maiores, vero sapiente corporis autem ad, amet natus. Dolores iusto ea et dolor tenetur sed rem, sapiente ullam asperiores eaque cupiditate dolore!</p>
              </div>

            </div>
            {/* select date */}
            <div >
              <Booking/>
            </div>
          </div>

          {/* Map */}
          <div className='border-gray-400 border-t-2 '>
            <h1 className='text-xl font-bold pt-4 pb-3'>Where you’ll be</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28438.70786240368!2d77.04357822488024!3d10.080691165294594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0799794d099a6d%3A0x63250e5553c7e0c!2sMunnar%2C%20Kerala%20685612!5e1!3m2!1sen!2sin!4v1740074843517!5m2!1sen!2sin" width="100%" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          {/* Comment */}
          <div className="grid  md:grid-cols-2 gap-x-16 mt-16">
            <div>
              <div className='flex gap-4 items-center pb-4'>
                <div className='overflow-hidden rounded-full' style={{ height: "40px", width: "40px" }}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2569" alt="" />
                </div>
                <p className=''>Max <br />22 Feb</p>
              </div>
              <p className='text-justify text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, sit corrupti accusantium earum nulla nesciunt neque explicabo molestias provident. Necessitatibus quae impedit soluta ipsa temporibus voluptatibus qui placeat cumque incidunt!</p>
            </div>
          </div>

        </div>
      </div >
      
    </>
  )
}

export default ViewDetail