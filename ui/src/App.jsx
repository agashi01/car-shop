import React from 'react';
import { useState } from 'react';
// import { useEffect } from 'react'
import Logo from "./Logo.jsx";
// import GetStarted from "./GetStarted.jsx";
import SignInForm from "./forms/SignIn.jsx";
import Register from "./forms/Register.jsx";
import Home from "./forms/Home.jsx";
import AfterRegister from "./forms/AfterRegister.jsx";


import './App.css';

export default function App() {

  const [page, setPage] = useState('signIn');
  const [guest, setGuest] = useState(true);
  const [username, setUsername] = useState('')

  const changePage = (text) => {
    setPage(text)
  }

  return (
    <>
      {page !== 'home' ?
        <div>
          <Logo />
          <div className='box'>
            {page === 'signIn' ? <SignInForm setGuest={setGuest} username={setUsername} page={changePage} /> :
              page === 'register' ? <Register page={changePage} /> :
                page === 'afterRegister' ? <AfterRegister page={changePage} /> : null}
            {page === 'register' ? (<div className='register'>
              <p className='text' style={{
                marginRight: 5,
              }}>Already have an account? </p>
              <button
                onClick={() => setPage('signIn')}
                type='button'>Sign In</button>
            </div>) : page === 'signIn' ? (<div className='register'>
              <p className='text' style={{
                fontSize: 13,
                marginRight: 5,
              }}>Do not have an account? </p>
              <button onClick={() => setPage('register')} type='btn'>Register</button>
            </div>) : null}
          </div>
        </div>

        : <Home guest={guest} username={username} />}
      {page === 'home' && <Logo />}
    </>
  )
}
