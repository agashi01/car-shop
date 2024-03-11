import React from 'react';
import { useState } from 'react';
import Logo from "./Logo.jsx";
// import GetStarted from "./GetStarted.jsx";
import SignInForm from "./forms/SignIn.jsx";
import Register from "./forms/Register.jsx";
import Home from "./forms/Home.jsx"

import './App.css';

export default function App() {

  const [page, setPage] = useState('signIn');

  const signInPage = () => {
    setPage('signIn')
  }

  const registerPage = () => {
    setPage('register')
  }

  const homePage = () => {
    setPage('home');
  }


  

  return (
    <>
      <Logo />
      {page === 'signIn' ? <SignInForm home={homePage} register={registerPage} /> :
        page === 'home' ? <Home home={homePage} register={registerPage} signIn={signInPage} /> :
          <Register home={homePage} signIn={signInPage}
          
          />}

      {/* <GetStarted /> */}

    </>
  )
}
