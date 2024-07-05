import React, { useState, useEffect } from 'react'
import CarCard from './CarCard'
import axios from 'axios';
import Logo from '../Logo';


// eslint-disable-next-line react/prop-types
function Home({ id, page, logo, guest, username }) {
  []
  const [vehicleType, setVehicleType] = useState([])
  const [modelType, setModelType] = useState([])
  const [modelClicked, setModelClicked] = useState("model-unclicked")
  const [vehicleClicked, setVehicleClicked] = useState("vehicle-unclicked")
  const [isit, setIsit] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState("burger unclicked")
  const [menu, setMenu] = useState('menu-hidden')
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/make')
      .then(row => {
        const res=row.data
        const list = []
        for (let x = 0; x < res.length; x++) {
          list[x] = { ...res[x], checked: false }
        }
        setVehicleType(list)
        console.log(list)
        console.log(cars)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    logo("logo-home")
  }, [])

  useEffect(() => {
    const url = guest ? 'http://localhost:3000/cars/guest' : 'http://localhost:3000/cars'
    const params = { vehicle: vehicleType, model: modelType }
    if (!guest) params.id = id
    axios
      .get(url, {
        params
      })
      .then(res => {
        setCars(res.data)
      })
      .catch(err => {

        console.log(err)
      })

  }, [vehicleType, modelType])

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



  const modelMenu = (e) => {
    e.preventDefault()
    console.log('ersg')
    setModelClicked(modelClicked === "model-unclicked" ? 'model-clicked' : 'model-unclicked')
  }

  const vehicleMenu = (e) => {
    e.preventDefault()
    setVehicleClicked(vehicleClicked === "vehicle-unclicked" ? 'vehicle-clicked' : 'vehicle-unclicked')

  }


  return (
    <div className="complet">
      {isit && <div className="isit">
        <p className='isit-first'>You need to sign in before purchasing!</p>
        <p className="isit-second">Go back to sign in</p>
        <button type='btn' className='btn2' onClick={e => {
          e.preventDefault()
          page('signIn')
        }}>Ok</button>
      </div>}
      {guest ?
        <nav className="home">
          <div className="welcome-home">
            <h2>The best car shop</h2>
          </div>
          <div className='vehicles-menu'>
            <button onClick={vehicleMenu} className='vehicle here'>Vehicle</button>
          </div>
          <div className={vehicleClicked}>
            <ul>
              <li>BMW</li>
              <li>Audi</li>
              <li>Mercedes-benz</li>
            </ul>
          </div>
          <div className="model-menu">
            <button onClick={modelMenu} className='vehicle'>model</button>
            <div className={modelClicked}>
              <ul>
                <li>BMW</li>
                <li>Audi</li>
                <li>Mercedes-benz</li>
              </ul>
            </div>
          </div>
          <div className="home-guest-sign">
            <button className="signIn-home">Sign in  </button>
            <button className="register-home"> Register </button>
          </div>
        </nav>
        :
        <nav className="home">
          <div className="home-logo">
            < Logo />
          </div>
          <div className="welcome-home">
            <h2>The best car shop</h2>
          </div>
          <div className='vehicles-menu'>
            <button onClick={vehicleMenu} className='vehicle here'>Vehicle</button>
          </div>
          <div className={vehicleClicked}>
            < ul>
              <li>
                <input type="checkbox"></input>
              </li>
              <li>Audi</li>
              <li>Mercedes-benz</li>
            </ul>
          </div>
          <div className="model-menu">
            <button onClick={modelMenu} className='vehicle'>model</button>
          </div>
          <div className={modelClicked}>

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

      <ul className='cars-ul'>
        {cars.map(car => {
          // console.log(car.id)
          return (
            // eslint-disable-next-line react/jsx-key
            <li >
              <CarCard id={id} isit={setIsit} guest={guest} car={car} />
            </li>
          )
        })}
      </ul>


    </div>
  )
}



export default Home