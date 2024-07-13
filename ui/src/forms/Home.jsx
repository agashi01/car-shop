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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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
    const listV = vehicleInput.filter(item => item.checked).map(item => item.make);
    setVehicleList(listV.length ? listV : vehicleInput.map(item => item.make));
  }, [vehicleInput]);

  useEffect(() => {
    const listM = modelInput.filter(item => item.checked).map(item => item.model);
    setModelList(listM.length ? listM : modelInput.map(item => item.model));
  }, [modelInput]);

  useEffect(() => {
    const fetchCars = async () => {
      const url = guest ? 'http://localhost:3000/cars/guest' : 'http://localhost:3000/cars';
      const params = { vehicle: vehicleList, model: modelList, ...(guest ? {} : { id }) };
      try {
        const res = await axios.get(url, { params });
        setCars(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [vehicleList, modelList]);

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

  const changePage = (str) => () => {
    page(str)

  }

  const check = (str) => {
    for (let x of str) {
      if (x.checked) {
        return true
      }
    }
    return false
  }

  const all = (str, setStr) => () => {
    setStr(str.map(obj => ({ ...obj, checked: true })));
  };

  const reset = (str, setStr) => () => {
    setStr(str.map(obj => ({ ...obj, checked: false })));
  };


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
          <div className='vehicles-menu'>
            <button onClick={vehicleMenu} className='vehicle here'>Vehicle</button>
            <button onClick={modelMenu} className='vehicle'>model</button>
          </div>
          <div className="home-logo">
            <img
              className={`logo ${logo}`}
              src={carLogo}
              alt='logo'
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                boxShadow: '0px 4px 10px',
                transition: 'transform 0.2s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <div className='filter'>
            <div className={vehicleClicked}>
              <ul className="ul">

            
                    <li onClick={all(vehicleInput, setVehicleInput)} className="reset-li">
                      <div className='reset'>
                        Select all
                      </div>
                    </li>
                {check(vehicleInput) ? (
                 
                    <li onClick={reset(vehicleInput, setVehicleInput)} className="reset-li">
                      <div className='reset'>
                        Reset
                      </div>
                    </li>

                ) : null}
                {vehicleInput.map(obj => {

                  // eslint-disable-next-line react/jsx-key
                  return <li key={obj.id} onClick={checked(obj)} className="type-input">
                    <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.make}`} />
                    {obj.make}

                  </li>
                })}
              </ul>

            </div>
            <div className={modelClicked}>
              <ul className="ul">

                    <li onClick={all(modelInput, setModelInput)} className="reset-li">
                      <div className='reset'>
                        Select all
                      </div>
                    </li>
                {check(modelInput) ? (
                 
                    <li onClick={reset(modelInput, setModelInput)} className="reset-li">
                      <div className='reset'>
                        Reset
                      </div>
                    </li>

                ) : null}
                {modelInput.map((obj) => {
                  return <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                    <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.model}`} />
                    {obj.model}

                  </li>
                })}
              </ul>

            </div>
          </div>


          <div className='account'>

            <button onClick={changePage('signIn')} className="btn2 margin">Sign in  </button>
            <button onClick={changePage('register')} className="btn2 margin"> Register </button>

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
          <div className='vehicles-menu'>
            <button onClick={vehicleMenu} className='vehicle here'>Vehicle</button>
            <button onClick={modelMenu} className='vehicle'>model</button>
          </div>
          <div className="home-logo">
            <img
              className={`logo ${logo}`}
              src={carLogo}
              alt='logo'
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                boxShadow: '0px 4px 10px',
                transition: 'transform 0.2s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <div className='filter'>

            <div className={vehicleClicked}>
              <ul>
                <li onClick={all(vehicleInput, setVehicleInput)} className="reset-li">
                  <div className='reset'>
                    Select all
                  </div>
                </li>

                {check(vehicleInput) ? (
                  <li onClick={reset(vehicleInput, setVehicleInput)} className="reset-li">
                    <div className='reset'>
                      Reset
                    </div>
                  </li>
                ) : null}

                {vehicleInput.map(obj => (
                  <li key={obj.id} onClick={checked(obj)} className="type-input">
                    <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.make}`} />
                    {obj.make}
                  </li>
                ))}
              </ul>
            </div>

            <div className={modelClicked}>
              <ul className="ul">


                <li onClick={all(modelInput, setModelInput)} className="reset-li">
                  <div className='reset'>
                    Select all
                  </div>
                </li>
                {check(modelInput) ? (
                  <li onClick={reset(modelInput, setModelInput)} className="reset-li">
                    <div className='reset'>
                      Reset
                    </div>
                  </li>
                ) : null}
                {modelInput.map((obj) => {
                  return <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                    <input type="checkbox" className="custom-checkbox" checked={obj.checked} id={`input-${obj.model}`} />
                    {obj.model}

                  </li>
                })}
              </ul>

            </div>
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
        {cars.map((car,index) => {
          // console.log(car.id)
          return (
            // eslint-disable-next-line react/jsx-key
            <li >
              <CarCard key={index} id={id} isit={setIsit} guest={guest} car={car} />
            </li>
          )
        })}
      </ul>


    </div >
  )
}



export default Home