import axios from "axios";
import keys from "./keys";

export const baseURL = "https://www.elawdrawer.in/";

const getLocalStorageValue = (key: string, defaultValue: string | number) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
  }
  return defaultValue;
};

const api = axios.create({
  baseURL: baseURL + "api/",
  // baseURL: "http://localhost:8000/api/",
  headers: {
    // fingerprint: getLocalStorageValue(
    //   keys.fingerPrint,
    //   "rajatdevicefingerprint"
    // ),
    fingerprint: "rajatdevicefingerprint",
    latitude: getLocalStorageValue(keys.latitute, 90),
    longitude: getLocalStorageValue(keys.longitude, 90),
    lan: "en",
    Authorization: "Bearer " + getLocalStorageValue(keys.accessToken, ""),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("erorr::", error.response.status);
      // Unauthorized error, redirect to the home route
      location.replace("/landing");
    }
    return Promise.reject(error);
  }
);

export default api;
