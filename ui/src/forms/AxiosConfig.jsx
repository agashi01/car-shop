/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useGuest } from "../Context";
import {axiosInstance} from "AxiosConfig4000"

export const axiosInstance = () => {
  const { guest } = useGuest();

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

  const responseInterceptor = axiosInstance2.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      const original = error.config;
      const errMessage = err.response?.data;

      if (!original._retry) {
        original._retry = 0;
      }
      if (original._retry < 1 && errMessage === "Token has expired") {
        const token=localStorage.getItem("refreshToken")    
        axios.post()


      }
    }
  );

  return axiosInstance2;
};
