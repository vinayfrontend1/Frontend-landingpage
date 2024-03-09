"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SocialIcons from "@/SocialIcons";
import api from "@/config/api";
import keys from "@/config/keys";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import Form from "./landing/form/page";

const CountdownTimer = dynamic(() => import("../app/countdownTimer"), {
  ssr: false,
});

export default function Home() {
  const targetDate = new Date("2024-03-31T00:00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isloggedIn, setisloggedIn] = useState(false);
  const { replace } = useRouter();

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
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    checkToken();
  }, []);

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

  const successFuc = async (
    position: GeolocationPosition,
    isSignIn: boolean
  ) => {
    const { latitude, longitude } = position.coords;
    localStorage.setItem(keys.latitute, JSON.stringify(latitude));
    localStorage.setItem(keys.longitude, JSON.stringify(longitude));
    const isSystemParamsExists = localStorage.getItem(keys.systemParam);
    if (!isSystemParamsExists) {
      /**
       * handle APis
       */
      setisLoading(true);
      const response = await api.get("systemParam/2");
      localStorage.setItem(
        keys.systemParam,
        JSON.stringify(response.data.data?.data)
      );
      setisLoading(false);
    }

    const response = await api.get("systemParam/2");
    console.log("System Params Response:", response);

    /**
     * Handles Route to specific screen
     */
    if (!isSignIn) {
      // location.replace("/src/form");
      //
      // replace("/");
      return <Form />;
      console.log(latitude, longitude);
    } else {
      // location.replace("/landing/signin");
      // replace("/src/form");
    }
  };

  const errorFuc = async (error: GeolocationPositionError) => {
    const result = await Swal.fire({
      title: error.message,
      text: "Rewardwale uses your location to enable discounts and review offers from merchants in your vicinity.",
      icon: "error",
      confirmButtonText: "Steps",
    });
    if (result.isConfirmed) {
      window.open(
        "https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop",
        "_blank"
      );
    }
  };

  const checkToken = () => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(keys.accessToken);
      setisloggedIn(!accessToken);
    }
  };

  const onSubmitPress = async (isSignIn = false) => {
    if (theme === "system" && systemTheme) {
      setTheme(systemTheme);
    }
    if (Notification.permission === "default") {
      const result = await Swal.fire({
        title: "Do you want to receive notifications?",
        text: "Rewardwale uses push notification to keep you updated about various offers and and updates. Steps to allow push notification.",
        icon: "info",
        confirmButtonText: "Allow",
      });
      if (result.isConfirmed) {
        console.log(result);

        await Notification.requestPermission();
      }
    } else if (Notification.permission === "denied") {
      const result = await Swal.fire({
        title: "Notifications not allowed?",
        text: "Rewardwale uses push notification to keep you updated about various offers and and updates. Steps to allow push notification.",
        icon: "error",
        confirmButtonText: "Steps",
      });
      if (result.isConfirmed) {
        window.open(
          "https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop",
          "_blank"
        );
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => successFuc(pos, isSignIn),
      errorFuc
    );
    setIsModalOpen(true);
  };

  const onSignNowPress = async () => {
    await onSubmitPress(true);
  };

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        {/* <CircularProgress /> */}
      </div>
    );
  }
  console.log({ isloggedIn });

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

        {/* <div className=""> */}
        <div className=" text-white absolute sm:mx-auto mt-2 flex w-full flex-col-reverse justify-between items-center text-center 2e sm:w-full sm:flex-row sm:items-stretch md:w-full md:flex-row md:items-stretch">
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

                  {isloggedIn ? (
                    <div className="max-w-sm  mt-4 w-full ">
                      <div className="flex ">
                        <div className="w-[80%] sm:w-full">
                          {/* <Link href="/landing/form" > */}
                          <button
                            type="submit"
                            onClick={() => onSubmitPress(false)}
                            className="w-full h-[40px] bg-red-600 2e p-3 rounded-xl sm:w-full sm:h-[60px]"
                          >
                            <h2 className="text-sm font-semibold sm:w-full sm:text-lg">
                              Priority access
                            </h2>
                          </button>
                          {/* </Link> */}
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
                  ) : null}
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
                <h2 className={`mb-2 text-[15px] font-semibold sm:text-[20px]`}>
                  Ratings & Reviews
                </h2>
              </div>
            </div>

            <div className="flex bottom-2 space-x-4 hidden sm:block sm:mt-[220px] md:mt-[220px] md:block">
              <SocialIcons />
            </div>
          </div>
        </div>
        {isModalOpen && <Form handleModalClose={handleModalClose} />}
        {/* </div> */}
      </div>
    </div>
  );
}
