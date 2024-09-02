import React, { useState, useEffect, useRef } from "react";
import CarCard from "./CarCard";
import axios from "axios";
import carLogo from "../car_logo.png";
import debounce from "lodash/debounce";

// eslint-disable-next-line react/prop-types
function Home({ dealer, id, page, logo, guest, username, guestFunc }) {
  const [vehicleInput, setVehicleInput] = useState([]);
  const [modelInput, setModelInput] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [modelClicked, setModelClicked] = useState("model-unclicked");
  const [vehicleClicked, setVehicleClicked] = useState("vehicle-unclicked");
  const [isit, setIsit] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState("burger unclicked");
  const [menu, setMenu] = useState("menu-hidden");
  const [cars, setCars] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [limit] = useState(21);
  const [pageNumber, setPageNumber] = useState(1);
  const account = useRef(null);
  const [modelClass, setModelClass] = useState(false);
  const [deletMarket, setDeletMarket] = useState(false);
  const [deletSold, setDeletSold] = useState(false);
  const [carId, setCarId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [end, setEnd] = useState(false);
  const [num, setNum] = useState(0);

  const modelRef = useRef();
  const modelMenuRef = useRef();
  const vehicleRef = useRef();
  const vehicleMenuRef = useRef();
  const burgerMenuRef = useRef();
  const burgerRef = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    let count = 0
    if (dealer === "Selling") {
      for (let x of cars) {
        if (x.dealer_id !== id) {
          count++
        }
      }
      setNum(count)
    }
  }, [cars]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/model", {
        params: {
          vehicleList,
        },
      })
      .then((res) => {
        setModelInput(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }, [vehicleList]);

  const sorted = (list) => {
    for (let x = 0; x < list.length; x++) {
      let letter2 = "Z";
      loop2: for (let y = x; y < list.length; y++) {
        let letterY = list[y].make[0];
        if (letterY <= letter2) {
          if (y === x) {
            letter2 = letterY;
            continue loop2;
          }
          let car = list[x];
          list[x] = list[y];
          list[y] = car;
          letter2 = letterY;
        }
      }
    }
    return list;
  };

  const checkMenu = (e) => {
    const list = [modelMenuRef, vehicleMenuRef, burgerMenuRef];
    return list.some((ref) => ref.current && ref.current.contains(e.target));
  };

  const checkButton = (e) => {
    const list = [modelRef, vehicleRef, burgerRef];

    let switchEl = null;
    list.forEach((ref, index) => {
      if (ref.current && ref.current.contains(e.target)) {
        switchEl = index;
      }
    });

    if (switchEl !== null) {
      return switchEl;
    }

    return checkMenu(e) ? null : -1;
  };

  useEffect(() => {
    const onEscapePress = () => {
      let timeout;
      return (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (e.key === "Esc" || e.key === "Escape") {
            setBurgerMenu("burger unclicked");
            setMenu("menu-hidden");
            setModelClicked("model-unclicked");
            setVehicleClicked("vehicle-unclicked");
          }
        }, 100);
      };
    };
    const result = onEscapePress();

    document.addEventListener("keydown", result);

    return () => {
      document.removeEventListener("keydown", result);
    };
  }, []);

  useEffect(() => {
    const defaultClass = debounce((e) => {
      let switchEl = checkButton(e);

      if (switchEl > -1 && switchEl !== null) {
        for (let x = 0; x < 3; x++) {
          if (x !== switchEl) {
            switch (x) {
              case 0:
                setModelClicked("model-unclicked");
                // setBurgerMenu('burger unclicked')
                break;
              case 1:
                setVehicleClicked("vehicle-unclicked");
                // setBurgerMenu('burger unclicked')
                break;
              case 2:
                setBurgerMenu("burger unclicked");
                setMenu("menu-hidden");
                break;
            }
          }
        }
      } else if (switchEl === -1) {
        setBurgerMenu("burger unclicked");
        setMenu("menu-hidden");
        setModelClicked("model-unclicked");
        setVehicleClicked("vehicle-unclicked");
      } else {
        return;
      }
    }, 100);

    document.addEventListener("click", defaultClass);

    return () => {
      document.removeEventListener("click", defaultClass);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/make")
      .then((response) => {
        const res = response.data;
        const list = sorted(res.map((item, index) => ({ id: index, ...item, checked: false })));
        setVehicleInput(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Note the empty dependency array

  useEffect(() => {
    const listV = vehicleInput.filter((item) => item.checked).map((item) => item.make);
    setVehicleList(listV.length ? listV : vehicleInput.map((item) => item.make));
  }, [vehicleInput]);

  useEffect(() => {
    const listM = modelInput.filter((item) => item.checked).map((item) => item.model);
    setModelList(listM.length ? listM : modelInput.map((item) => item.model));
  }, [modelInput]);

  useEffect(() => {
    const fetchCars = async () => {
      const url = guest ? "http://localhost:3000/cars/guest" : "http://localhost:3000/cars";
      const params = {
        dealer,
        num,
        vehicle: vehicleList,
        model: modelList,
        pageNumber,
        limit,
        ...(guest ? {} : { id }),
      };
      try {
        const res = await axios.get(url, { params });
        setCars(res.data[1]);
        setEnd(res.data[0])
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [vehicleList, modelList, pageNumber]);

  const burgerMenuFunc = (e) => {
    e.preventDefault();
    if (burgerMenu === "burger clicked") {
      setBurgerMenu("burger unclicked");
      setMenu("menu-hidden");
    } else {
      setBurgerMenu("burger clicked");
      setMenu("menu-visible");
    }
  };

  const modelMenu = (e) => {
    e.preventDefault();
    setModelClicked(modelClicked === "model-unclicked" ? "model-clicked" : "model-unclicked");
  };

  const vehicleMenu = (e) => {
    e.preventDefault();
    setVehicleClicked(
      vehicleClicked === "vehicle-unclicked" ? "vehicle-clicked" : "vehicle-unclicked"
    );
  };

  const checked = (obj) => () => {
    setModelClass(false);
    setVehicleInput(() => {
      return vehicleInput.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: !el.checked };
        }
        return el;
      });
    });
  };

  const checkedM = (obj) => () => {
    setModelClass(true);
    setModelInput(() => {
      return modelInput.map((el) => {
        if (obj.id === el.id) {
          return { ...el, checked: !el.checked };
        }
        return el;
      });
    });
  };

  const changePage = (str) => () => {
    page(str);
  };

  const check = (str) => {
    for (let x of str) {
      if (x.checked) {
        return true;
      }
    }
    return false;
  };

  const all = () => {
    setModelClass(false);
    setVehicleInput(vehicleInput.map((obj) => ({ ...obj, checked: true })));
  };

  const reset = () => {
    setModelClass(false);
    setVehicleInput(vehicleInput.map((obj) => ({ ...obj, checked: false })));
  };

  const allModel = () => {
    setModelClass(true);
    setModelInput(modelInput.map((obj) => ({ ...obj, checked: true })));
  };

  const resetModel = () => {
    setModelClass(false);
    setModelInput(modelInput.map((obj) => ({ ...obj, checked: false })));
  };

  const soldDelete = (e) => {
    console.log(deletSold, carId);
    e.preventDefault();
    setRemoveId(carId);
    axios
      .delete("http://localhost:3000/cars", { params: { id: carId } })
      .then((res) => {
        setRemoveId(carId);
        console.log(res);
        setDeletSold(false);
      })
      .catch((err) => console.log(err));
  };

  const marketDelete = (e) => {
    console.log(deletMarket, carId);
    e.preventDefault();
    axios
      .delete("http://localhost:3000/cars", { params: { id: carId } })
      .then((res) => {
        console.log(res);
        setRemoveId(carId);
        setDeletMarket(false);
      })
      .catch((err) => console.log(err));
  };

  const scroll = (direction) => () => {
    let position = direction === "bottom" ? document.body.scrollHeight : 0;
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div className="complet">
      {deletMarket && (
        <div className="isit remove-card">
          <p className="isit-first">Are you sure want to remove this car from the market!</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            <button type="btn" className="btn2" onClick={() => setDeletMarket(false)}>
              No
            </button>
            <button type="btn" className="btn2" onClick={marketDelete}>
              Yes
            </button>
          </div>
        </div>
      )}
      {deletSold && (
        <div className="isit remove-card">
          <p className="isit-first">Your sold car has been removed!</p>
          <button type="btn" className="btn2" onClick={soldDelete}>
            Ok
          </button>
        </div>
      )}
      {isit && (
        <div className="modal">
          <div className='itis'>
            <p className="isit-first">You need to sign in before purchasing!</p>
            <p className="isit-second">Go back to sign in</p>
            <button
              type="btn"
              className="btn2"
              onClick={(e) => {
                e.preventDefault();
                page("signIn");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {guest ? (
        <nav className="home">
          <div className="vehicles-menu">
            <button ref={vehicleRef} onClick={vehicleMenu} className="vehicle here">
              Vehicle
            </button>
            <button ref={modelRef} onClick={modelMenu} className="vehicle">
              model
            </button>
          </div>
          <div className="home-logo">
            <img
              className={`logo ${logo}`}
              src={carLogo}
              alt="logo"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxShadow: "0px 4px 10px",
                transition: "transform 0.2s ease-in-out",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <div className="filter">
            <div ref={vehicleMenuRef} className={vehicleClicked}>
              <ul className="ul">
                <li onClick={all} className="reset-li">
                  <div className="reset">Select all</div>
                </li>
                {check(vehicleInput) ? (
                  <li onClick={reset} className="reset-li">
                    <div className="reset">Reset</div>
                  </li>
                ) : null}
                {vehicleInput.map((obj) => {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <li key={obj.id} onClick={checked(obj)} className="type-input">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={obj.checked}
                        id={`input-${obj.make}`}
                      />
                      {obj.make}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div ref={modelMenuRef} className={`${modelClicked} ${modelClass ? "custom" : ""}`}>
              <ul className="ul">
                <li onClick={allModel} className="reset-li">
                  <div className="reset">Select all</div>
                </li>
                {check(modelInput) ? (
                  <li onClick={resetModel} className="reset-li">
                    <div className="reset">Reset</div>
                  </li>
                ) : null}
                {modelInput.map((obj) => {
                  return (
                    <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={obj.checked}
                        id={`input-${obj.model}`}
                      />
                      {obj.model}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="account">
            <button onClick={changePage("signIn")} className="btn2 margin">
              Sign in{" "}
            </button>
            <button onClick={changePage("register")} className="btn2 margin">
              {" "}
              Register{" "}
            </button>

            <div ref={burgerRef} onClick={burgerMenuFunc} className="burger-menu">
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
              <div className={burgerMenu}></div>
            </div>
          </div>
          <div ref={burgerMenuRef} className={menu}>
            <div className="help">
              <ul className="ul">
                <li onClick={() => page("signIn")}>Sign In</li>
                <li onClick={() => page("register")}>Register</li>
                <li>Home</li>
              </ul>
            </div>
          </div>
        </nav>
      ) : // logged in

        dealer === "Selling" ? (
          <>
            <nav className="home">
              <div className="vehicles-menu">
                <button ref={vehicleRef} onClick={vehicleMenu} className="vehicle here">
                  Vehicle
                </button>
                <button ref={modelRef} onClick={modelMenu} className="vehicle">
                  model
                </button>
              </div>
              <div className="home-logo">
                <img
                  className={`logo ${logo}`}
                  src={carLogo}
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 10px",
                    transition: "transform 0.2s ease-in-out",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div className="filter">
                <div ref={vehicleMenuRef} className={vehicleClicked}>
                  <ul>
                    <li onClick={all} className="reset-li">
                      <div className="reset">Select all</div>
                    </li>

                    {check(vehicleInput) ? (
                      <li onClick={reset} className="reset-li">
                        <div className="reset">Reset</div>
                      </li>
                    ) : null}

                    {vehicleInput.map((obj) => (
                      <li key={obj.id} onClick={checked(obj)} className="type-input">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={obj.checked}
                          id={`input-${obj.make}`}
                        />
                        {obj.make}
                      </li>
                    ))}
                  </ul>
                </div>

                <div ref={modelMenuRef} className={`${modelClicked} ${modelClass ? "custom" : ""}`}>
                  <ul className="ul">
                    <li onClick={allModel} className="reset-li">
                      <div className="reset">Select all</div>
                    </li>
                    {check(modelInput) ? (
                      <li onClick={resetModel} className="reset-li">
                        <div className="reset">Reset</div>
                      </li>
                    ) : null}
                    {modelInput.map((obj) => {
                      return (
                        <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={obj.checked}
                            id={`input-${obj.model}`}
                          />
                          {obj.model}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div ref={account} className="account">
                <button className="btn-account"></button>
                <p className="username">{username}</p>
                <div ref={burgerRef} onClick={burgerMenuFunc} className="burger-menu">
                  <div className={burgerMenu}></div>
                  <div className={burgerMenu}></div>
                  <div className={burgerMenu}></div>
                </div>
              </div>
              <div ref={burgerMenuRef} className={menu}>
                <div className="help">
                  <ul className="ul">
                    <li onClick={() => page("register")}>New account</li>
                    <li onClick={() => page("signIn")}>Sign Out</li>
                    <li onClick={guestFunc}>Guest</li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        ) : (
          <nav className="home">
            <div className="vehicles-menu">
              <button ref={vehicleRef} onClick={vehicleMenu} className="vehicle here">
                Vehicle
              </button>
              <button ref={modelRef} onClick={modelMenu} className="vehicle">
                model
              </button>
            </div>
            <div className="home-logo">
              <img
                className={`logo ${logo}`}
                src={carLogo}
                alt="logo"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 10px",
                  transition: "transform 0.2s ease-in-out",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="filter">
              <div ref={vehicleMenuRef} className={vehicleClicked}>
                <ul>
                  <li onClick={all} className="reset-li">
                    <div className="reset">Select all</div>
                  </li>

                  {check(vehicleInput) ? (
                    <li onClick={reset} className="reset-li">
                      <div className="reset">Reset</div>
                    </li>
                  ) : null}

                  {vehicleInput.map((obj) => (
                    <li key={obj.id} onClick={checked(obj)} className="type-input">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={obj.checked}
                        id={`input-${obj.make}`}
                      />
                      {obj.make}
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={modelMenuRef} className={`${modelClicked} ${modelClass ? "custom" : ""}`}>
                <ul className="ul">
                  <li onClick={allModel} className="reset-li">
                    <div className="reset">Select all</div>
                  </li>
                  {check(modelInput) ? (
                    <li onClick={resetModel} className="reset-li">
                      <div className="reset">Reset</div>
                    </li>
                  ) : null}
                  {modelInput.map((obj) => {
                    return (
                      <li key={obj.id} onClick={checkedM(obj)} className="type-input">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={obj.checked}
                          id={`input-${obj.model}`}
                        />
                        {obj.model}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div ref={account} className="account">
              <button className="btn-account"></button>
              <p className="username">{username}</p>
              <div ref={burgerRef} onClick={burgerMenuFunc} className="burger-menu">
                <div className={burgerMenu}></div>
                <div className={burgerMenu}></div>
                <div className={burgerMenu}></div>
              </div>
            </div>
            <div ref={burgerMenuRef} className={menu}>
              <div className="help">
                <ul className="ul">
                  <li onClick={() => page("register")}>New account</li>
                  <li onClick={() => page("signIn")}>Sign Out</li>
                  <li onClick={guestFunc}>Guest</li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      <div className="sell-cars-ul">
        {dealer === "Selling" ? (
          <div className="scroll-bottom">
            <button
              onClick={() => page("add")}
              className="btn sell ul"
              style={{ position: "relative" }}
            >
              Add a car
            </button>
            <div onClick={scroll("bottom")} className="arrows">
              <div className="arrow"></div>
              <div className="arrow"></div>
              <div className="arrow"></div>
            </div>
          </div>
        ) : null}
        <div className="cars-page">
          <ul className="cars-ul">
            {cars.map((car) => {
              // console.log(car.id)
              return (
                // eslint-disable-next-line react/jsx-key
                <li key={car.id}>
                  <CarCard
                    removeId={removeId}
                    carId={setCarId}
                    deletMarket={setDeletMarket}
                    deletSold={setDeletSold}
                    id={id}
                    isit={setIsit}
                    guest={guest}
                    car={car}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="page">
          <div className="bottom-middle">
            <button
              className={`btn${pageNumber === 1 ? " disabled" : ""}`}
              onClick={(e) => {
                scroll("top")(e);
                setPageNumber(pageNumber - 1);
              }}
            >
              Previous
            </button>
            <span>Page {pageNumber}</span>
            <button
              className={`btn${cars.length < limit || end ? " disabled" : ""}`}
              onClick={(e) => {
                scroll("top")(e);
                setPageNumber(pageNumber + 1);
              }}
              disabled={cars.length < limit}
            >
              Next
            </button>
          </div>

          <div onClick={scroll("top")} className="arrows-up">
            <div className="arrow-up"></div>
            <div className="arrow-up"></div>
            <div className="arrow-up"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
