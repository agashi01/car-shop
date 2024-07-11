import React, { useState, useEffect } from 'react'
import CarCard from './CarCard'
import axios from 'axios';
import carLogo from '../car_logo.png'


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

  useEffect(() => {
    axios.
      get('http://localhost:3000/model', {
        params: {
          vehicleList
        }
      })
      .then((res) => {
        setModelInput(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return
  }, [vehicleList])



  const sorted = (list) => {
    for (let x = 0; x < list.length; x++) {
      let letter2 = 'Z'
      loop2: for (let y = x; y < list.length; y++) {
        let letterY = list[y].make[0]
        if (letterY <= letter2) {
          if (y === x) {
            letter2 = letterY
            console.log(letter2)
            continue loop2
          }
          let car = list[x]
          list[x] = list[y]
          list[y] = car
          letter2 = letterY
        }
      }
    }
    return list
  }


  useEffect(() => {
    axios.get('http://localhost:3000/make')
      .then(response => {
        const res = response.data;
        const list = sorted(res.map((item, index) => ({ id: index, ...item, checked: false })));
        console.log(list, 'ddddd')
        setVehicleInput(list);
      })
      .catch(err => {
        console.log(err);
      });
    setUse(!use)
  }, []); // Note the empty dependency array

  useEffect(() => {
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
    setVehicleList(listV)
  }, [vehicleInput])

  useEffect(() => {
    const listM = []
    let count = 0
    for (let x = 0; x < modelInput.length; x++) {
      if (modelInput[x].checked) {
        listM[count] = modelInput[x].model
        count++;
      }
    }
    if (!count) {
      for (let x = 0; x < modelInput.length; x++) {
        console.log('i got here')
        listM[x] = modelInput[x].model
      }
    }

    setModelList(listM)
    setUse(!use)
  }, [modelInput])

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

  }, [use, modelInput])

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

  const checked = (obj) => () => {
    setVehicleInput(() => {
      return vehicleInput.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: (!el.checked) }
        }
        return el
      })
    })
  }

  const checkedM = (obj) => () => {
    setModelInput(() => {
      return modelInput.map((el) => {
        if (obj.id === el.id) {
          return { ...el, checked: (!el.checked) }
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
            < ul>
              {vehicleInput.map(obj => {

                // eslint-disable-next-line react/jsx-key
                return <li onClick={checked(obj)} className="type-input"> <label onClick={checked(obj)} className="checkbox-container">
                  <input onClick={checked(obj)} type="checkbox" checked={obj.checked}>
                  </input>
                  <span onClick={checked(obj)} className="custom-checkbox"></span>
                </label> {obj.make}</li>
              })}
            </ul>
          </div>
          <div className="model-menu">
            <button onClick={modelMenu} className='vehicle'>model</button>
          </div>
          <div className={modelClicked}>
            <ul className="ul">
              {modelInput.length > 0 && <li onClick={() => console.log('reset clicked')} className="type-input">Reset</li>}
              {modelInput.map((obj) => {
                return <li key={obj.id} onClick={checkedM(obj)} className="type-input"> <label onClick={checkedM(obj)} className="checkbox-container">
                  <input onClick={checkedM(obj)} type="checkbox" checked={obj.checked}>
                  </input>
                  <span onClick={checkedM(obj)} className="custom-checkbox"></span>
                </label>{obj.model}</li>
              })}
            </ul>

          </div>
          <div className="home-guest-sign">
            <button className="signIn-home">Sign in  </button>
            <button className="register-home"> Register </button>
          </div>
          <div className='account'>
            <p className='username'>{username}</p>
            <div onClick={burgerMenuFunc} className='burger-menu'>
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
            </div>
          </div>
          <div className={menu}>
            <div className='help'>
              <ul className='ul'>
                <li><a>Home</a></li>
                <li><a>about</a></li>
                <li><a>Help</a></li>
                <li><a>Services</a></li>
              </ul>

            </div>
          </div>
        </nav>
        :
        <nav className="home">
          <div className="home-logo">
            <img className={logo} src={carLogo} alt='logo' style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%'
            }} />
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

                // eslint-disable-next-line react/jsx-key
                return <li key={obj.id} onClick={checked(obj)} className="type-input">
                  <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.make}`} />
                  {obj.make}

                </li>
              })}
            </ul>
          </div>
          <div className="model-menu">
            <button onClick={modelMenu} className='vehicle'>model</button>
          </div>
          <div className={modelClicked}>
            <ul className="ul">
              {modelInput.map((obj) => {
                return <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                  <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.model}`} />
                  {obj.model}

                </li>
              })}
            </ul>

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
              <ul className='ul'>
                <li><a>Home</a></li>
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