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
  const [isLastnamevalid, setIsLastnameValid] = useState(true);
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
    if (!firstName || !lastName || !email || !phoneNumber || !isValid) {
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
      indFirstname: firstName,
      indLastname: lastName,
      indDob: dob,
      indEmailNotify: true,
      indMobileNotify: true,
      indPushNotify: true,
      isBusinessUser: isBusiness,
    };
    try {
      const response = await api.post("signup", body);
  
      console.log({ response });
  
      if (response && response.data && response.data.data) {
        localStorage.setItem(
          keys.userAuthData,
          JSON.stringify(response.data.data)
        );
        console.log("User Auth Data:", response.data.data);
      } else {
        console.error("Invalid response structure:", response);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
      });
    } finally {
      setisLoading(false);
    }
  // };
  };

  const openModal = () => {
    setIsModalOpen(true);
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

  // const onCheckPress = async (value: string) => {
  //   const { data } = await api.get("userNameAvailability/" + value);
  //   console.log(data.data.isAvailable);
  //   if (data.data.isAvailable) {
  //     setshowCheckmark(true);
  //   } else {
  //     setshowCheckmark(false);
  //   }
  // };

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
    const firstnameRegex: RegExp = /^[a-zA-Z0-9_.]+$/;

    const isValid: boolean = firstnameRegex.test(inputValue);
    setIsFirstnameValid(isValid);
  };

  const handleLastNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue: string = e.target.value;
    setLastName(inputValue);
    const secondnameRegex: RegExp = /^[a-zA-Z0-9_.]+$/;

    const isValid: boolean = secondnameRegex.test(inputValue);
    setIsLastnameValid(isValid);
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
    // if (inputValue.length >= 5) {
    //   await onCheckPress(inputValue);
    // } else {
    //   setshowCheckmark(null);
    // }
    const usernameRegex: RegExp = /^[a-zA-Z0-9_.]+$/;

    const isValid: boolean = usernameRegex.test(inputValue);
    setIsUsernameValid(isValid);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
          <div className="bg-white top-24 p-8 rounded-md z-10 w-[65%] md:w-[40%] lg:[40%] sm:[40%] xl:[40%] 2xl">
            <img
              src="/closeicon.png"
              alt="close"
              onClick={handleModalClose}
              className="absolute right-6 top-4 cursor-pointer w-6 h-6 top-[70px] md:right-[160px] lg:right-[160px] md:top-[125px] lg:top-[80px]"
              style={{ filter: "invert(0)" }}
            />
            <h2 className="text-2xl font-semibold mb-4">Enter Details</h2>
            <form>
              {/* Form fields */}
              <div className="mb-4">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <input
                  type="text"
                  id="username"
                  placeholder="First Name"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <input
                  type="text"
                  id="handle"
                  name="handle"
                  placeholder="Handle"
                  value={handle}
                  onChange={handleHandleChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={handleDobChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-semibold ${
                    otpSent ? "disabled" : ""
                  }`}
                  disabled={otpSent}
                />
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  value={phoneNumber}
                  onChange={(value, country) =>
                    handlePhoneNumberChange(value, country)
                  }
                  inputStyle={{ width: "100%" }}
                />
              </div>

              {/* Get OTP button */}
              {otpSent && (
                <div className={`mb-4 ${blurFields ? "filter blur-sm" : ""}`}>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 p-2 w-full text-sm rounded-md bg-gray-100 italic font-black"
                  />
                  <button
                    type="button"
                    onClick={handleRegisterNowClick}
                    className="w-full bg-red-500 text-white p-3 rounded-md mt-4"
                  >
                    {isRegistering ? "Registering..." : "Register Now"}
                  </button>
                </div>
              )}

              {/* Get OTP button */}
              {!otpSent && (
                <button
                  type="button"
                  onClick={onSubmitPress}
                  className="w-full bg-red-500 text-white p-3 rounded-md"
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
    </>
  );
}
