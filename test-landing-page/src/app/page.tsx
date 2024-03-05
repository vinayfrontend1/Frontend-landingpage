"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SocialIcons from "@/SocialIcons";

const CountdownTimer = dynamic(() => import("../app/countdownTimer"), {
  ssr: false,
});

export default function Home() {
  const targetDate = new Date("2024-03-31T00:00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handle, setHandle] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [blurFields, setBlurFields] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Set isModalOpen to false or perform any other actions to close the modal
    setIsModalOpen(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleHandleChange = (e) => {
    setHandle(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleGetOtpClick = () => {
    // Add logic to get OTP here
    console.log("Get OTP clicked");
    setOtpSent(true);
    // setBlurFields(true);
  };

  const handleRegisterNowClick = () => {
    // Add your logic here to handle registration
    setIsRegistering(true);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   closeModal(); // Close the modal after form submission
  // };

  return (
    <div className=" container min-h-screen fixed w-full mx-auto sm:mx-auto">
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="fixed inset-0 overflow-hidden ">
          <img
            src="/new-landing-pic-1.png"
            className="w-full h-full object-cover object-center mr-[400px]"
            alt="left Background"
          />
        </div>

        <div className="">
          <div className=" sm:mx-auto mt-2 flex w-full flex-col-reverse justify-between items-center text-center text-white sm:w-full sm:flex-row sm:items-stretch md:w-full md:flex-row md:items-stretch">
            {/* Left-side Column */}
            <div className="w-[1/2] flex flex-col justify-center items-center ">
              <div
                className="
            
            bg-black bg-opacity-70 mx-[40px] w-[75%]"
              >
                <div className="mx-[20px] ">
                  <h2
                    className={`mb-6 text-xl text-start mt-2 mx-2 font-semibold sm:text-3xl`}
                  >
                    Launching Soon
                  </h2>
                  <div className=" flex justify-start mb-2 ">
                    <div className="justify-center ">
                      <CountdownTimer targetDate={targetDate} />
                    </div>
                  </div>
                  <div className="bg-black bg-opacity-10  text-left mb-4 ">
                    <div className="mx-2">
                      <h2 className={`mb-3 text-xl sm:text-2xl font-semibold`}>
                        Pin to Piano
                      </h2>
                      <h2 className={`mb-3 text-xl  sm:text-2xl font-semibold`}>
                        Video reviews
                      </h2>
                      <h2 className={`mb-3 text-xl sm:text-2xl font-semibold`}>
                        By customers
                      </h2>
                      <h2
                        className={`mb-3 text-2xl sm:text-4xl font-semibold  just-text`}
                      >
                        Just like You
                      </h2>
                    </div>

                    <div className="max-w-sm  mt-4 w-full ">
                      <div className="flex ">
                        <div className="w-[80%] sm:w-full">
                          <button
                            type="submit"
                            onClick={openModal}
                            className="w-full h-[40px] bg-red-600 text-white p-3 rounded-xl sm:w-full sm:h-[60px]"
                          >
                            <h2 className="text-sm font-semibold sm:w-full sm:text-lg">
                              Priority access
                            </h2>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center ">
                        <div className="mt-4 text-white  ">
                          <h3 className="italic text-sm sm:text-md">
                            Register my business
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex block bottom-2 mt-4 space-x-4 sm:hidden md:hidden">
                <SocialIcons />
              </div>
            </div>

            {/* Right-side column */}
            <div
              className={`w-[1/2] flex flex-col h-full justify-between items-center mb-3 w-full sm:flex-col sm:justify-between sm:w-full sm:h-full md:flex-col md:justify-between md:h-full md:flex-col lg:flex-col`}
            >
              <div className="mt-4">
                <div className="w-[200px] h-[40px] sm:w-[300px] sm:h-[80px]">
                  <img
                    src="/rewardwale-image.png"
                    className="reward-wale-img"
                    alt="Landing Background"
                  />
                </div>
                <div className=" mt-4 ">
                  <h2
                    className={`mb-2 text-[15px] font-semibold sm:text-[20px]`}
                  >
                    Ratings & Reviews
                  </h2>
                </div>
              </div>

              <div className="flex bottom-2 space-x-4 hidden sm:block sm:mt-[220px] md:mt-[220px] md:block">
                <SocialIcons />
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
              <button
                onClick={handleModalClose}
                className="absolute top-32 mt-4 right-80 cursor-pointer"
              >
                <div className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-full">
                  <span className="text-white text-2xl">&times;</span>
                </div>
              </button>

              <div className="bg-white top-24 p-8 rounded-md z-10 w-[26%] mx-auto">
                {/* <h2 className="text-2xl font-semibold mb-4">Enter Details</h2> */}
                <form className="w-[80%] mx-10">
                  {/* Form fields */}
                  <div className="mb-4">
                    {/* <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label> */}
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label> */}
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleLastNameChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label
                  htmlFor="handle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Handle
                </label> */}
                    <input
                      type="text"
                      id="handle"
                      name="handle"
                      placeholder="Handle"
                      value={handle}
                      onChange={handleHandleChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label> */}
                    <input
                      type="calendar"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={handleDobChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label> */}
                    <input
                      type="gender"
                      id="gender"
                      name="gender"
                      placeholder="Gender"
                      value={gender}
                      onChange={handleGenderChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label> */}
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                    {/* <label htmlFor="mobile" className=" ">
                  Mobile
                </label> */}
                    <input
                      type="tel"
                      id="mobile"
                      placeholder="Mobile"
                      name="mobile"
                      value={mobile}
                      onChange={handleMobileChange}
                      className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                    />
                  </div>

                  {/* ... Repeat for other form fields ... */}

                  {/* Get OTP button */}
                  {otpSent && (
                    <div
                      className={`mb-4 ${blurFields ? "filter blur-sm" : ""}`}
                    >
                      {/* Display OTP input field */}
                      <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-black"
                      />
                      {/* Display Register Now button */}
                      <button
                        type="button"
                        onClick={handleRegisterNowClick}
                        className="w-full  bg-red-500 text-white p-3 rounded-md mt-4"
                      >
                        {isRegistering ? "Registering..." : "Register Now"}
                      </button>
                    </div>
                  )}

                  {/* Get OTP button */}
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleGetOtpClick}
                      className="w-full  bg-red-500 text-white p-3 rounded-lg"
                    >
                      <h2 className="font-semibold"> Get OTP</h2>
                    </button>
                  )}

                  {/* Resend OTP line */}
                  {otpSent && (
                    <p className="text-gray-500">
                      Didn't receive OTP?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        // onClick={handleResendOtpClick}
                      >
                        Resend OTP
                      </span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
