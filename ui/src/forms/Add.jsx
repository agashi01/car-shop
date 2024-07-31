/* eslint-disable react/jsx-key */
import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Add({ page, id }) {
  const [allMake, setAllMake] = useState([]);
  const [allModel, setAllModel] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [errorMessage,setErrorMessage] =useState('');
  const [error, setError] = useState({
    make: "",
    model: "",
    mileage: "",
    color: "",
    fuelType: "",
    transmission: "",
    vehicleType: "",
  });
  const [message, setMessage] = useState({
    make: "",
    model: "",
    mileage: "",
    color: "",
    fuelType: "",
    transmission: "",
    vehicleType: "",
  });

  // when dealer submits
  const submit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('hi')
    const newMessages = { ...message };
    for (let key in error) {
      if (!error[key]) {
        newMessages[key] = 'error-add';
      } else {
        newMessages[key] = "correct-add";
      }
    }
    console.log(message)
    setMessage(newMessages); // Update the message state once with the new values
  };

  useEffect(()=>{
    for(let key in message){
      if(message[key]!=='correct-add'){
        return
      }
    }
    console.log(error)
    axios.post('http://localhost:3000/cars',{
      specs:{...error,id}
    })
    .then(()=>{
      page('afterAdd')
      console.log('succes')
    })
    .catch(err=>{
      console.log(err)
      setErrorMessage(err.data)
    })
  },[message])

  useEffect(() => {
    axios
      .get("http://localhost:3000/dealerMake", { params: { model } })
      .then((res) => {
        setAllMake(res.data);
      })
      .catch((err) => console.log(err));
  }, [model]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/dealerModel", { params: { make } })
      .then((res) => {
        console.log(res);
        setAllModel(res.data);
      })
      .catch((err) => console.log(err));
  }, [make]);

  useEffect(() => {
    axios.get("http://localhost:3000/transmission").then((res) => {
      setTransmission(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/fuelType").then((res) => {
      setFuelType(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/vehicleType").then((res) => {
      setVehicleType(res.data);
    });
  }, []);

  useEffect(()=>console.log(message),[message])

  return (
    <div className="sell-menu">
      {/* <h3 style={{color:'white'}}>Form</h3> */}
      <div style={{ display: "flex" }}>
        <div className="options">
          <p className="text">Make</p>
          <select
            onChange={(e) => {
              setError((current) => {
                return { ...current, make: e.target.value };
              });
              setMake(e.target.value);
            }}
            className={`select sell ${message.make}`}
          >
            <option value="">Select</option>
            {allMake.map((use, index) => {
              return (
                <option key={index} value={use.make}>
                  {use.make}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{marginLeft:'15px'}} className="options2">
          <p  className="text3">Model</p>
          <select
            onChange={(e) => {
              setError((current) => {
                return { ...current, model: e.target.value };
              });
              setModel(e.target.value);
            }}
            
            className={`select sell gap ${message.model}`}
          >
            <option value="">Select</option>
            {allModel.map((use, index) => {
              console.log(use);
              return (
                <option key={index} value={use}>
                  {use}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div style={{ display: "flex"}}>
        <div className="options">
          <p className="text">Mileage</p>
          <input
            onChange={(e) => {
              setError((current) => {
                return { ...current, mileage: e.target.value };
              });
            }}
            className={`input-sell ${message.mileage}`}
          ></input>
        </div>
        <div style={{marginLeft:'15px'}} className="options2">
          <p className="text3">Color</p>
          <input
            onChange={(e) => {
              setError((current) => {
                return { ...current, color: e.target.value };
              });
            }}
            className={`input-sell ${message.color}`}
          ></input>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="options" style={{ display: "flex", flexDirection: "column" }}>
          <p className="text">Transmission</p>
          <select
            onChange={(e) => {
              setError((current) => {
                return { ...current, transmission: e.target.value };
              });
            }}
            className={`select sell ${message.transmission}`}
          >
            <option value="">Select</option>
            {transmission.map((use, index) => {
              return (
                <option key={index} value={use}>
                  {use}
                </option>
              );
            })}
          </select>
        </div>
        <div className="options2">
          <p  style={{marginRight:'8px'}} className="text3">Fuel Type</p>
          <select
            onChange={(e) => {
              setError((current) => {
                return { ...current, fuelType: e.target.value };
              });
            }}
            className={`select sell gap ${message.fuelType}`}
          >
            <option value="">Select</option>
            {fuelType.map((use, index) => {
              return (
                <option key={index} value={use}>
                  {use}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="options">
          <p className="text">Vehicle Type</p>
          <select
            onChange={(e) => {
              setError((current) => {
                return { ...current, vehicleType: e.target.value };
              });
            }}
            className={`select-vehicle ${message.vehicleType}`}
          >
            <option value="">Select</option>
            {vehicleType.map((use, index) => {
              return (
                <option key={index} value={use}>
                  {use}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button  onClick={submit} type="btn" style={{ padding: "10px" }} className="create">
        Create
      </button>
      {errorMessage?<p className="text">{errorMessage}</p>:null}
    </div>
  );
}