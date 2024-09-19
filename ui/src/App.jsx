import React from "react";
import { useState, useEffect } from "react";
// import { useEffect } from 'react'
import Logo from "./Logo.jsx";
// import GetStarted from "./GetStarted.jsx";
import SignInForm from "./forms/SignIn.jsx";
import Register from "./forms/Register.jsx";
import Home from "./forms/Home.jsx";
import AfterRegister from "./forms/AfterRegister.jsx";
import Add from "./forms/Add.jsx";
import AfterAdd from "./forms/AfterAdd.jsx";
import AppLogo from "./forms/AppLogo.jsx";
import AuthMessage from "./forms/AuthMessage.jsx";
import { useGuest } from "./Context.jsx";
import { axiosInstance as useAxiosInstance } from "./forms/AxiosConfig4000.jsx";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

export default function App() {
    const [dealer, setDealer] = useState(false);
    const [id, setId] = useState(null);
    const { authMessage, setAuthMessage } = useGuest();
    const [username, setUsername] = useState("");
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        localStorage.setItem('lastPath', location.pathname)
    }, [location])

    useEffect(() => {
        if (!localStorage.getItem("token")) { // if not logged in
            navigate("Sign-in");
        }
    }, [])

    useEffect(() => {
        const isFirstLoad = localStorage.getItem('isFirstLoad')

        if (!isFirstLoad) {
            localStorage.setItem('isFirstLoad', true)
            // localStorage.removeItem('token')
            // localStorage.removeItem('refreshToken')
            localStorage.setItem('guest', true)
            localStorage.removeItem('id')
        }
        return () => {
            localStorage.removeItem('isFirstLoad')
            localStorage.removeItem('lastPath')
        }
    }, []);

    const auth = () => {
        setAuthMessage("");
        console.log('fsef')

        axiosInstance
            .post("/sign-out", {
                token: localStorage.getItem("refreshToken"),
            })
            .then(() => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("token");
            })
            .catch((err) => {
                console.log(err);
            });
        navigate("/sign-in");
    };
    console.log(auth, 'auth')

    return (
        <>
            <Routes>
                <Route
                    element={
                        <AppLogo />
                    }
                >
                    <Route
                        path="/Sign-in"
                        element={
                            <SignInForm
                                dealer={setDealer}
                                id={setId}
                                username={setUsername}
                            />
                        }
                    ></Route>
                    <Route path="/Add" element={<Add id={id} />}></Route>
                    <Route path="/After-add" element={<AfterAdd />}></Route>
                    <Route path="/After-register" element={<AfterRegister />}></Route>
                    <Route path="/Register" element={<Register />}></Route>
                </Route>

                <Route
                    path="/"
                    element={
                        <Home
                            auth={auth}
                            dealer={dealer}
                            id={id}
                            logo3={Logo}
                            username={username}
                        />
                    }
                ></Route>
            </Routes>

            {authMessage && <AuthMessage auth={auth} authMessage={authMessage} />}
        </>
    );
}
