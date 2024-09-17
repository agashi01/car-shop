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
import { useGuest } from "./Context.jsx";
import { axiosInstance as useAxiosInstance } from "./forms/AxiosConfig4000.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [dealer, setDealer] = useState(false);
  const [id, setId] = useState(null);
  const [logo, setLogo] = useState("logo");
  const [page, setPage] = useState("signIn");
  const { guest, setGuest, authMessage, setAuthMessage } = useGuest();
  const [username, setUsername] = useState("");
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }, []);

  console.log(authMessage);
  const changePage = (text) => {
    setPage(text);
  };

  const guestFunc = () => {
    setGuest(true);
    setPage("home");
    setId(null);
    setUsername("");
  };

  const auth = () => {
    localStorage.removeItem("token");
    setAuthMessage("");
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
    setPage("signIn");
  };
  console.log(authMessage, "app.jsx");

  return (
    <>
      <Routes>
        <Route
          element={
           <AppLogo setPage={setPage} logo={logo} />
          }
        >
          <Route
            path="/sign-in"
            element={
              <SignInForm
                dealer={setDealer}
                id={setId}
                logo3={logo}
                logo={setLogo}
                setGuest={setGuest}
                username={setUsername}
                page={changePage}
              />
            }
          ></Route>
          <Route path="/Add" element={<Add page={page} setPage={setPage} id={id} />}></Route>
          <Route path="/After-add" element={<AfterAdd page={setPage} />}></Route>
          <Route path="/After-register" element={<AfterRegister page={changePage} />}></Route>
          <Route path="/Register" element={<Register logo={setLogo} page={changePage} />}></Route>
        </Route>

        <Route
          path="/"
          element={
            <Home
              auth={auth}
              dealer={dealer}
              id={id}
              guestFunc={guestFunc}
              page={setPage}
              logo3={Logo}
              logo={setLogo}
              guest={guest}
              username={username}
            />
          }
        ></Route>
      </Routes>
      {page !== "home" ? (
        <div>
          <div className="onclick-logo" onClick={() => setPage("home")}>
            <Logo logo={logo} />
          </div>
          <div className="div-box">
            {page === "add" ? (
              <button type="btn" onClick={() => setPage("home")} className="btn2 go-back">
                Home
              </button>
            ) : null}

            <div className="box">
              {page === "signIn" ? (
                <SignInForm
                  dealer={setDealer}
                  id={setId}
                  logo3={logo}
                  logo={setLogo}
                  setGuest={setGuest}
                  username={setUsername}
                  page={changePage}
                />
              ) : page === "register" ? (
                <Register logo={setLogo} page={changePage} />
              ) : page === "afterRegister" ? (
                <AfterRegister page={changePage} />
              ) : page === "afterAdd" ? (
                <AfterAdd page={setPage} />
              ) : page === "add" ? (
                <div>
                  <Add page={setPage} id={id} />
                </div>
              ) : null}
              {page === "register" ? (
                <div className="register">
                  <p
                    className="text"
                    style={{
                      marginRight: 5,
                    }}
                  >
                    Already have an account?{" "}
                  </p>
                  <button onClick={() => setPage("signIn")} type="button">
                    Sign In
                  </button>
                </div>
              ) : page === "signIn" ? (
                <div className="register">
                  <div className="correct-guest">
                    <p
                      className="text"
                      style={{
                        fontSize: 13,
                        marginRight: 5,
                      }}
                    >
                      Do not have an account?{" "}
                    </p>
                    <p
                      className="text2"
                      style={{
                        fontSize: 13,
                        marginRight: 5,
                      }}
                    >
                      Go as guest{" "}
                    </p>
                  </div>

                  <div className="go-as-guest">
                    <button onClick={() => setPage("register")} type="btn">
                      Register
                    </button>
                    <button
                      onClick={() => {
                        setGuest(true);
                        setPage("home");
                      }}
                      type="btn"
                    >
                      Go as guest
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <Home
          auth={auth}
          dealer={dealer}
          id={id}
          guestFunc={guestFunc}
          page={setPage}
          logo3={Logo}
          logo={setLogo}
          guest={guest}
          username={username}
        />
      )}

      {authMessage && (
        <div className="modal">
          <div className="logIn-again">
            {authMessage === "Unable to refresh token, please log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage === "Who are you? Please log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage ===
              "Something went wrong, can you please refresh the page and log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage ? (
              <>
                <p className="">Something went wrong, please log in again!</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
