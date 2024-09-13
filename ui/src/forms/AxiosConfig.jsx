/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useGuest } from "../Context";
import { axiosInstance as useAxiosInstance } from "AxiosConfig4000";
const axiosInstance4000 = useAxiosInstance();

export const axiosInstance = () => {
  const { guest } = useGuest();
  const { }

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
    async (error) => {
      const original = error.config;
      const errMessage = err.response?.data;

      if (!original._retry) {
        original._retry = 0;
      }
      if (original._retry < 1 && errMessage === "Token has expired") {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const retry=await axiosInstance4000.post("/token", { refreshToken })
          
            const token=retry.data
            localStorage.setItem('token',token)
            original.headers['Authorization']=`Bearer ${token}`
          return axiosInstance2(original)
        } catch (err) {

        }
      }
    }
  );

  return axiosInstance2;
};
