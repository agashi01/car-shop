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

  return (
    <>
      <Logo />
      <div className='box'>
        {page === 'signIn' ? <SignInForm /> : <Register />}
        {page === 'register' ? (<div className='register'>
          <p className='text' style={{
            marginRight: 5,
          }}>Already have an account? </p>
          <button
            onClick={() => setPage('signIn')}
            type='button'>Sign In</button>
        </div>) : (<div className='register'>
          <p className='text' style={{
            fontSize: 13,
            marginRight: 5,

          }}>Do not have an account? </p>
          <button onClick={() => setPage('register')} type='btn'>Register</button>
        </div>)}
      </div>
    </>
  )
}
