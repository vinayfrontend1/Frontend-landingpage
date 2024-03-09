"use client";
import api from "@/config/api";
import keys from "@/config/keys";
import { SystemParams } from "@/config/types";
// import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import PhoneInput, { CountryData } from "react-phone-input-2";
// import "react-phone-input-2/lib/bootstrap.css";
import Swal from "sweetalert2";

export default function SignIn() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setloading] = useState(false);

  //   const isCountryData = (obj: any): obj is CountryData => {
  //     return "dialCode" in obj;
  //   };

  //   const handlePhoneNumberChange = (
  //     inputValue: string,
  //     country: {} | CountryData
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

  const onSubmitPress = async () => {
    setloading(true);
    const systemParam = localStorage.getItem(keys.systemParam);
    const parsedSystemParams: SystemParams[] = JSON.parse(systemParam ?? "[]");

    const rawNumber = phoneNumber.slice(countryCode.length);

    const body = {
      loginVia: "mobile-otp",
      pInterface: parsedSystemParams[1]?.pInterfaceId,
      pRoleId: parsedSystemParams[1]?.pRoleId,
      pRelationId: parsedSystemParams[1]?._id,
      indCountryCode: countryCode,
      indMobileNum: rawNumber,
      indPushNotify: true,
    };

    try {
      const response = await api.put("login", body);

      localStorage.setItem(
        keys.userAuthData,
        JSON.stringify(response.data.data)
      );
      sessionStorage.setItem(keys.isLogin, "true");
      setloading(false);
      router.push("/landing/otp-verify");
    } catch (error) {
      console.error({ error });

      await Swal.fire({
        title: "Sign In Error",
        // @ts-ignore
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-24 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center text-gray-900 dark:text-white pb-12 md:pb-20 lg:pb-6">
            <h1 className="h1 text-4xl">Sign In Now</h1>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto shadow-2xl p-6 rounded-lg bg-white dark:bg-[#1b2024] flex flex-col gap-8">
            <form></form>
            <form className=" flex flex-col gap-8">
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1"
                    htmlFor="mobile-number"
                  >
                    Mobile Number
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
                  {!isValid && (
                    <p className="text-red-500">
                      Mobile Number should be of 10 Digits.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                  <button
                    type="button"
                    className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                    onClick={onSubmitPress}
                    disabled={loading}
                  >
                    {/* {loading ? (
                      <CircularProgress sx={{ color: "white" }} />
                    ) : (
                      "Request OTP"
                    )} */}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-900 dark:text-gray-400 text-center">
              Don’t you have an account?{" "}
              <Link
                href="/landing/signup"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
