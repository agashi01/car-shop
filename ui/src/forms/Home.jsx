import React, { useState, useEffect, useCallback } from 'react'
import CarCard from './CarCard'
import axios from 'axios';
import Logo from '../Logo';


// eslint-disable-next-line react/prop-types
function Home({ id, page, logo, guest, username }) {
  const [use, setUse] = useState(false)
  const [vehicleInput, setVehicleInput] = useState([])
  const [modelInput, setModelInput] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  const [modelList, setModelList] = useState([])
  const [modelClicked, setModelClicked] = useState("model-unclicked")
  const [vehicleClicked, setVehicleClicked] = useState("vehicle-unclicked")
  const [isit, setIsit] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState("burger unclicked")
  const [menu, setMenu] = useState('menu-hidden')
  const [cars, setCars] = useState([])

  useEffect(()=>{
      axios.
      get('http://localhost:3000/model',{
          params:{
            vehicleList:vehicleList
        }
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
      return 
    },[vehicleList])
  
  useEffect(() => {
    axios.get('http://localhost:3000/make')
      .then(response => {
        const res = response.data;
        const list = res.map((item, index) => ({ index, ...item, checked: false }));
        setVehicleInput(list);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Note the empty dependency array

  useEffect(() => {
    const listM = []
    const listV = []
    let count = 0;

    for (let x = 0; x < vehicleInput.length; x++) {
      if (vehicleInput[x].checked) {
        listV[count] = vehicleInput[x].make
        count++;
      }
    }
    if (!count) {
      for (let x = 0; x < vehicleInput.length; x++) {
        listV[x] = vehicleInput[x].make
      }
    }

    count = 0
    for (let x = 0; x < modelInput.length; x++) {
      if (modelInput[x].checked) {
        listM[count] = modelInput[x].make
        count++;
      }
    }
    if (!count) {
      for (let x = 0; x < modelInput.length; x++) {
        console.log('i got here')
        listM[x] = modelInput[x].make
      }
    }
    setVehicleList(listV)
    setModelList(listM)
    setUse(!use)
  }, [vehicleInput, modelInput])

  useEffect(() => {
    const url = guest ? 'http://localhost:3000/cars/guest' : 'http://localhost:3000/cars'
    const params = { vehicle: vehicleList, model: modelList }
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

  }, [use])

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

  const checked = (obj) => ()=> {
    setVehicleInput(()=>{
      return vehicleInput.map((el)=>{
        if(el.index===obj.index){
          return {...el,checked:(!el.checked)}
        }
        return el
      })
    })
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
              {vehicleInput.map(obj => {
                console.log(obj)

               // eslint-disable-next-line react/jsx-key
               return <li onClick={checked(obj)} className="type-input">{obj.make} <label onClick={checked(obj)} className="checkbox-container">
                <input onClick={checked(obj)} type="checkbox" checked={obj.checked}>
                </input>
                <span onClick={checked(obj)} className="custom-checkbox"></span>
                </label></li>
              })}
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