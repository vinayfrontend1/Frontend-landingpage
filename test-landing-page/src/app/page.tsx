'use client'
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import SocialIcons from "@/SocialIcons";


const CountdownTimer = dynamic(() => import('../app/countdownTimer'), { ssr: false });

export default function Home() {

  const targetDate = new Date('2024-03-31T00:00:00');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   closeModal(); // Close the modal after form submission
  // };

  return (
    <main className="flex min-h-screen w-full fixed flex-col items-center justify-between ">
      <div className="relative mb-10">
      
        <div className="fixed relative flex h-full w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <img
         src="/landing-bg-image.jpg"
         className="w-full h-full bg-image-page"
         alt="Landing Background"
       />
       
        </div>
      </div>


      <div className=" absolute mb-32 mt-32 grid text-center text-white lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <div className="mt-4 bg-black bg-opacity-50 w-[60%]">
        <h2 className={`mb-6 text-3xl text-left ml-2 mt-8 font-semibold`}>
            Launching Soon
          </h2>
          <div className=" mb-4 -ml-2">
              <CountdownTimer targetDate={targetDate} />
        
          </div>
        </div>

      
          <div className={`mb-3 text-2xl `}>
            <div className="mt-8 -mr-40 ">
            <img
         src="/rewardwale-image.png"
         className="w-[50%] text-right ml-80"
         alt="Landing Background"
       />
            </div>
            <div className="-mr-20 mt-4 ">
            <h2 className={`mb-3 text-[20px] text-right italic `}>
            Ratings & Reviews 
            </h2>
            </div>
           
          </div>
          
         
        
<div className="bg-black bg-opacity-50 mb-10">
<div className="">
        <h2 className={`mb-3 text-3xl text-left font-semibold`}>
          Pin to Piano 
          </h2>
          <h2 className={`mb-3 text-3xl text-left font-semibold`}>
          Video reviews
          </h2>
          <h2 className={`mb-3 text-3xl text-left font-semibold`}>
          By customers
          </h2>
          <h2 className={`mb-3 text-5xl text-left font-semibold`}>
         Just like You
          </h2>
        </div>
        
          <form className="max-w-sm mx-auto mt-8" >
      <div className="w-[60%]">
      <button
        type="submit"
        className="w-full -ml-14 bg-orange-500 text-white p-3 rounded-md "
      >
        Priority access
      </button>
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Enter Your Details</h3>
              <form >
                {/* Add your form fields here */}
                {/* For example: */}
                <input type="text" placeholder="First Name" className="mb-4 p-2 border" />
                <input type="text" placeholder="Last Name" className="mb-4 p-2 border" />
                {/* ... add other form fields ... */}
                <button type="submit" className="bg-orange-500 text-white p-2 rounded-md">Submit</button>
              </form>
              <button onClick={closeModal} className="mt-4 text-gray-600">Close</button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-white -ml-8 ">
       <h3 className="text-left italic">Register my business</h3>
      </div>
    </form>
</div>

<div className="flex absolute mb-6 bottom-2 -right-40 space-x-4">
     
      <SocialIcons />
    </div>
        
      </div>
    </main>
  );
}