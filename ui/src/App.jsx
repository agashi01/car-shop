import { useState } from 'react'
import React from 'react';
import Logo from "./Logo.jsx";
import GetStarted from "./GetStarted.jsx";
import SignInForm from "./SignInForm";

import './App.css';




function App() {

  return (
    <>
      <GetStarted />
      <Logo />
      <SignInForm  />

    </>
  )
}

export default App
