"use client";

import api from "@/config/api";
import keys from "@/config/keys";
import { SystemParams } from "@/config/types";
// import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import PhoneInput, { CountryData } from "react-phone-input-2";
// import "react-phone-input-2/lib/bootstrap.css";

export default function SignUp() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [parsedSystemParams, setparsedSystemParams] = useState<SystemParams[]>(
    []
  );
  const [countryCode, setcountryCode] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showCheckmark, setshowCheckmark] = useState<null | boolean>(null);
  const [isBusiness, setIsBusiness] = useState(false);
  // let typingTimer: string | number | NodeJS.Timeout | undefined;

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
    if (!username || !email || !phoneNumber || !isValid) {
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
      router.push("/landing/otp-verify");
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

  const onCheckPress = async (value: string) => {
    const { data } = await api.get("userNameAvailability/" + value);
    console.log(data.data.isAvailable);
    if (data.data.isAvailable) {
      setshowCheckmark(true);
    } else {
      setshowCheckmark(false);
    }
  };

  //   const isCountryData = (obj: any): obj is CountryData => {
  //     return "dialCode" in obj;
  //   };

  //   const handlePhoneNumberChange = (
  //     inputValue: string,
  //     // country: {} | CountryData
  //   ) => {
  //     if (!isCountryData(country)) {
  //       return Swal.fire({
  //         title: "Country Code Error",
  //         text: "Country code is not right.",
  //       });
  //     }
  //     setPhoneNumber(inputValue);
  //     setcountryCode(country.dialCode);

  //     setIsValid(phoneNumber.length >= 11);
  //   };

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setemail(inputValue);
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid: boolean = emailRegex.test(inputValue);
    setIsEmailValid(isValid);
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-24 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
            <h1 className="h1 md:text-4xl text-3xl">Create your account</h1>
          </div>
          {/* Form */}
          <div className="max-w-md mx-auto shadow-2xl p-6 rounded-lg bg-white dark:bg-[#1b2024] flex flex-col gap-6">
            <form className=" flex flex-col gap-6">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-500 dark:text-gray-300 text-sm font-medium mb-1"
                    htmlFor="mobile-number"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  {/* <PhoneInput
                    country={"in"}
                    enableSearch={true}
                    value={phoneNumber}
                    onChange={(value, country) =>
                      handlePhoneNumberChange(value, country)
                    }
                    inputStyle={{ width: "100%" }}
                  /> */}
                  {/* <input
                    id="mobile-number"
                    type="text"
                    className={`form-input w-full ${
                      isValid ? "text-gray-800" : "text-red-500"
                    }`}
                    placeholder=""
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  /> */}
                  {!isValid && (
                    <p className="text-red-500 text-xs">
                      Mobile Number should be of 10 Digits.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-500 dark:text-gray-300 text-sm font-medium mb-1"
                    htmlFor="Email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="Email"
                    type="email"
                    placeholder="Enter"
                    className={`form-input w-full ${
                      isEmailValid ? "text-gray-800" : "text-red-500"
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                    <p className="text-red-500 text-xs">
                      Invalid email format.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-500 dark:text-gray-300 text-sm font-medium mb-1"
                    htmlFor="username"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      id="username"
                      type="text"
                      className={`form-input w-full ${
                        isUsernameValid ? "text-gray-800" : "text-red-500"
                      }`}
                      placeholder=""
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                    {showCheckmark !== null ? (
                      showCheckmark === true ? (
                        <img
                          src="/signup/check.png"
                          alt=""
                          width={24}
                          height={24}
                        />
                      ) : (
                        <img
                          src="/signup/close.png"
                          alt=""
                          width={24}
                          height={24}
                        />
                      )
                    ) : null}
                  </div>

                  {/* {!isUsernameValid && <p className="text-red-500">Invalid username.Does not contain special characters (e.g., @, &, %, etc.).</p>} */}
                  {!isUsernameValid && /[^a-zA-Z0-9_.]/.test(username) && (
                    <p className="text-red-500 text-xs">
                      Invalid username. Only &#39;.&#39;, &#39;_&#39; and
                      alphanumeric characters are valid.
                    </p>
                  )}
                  {username.length > 0 && username.length < 5 && (
                    <p className="text-red-500 text-xs">
                      Invalid username. At least 5 characters should be there.
                    </p>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-500 text-center">
                People who use our service may have uploaded your contact
                information to app.
                <Link
                  href="/landing/legals/termscondition"
                  className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                >
                  Learn More
                </Link>
                .
              </div>
              <div className="text-sm text-gray-500 text-center">
                By signing up, you agree to our
                <Link
                  href="/landing/legals/privacypolicy"
                  className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                >
                  Privacy Policy
                </Link>
                .
              </div>

              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={isBusiness}
                      onChange={() => setIsBusiness(!isBusiness)}
                    />
                    <span className="ml-2 text-gray-600">
                      I am a business user
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 ">
                <button
                  className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                  onClick={onSubmitPress}
                  type="button"
                  disabled={isLoading}
                >
                  {/* {isLoading ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    "Sign Up"
                  )} */}
                </button>
              </div>
            </form>
            <div className="text-gray-400 text-center">
              Have an account?{" "}
              <Link
                href="/landing/signin"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
