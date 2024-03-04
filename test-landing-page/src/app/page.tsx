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
    <div className="flex min-h-screen fixed w-full flex-col items-center justify-between main-layout">
      <div className="div"></div>
      <div className="relative w-full h-full ">
        <div className=" fixed inset-0 flex items-end justify-center overflow-hidden bg-gradient-to-t from-white via-white dark:from-black dark:via-black  lg:h-auto lg:w-auto lg:bg-none">
          <img
            src="/new-landing-pic-1.png"
            className="w-full h-full object-cover "
            alt="Landing Background"
          />
        </div>
      </div>

      <div className=" cool absolute mb-32 mt-20 flex w-full flex-row justify-between text-center text-white lg:max-w-7xl lg:w-full ">
        <div className="w-[1/2] yup  mt-4 bg-black bg-opacity-70 w-[50%] h-[50%] mr-32 ">
          <div className="">
            <h2 className={`mb-6 text-3xl text-start mt-8 mx-12 font-semibold`}>
              Launching Soon
            </h2>
            <div className=" flex justify-start mb-10 mx-8">
              <div className="justify-center">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>
            <div className="bg-black bg-opacity-10 w-full text-left mb-10 mx-10">
              <div className="">
                <h2 className={`mb-3 text-3xl  font-semibold`}>Pin to Piano</h2>
                <h2 className={`mb-3 text-3xl  font-semibold`}>
                  Video reviews
                </h2>
                <h2 className={`mb-3 text-3xl  font-semibold`}>By customers</h2>
                <h2 className={`mb-3 text-5xl  font-semibold  just-text`}>
                  Just like You
                </h2>
              </div>

              <div className="max-w-sm  mt-8 pri-reg-layout w-full ">
                <div className="flex ">
                  <div className="w-[80%] priority-access">
                    <button
                      type="submit"
                      onClick={openModal}
                      className="w-full h-[60px] bg-red-600 text-white p-3 rounded-xl "
                    >
                      Priority access
                    </button>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <div className="mt-4 text-white  mr-[80px]">
                    <h3 className="italic">Register my business</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[1/2] mb-3 w-full same `}>
          <div className="mt-4 jim flex justify-end ">
            <img
              src="/rewardwale-image.png"
              className="w-[50%] -mr-16 reward-wale-img"
              alt="Landing Background"
            />
          </div>
          <div className=" mt-4 jim flex flex justify-end mr-22">
            <h2 className={`mb-3 text-[20px] font-semibold`}>
              Ratings & Reviews
            </h2>
          </div>
        </div>

        {/* <div className="bg-black bg-opacity-50 mb-10">
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

          <div className="max-w-sm mx-auto mt-8">
            <div className="w-[60%]">
              <button
                type="submit"
                className="w-full -ml-14 bg-orange-500 text-white p-3 rounded-md "
              >
                Priority access
              </button>
            </div>

            <div className="mt-4 text-white -ml-8 ">
              <h3 className="text-left italic">Register my business</h3>
            </div>
          </div>
        </div> */}

        <div className="flex absolute bottom-2 -right-10 space-x-4">
          <SocialIcons />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
          <div className="bg-white top-24 p-8 rounded-md z-10 w-[40%]">
            <button
              onClick={handleModalClose}
              className="absolute  right-52 text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {/* You can replace the 'X' with your close icon */}
              <h2 className="text-white">X</h2>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Enter Details</h2>
            <form>
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
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
                  className="mt-1 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold"
                />
              </div>

              {/* ... Repeat for other form fields ... */}

              {/* Get OTP button */}
              {otpSent && (
                <div className={`mb-4 ${blurFields ? "filter blur-sm" : ""}`}>
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
                    className="w-full bg-orange-500 text-white p-3 rounded-md mt-4"
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
                  className="w-full bg-orange-500 text-white p-3 rounded-md"
                >
                  Get OTP
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
  );
}
