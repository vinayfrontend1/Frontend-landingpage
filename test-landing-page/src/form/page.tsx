"use client";

import api from "@/config/api";
import keys from "@/config/keys";
import { SystemParams } from "@/config/types";
// import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function Form({ handleModalClose }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handle, setHandle] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  // const [parsedSystemParams, setparsedSystemParams] = useState<SystemParams[]>(
  //   []
  // );
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [blurFields, setBlurFields] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isFirstnameValid, setIsFirstnameValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [parsedSystemParams, setparsedSystemParams] = useState<SystemParams[]>(
    []
  );
  const [countryCode, setcountryCode] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showCheckmark, setshowCheckmark] = useState<null | boolean>(null);
  const [isBusiness, setIsBusiness] = useState(false);
  // const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const systemParam = localStorage.getItem(keys.systemParam);
    const result: SystemParams[] = JSON.parse(systemParam ?? "[]");
    console.log({ systemParam });
    setparsedSystemParams(result);
  };

  const onSubmitPress = async () => {
    if (!email || !phoneNumber || !isValid) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the required fields.",
        icon: "error",
      });
      return;
    }

    setisLoading(true);
    const rawNumber = phoneNumber.slice(countryCode.length);

    const body = {
      registerVia: "mobile-otp",
      pInterface: parsedSystemParams[1]?.pInterfaceId,
      pRoleId: parsedSystemParams[1]?.pRoleId,
      pRelationId: parsedSystemParams[1]?._id,
      indCountryCode: countryCode,
      indMobileNum: rawNumber,
      userName: username,
      indEmail: email,
      indEmailNotify: true,
      indMobileNotify: true,
      indPushNotify: true,
      isBusinessUser: isBusiness,
    };
    try {
      const response = await api.post("signup", body);
      console.log({ response });
      localStorage.setItem(
        keys.userAuthData,
        JSON.stringify(response.data.data)
      );
      console.log("error response::", response.data);
      setisLoading(false);
      // router.push("/landing/otp-verify");
      console.log(otp);
    } catch (error) {
      Swal.fire({
        title: "Error",
        // @ts-ignore
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setisLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const handleModalClose = () => {
  //   // Set isModalOpen to false or perform any other actions to close the modal
  //   setIsModalOpen(false);
  // };

  // const handleFirstNameChange = (e) => {
  //   setFirstName(e.target.value);
  // };

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

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleMobileChange = (e) => {
  //   setMobile(e.target.value);
  // };

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

  const onCheckPress = async (value: string) => {
    const { data } = await api.get("userNameAvailability/" + value);
    console.log(data.data.isAvailable);
    if (data.data.isAvailable) {
      setshowCheckmark(true);
    } else {
      setshowCheckmark(false);
    }
  };

  const isCountryData = (obj: any): obj is CountryData => {
    return "dialCode" in obj;
  };

  const handlePhoneNumberChange = (
    inputValue: string,
    country: {} | CountryData
  ) => {
    if (!isCountryData(country)) {
      return Swal.fire({
        title: "Country Code Error",
        text: "Country code is not right.",
      });
    }
    setPhoneNumber(inputValue);
    setcountryCode(country.dialCode);

    setIsValid(phoneNumber.length >= 11);
  };

  const handleFirstNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue: string = e.target.value;
    setFirstName(inputValue);
    // if (inputValue.length >= 5) {
    //   await onCheckPress(inputValue);
    // } else {
    //   setshowCheckmark(null);
    // }
    const firstnameRegex: RegExp = /^[a-zA-Z0-9_.]+$/;

    const isValid: boolean = firstnameRegex.test(inputValue);
    setIsFirstnameValid(isValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setEmail(inputValue);
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid: boolean = emailRegex.test(inputValue);
    setIsEmailValid(isValid);
  };

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue: string = e.target.value;
    setUsername(inputValue);
    if (inputValue.length >= 5) {
      await onCheckPress(inputValue);
    } else {
      setshowCheckmark(null);
    }
    const usernameRegex: RegExp = /^[a-zA-Z0-9_.]+$/;

    const isValid: boolean = usernameRegex.test(inputValue);
    setIsUsernameValid(isValid);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
          <button
            onClick={handleModalClose}
            className="absolute top-32 mt-4 right-80 cursor-pointer"
          >
            <div className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-full">
              {/* <span className="text-white text-2xl">&times;</span> */}
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
                      id="username"
                      type="text"
                      className={`form-input w-full ${isUsernameValid ? "text-gray-800" : "text-red-500"
                        }`}
                      placeholder="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                {/* <input
                  type="text"
                  id="handle"
                  name="handle"
                  placeholder="Handle"
                  value={handle}
                  onChange={handleHandleChange}
                  className="mt-2 p-2 w-full border text-sm rounded-md bg-gray-100 italic font-semibold my-input"
                /> */}
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
                    id="Email"
                    type="email"
                    placeholder="Enter"
                    className={`form-input w-full ${isEmailValid ? "text-gray-800" : "text-red-500"
                      }`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                    <p className="text-red-500 text-xs">Invalid email format.</p>
                  )}
                {/* <label htmlFor="mobile" className=" ">
                  Mobile
                </label> */}
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  value={phoneNumber}
                  onChange={(value, country) =>
                    handlePhoneNumberChange(value, country)
                  }
                  inputStyle={{ width: "100%" }}
                />
                {!isValid && (
                    <p className="text-red-500 text-xs">
                      Mobile Number should be of 10 Digits.
                    </p>
                  )}
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
                    className="w-full  bg-red-500 text-white p-3 rounded-md mt-4"
                  >
                    {isRegistering ? "Registering..." : "Register Now"}
                  </button>
                </div>
              )}

              {/* Get OTP button */}
              {/* {!otpSent && ( */}
                <button
                  type="button"
                  onClick={onSubmitPress}
                  className="w-full  bg-red-500 text-white p-3 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    ""
                  ) : (
                    "Sign Up"
                  )}
                </button>
              {/* )} */}

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
    </>
  );
}
