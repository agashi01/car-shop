/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useGuest } from "../Context";

export const axiosInstance = () => {
  const { guest, setAuthMessage } = useGuest();

  const axiosInstance2 = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3000",
    });

    return instance;
  }, []);

  useEffect(() => {

    const requestInterceptor = axiosInstance2.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        config.headers["Authorization"] = token && `Bearer ${token}`;

        config.headers["guest"] =
          typeof guest !== "undefined" ? String(guest) : delete config.headers["guest"];

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance2.interceptors.request.eject(requestInterceptor);

    };
  }, [guest]);

  useEffect(() => {

    const responseInterceptor = axiosInstance2.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const original = error.config;
        const errMessage = error.response?.data;
        console.log(errMessage, 'err');
  
        // Initialize _retry if it doesn't exist
        if (!original._retry) {
          original._retry = 0;
        }
  
        // Check if token has expired and retry is less than 1
        if (original._retry < 1 && errMessage === "Token has expired") {
          original._retry += 1;
  
          try {
            const refreshToken = localStorage.getItem("refreshToken");
  
            // Wait for the refresh token request to complete
            console.log(refreshToken)
            const response = await axios.post("http://localhost:4000/token", { refreshToken });
  
            console.log(response.data);
            const newToken = response.data;
            localStorage.setItem('token', newToken);
  
            // Update the original request with the new token
            original.headers['Authorization'] = `Bearer ${newToken}`;
  
            // Retry the original request with the new token
            return axiosInstance2(original);
          } catch (err) {
            // Handle token refresh errors
            console.log(err);
            if (err.response?.data === 'Invalid token') {
              setAuthMessage('Who are you? Please refresh the page and log in again!');
            } else if (err.response?.data === 'Token has expired') {
              setAuthMessage('Unable to refresh token, please refresh the page and log in again');
            } else {
              setAuthMessage('Something went wrong, please refresh the page and log in again');
            }
            return Promise.reject(err);
          }
        } else if (original._retry < 1 && errMessage === 'Invalid token') {
          setAuthMessage('Who are you? Please log in again!');
          return Promise.reject(error);
        }
  
        // Handle any other errors
        setAuthMessage('Something went wrong, can you please refresh the page and log in again!');
        return Promise.reject(error);
      }
    );
  
    return () => {
      axiosInstance2.interceptors.response.eject(responseInterceptor);
    }
  }, []);
  






  return axiosInstance2;
};
