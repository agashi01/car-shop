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

  const [id, setId] = useState(null)
  const [logo, setLogo] = useState("logo");
  const [page, setPage] = useState('signIn');
  const [guest, setGuest] = useState(true);
  const [username, setUsername] = useState('')



  const changePage = (text) => {
    setPage(text)
  }

  const guestFunc=()=>{ 
    setGuest(true)
    setPage('home')
    setId(null)
    setUsername('')
  }

  return (
    <>
      {page !== 'home' ?
        <div>
          <div className="onclick-logo" onClick={() => setPage("home")}>
            <Logo logo={logo} />
          </div>

          <div className='box'>
            {page === 'signIn' ? <SignInForm id={setId} logo3={logo} logo={setLogo} setGuest={setGuest} username={setUsername} page={changePage} /> :
              page === 'register' ? <Register logo={setLogo} page={changePage} /> :
                page === 'afterRegister' ? <AfterRegister page={changePage} /> : null}
            {page === 'register' ? (<div className='register'>
              <p className='text' style={{
                marginRight: 5,
              }}>Already have an account? </p>
              <button
                onClick={() => setPage('signIn')}
                type='button'>Sign In</button>
            </div>) : page === 'signIn' ?
              (<div className='register'>
                <div className='correct-guest'>
                  <p className='text' style={{
                    fontSize: 13,
                    marginRight: 5,
                  }}>Do not have an account? </p>
                  <p className='text2' style={{
                    fontSize: 13,
                    marginRight: 5,
                  }}>Go as guest </p>
                </div>
    

                <div className='go-as-guest'>
                  <button onClick={() => setPage('register')} type='btn'>Register</button>
                  <button onClick={() => setPage('home')} type='btn'>Go as guest</button>
                </div>

              </div>) : null}
          </div>
        </div>

        : <Home id={id} guestFunc={guestFunc} page={setPage} logo3={Logo} logo={setLogo} guest={guest} username={username} />}
      {/* {page === 'home' && <Logo />} */}
    </>
  )
}
