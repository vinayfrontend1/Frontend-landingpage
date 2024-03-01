'use client'
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import SocialIcons from "@/SocialIcons";


const CountdownTimer = dynamic(() => import('../app/countdownTimer'), { ssr: false });

export default function Home() {

  const targetDate = new Date('2024-03-31T00:00:00');
 

  

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
        <div className="mt-4 ml-20">
        <h2 className={`mb-14 text-3xl text-left ml-2  font-semibold`}>
            Launching Soon
          </h2>
          <div className=" mb-4">
              <CountdownTimer targetDate={targetDate} />
        
          </div>
        </div>

      
          <div className={`mb-3 text-2xl `}>
            <div className="mt-8 -mr-40">
            <h2 className={`mb-3 text-7xl text-right font-semibold`}>
            Rewardwale 
            </h2>
            </div>
            <div className="-mr-20">
            <h2 className={`mb-3 text-[20px] text-right italic `}>
            Ratings & Reviews 
            </h2>
            </div>
           
          </div>
          
         
        
<div className="div">
<div className="ml-20">
        <h2 className={`mb-3 text-2xl text-left font-semibold`}>
          Pin to Piano 
          </h2>
          <h2 className={`mb-3 text-2xl text-left font-semibold`}>
          Video reviews
By customers
          </h2>
          <h2 className={`mb-3 text-4xl text-left font-semibold`}>
         Just like You
          </h2>
        </div>
        
          <form className="max-w-sm mx-auto mt-8" >
      <div className="mb-4">
        
        <input
          type="email"
          placeholder="Email address"
          id="email"
          name="email"
          className="w-full text-black 
          px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
      <input
  type="tel"
  id="Mobile number"
  placeholder="Mobile number"
  name="Mobile number"
  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
  required
/>

      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white p-3 rounded-md "
      >
        Priority access
      </button>
      <div className="mt-4 text-white  text-center">
       <h3 className="text-center italic">Register my business</h3>
      </div>
    </form>
</div>

<div className="flex absolute  bottom-4 -right-24 space-x-4">
     
      <SocialIcons />
    </div>
        
      </div>
    </main>
  );
}
