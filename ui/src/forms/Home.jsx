import React, { useState } from 'react'


// eslint-disable-next-line react/prop-types
function Home({ guest, username }) {

  const [isClicked, setIsClicked] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState("burger unclicked")
  const [menu, setMenu] = useState('menu-hidden')

  const burgerMenuFunc = (e) => {
    e.preventDefault()
    if (isClicked) {
      setIsClicked(false)
      setBurgerMenu("burger unclicked")
      setMenu('menu-hidden')
    } else {
      setIsClicked(true)
      setBurgerMenu("burger clicked")
      setMenu('menu-visible')
    }

  }


  return (
    <div>
      {guest ?
        <nav className="home">
          <div className="welcome-home">
            <h2>The best car shop</h2>
          </div>
          <button className="signIn-home">Sign in  </button>
          <button className="register-home"> Register </button>
        </nav>
        :
        <nav className="home">
          <div className="welcome-home">
            <h2>The best car shop</h2>
          </div>
          <div className='vehicles-menu'>
            <button className='vehicle here'>Vehicle</button>
            <button className='vehicle'>model</button>
          </div>
          <div className='account'>
            <button className='btn-account'></button>
            <p className='username'>{username}</p>
            <div onClick={burgerMenuFunc} className='burger-menu'>
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
            </div>
          </div>
          <div className={menu}>
            <div className='help'>
              <ul>
                <li><a href="https://www.google.com" target="_blank">Home</a></li>
                <li><a>about</a></li>
                <li><a>Help</a></li>
                <li><a>Services</a></li>
              </ul>

            </div>
          </div>
        </nav>



      }

    </div>
  )
}

export default Home
