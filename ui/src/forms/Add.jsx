/* eslint-disable react/jsx-key */
import { React, useEffect, useState } from "react";
import axios from 'axios'

export default function Add({ id }) {

  const [allMake, setAllMake] = useState([])
  const [allModel, setAllModel] = useState([])
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [fuelType, setFuelType] = useState([])
  const [transmission, setTransmission] = useState([])
  const [vehicleType, setVehicleType] = useState([])
  const [error, setError] = useState({ make: '', model: '', mileage: '', color: '', fuelType: '', transmission: '', vehicleType: '', })

  useEffect(() => {
    axios.get('http://localhost:3000/dealerMake', { params: { model } })
      .then(res => {
        setAllMake(res.data)
      })
      .catch(err => console.log(err))

  }, [model])

  useEffect(() => {
    axios.get('http://localhost:3000/dealerModel', { params: { make } })
      .then(res => {
        console.log(res)
        setAllModel(res.data)
      })
      .catch(err => console.log(err))

  }, [make])

  useEffect(() => {
    axios.get('http://localhost:3000/transmission')
      .then(res => {
        setTransmission(res.data)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/fuelType')
      .then(res => {
        setFuelType(res.data)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/vehicleType')
      .then(res => {
        setVehicleType(res.data)
      })
  }, [])

  return (

    <div className="sell-menu">
      {/* <h3 style={{color:'white'}}>Form</h3> */}
      <div style={{ display: 'flex' }}>

        <div className="options" >
          <p className="text">Make</p>
          <select onChange={e => {
            setError(current => {
              return { ...current, make: e.target.value }
            })
            setMake(e.target.value)
          }
          } className="select sell">
            <option value="">Select</option>
            {allMake.map((use, index) => {
              return <option key={index} value={use.make}>{use.make}</option>
            })}

          </select>
        </div>
        <div className="options">
          <p className="text">Model</p>
          <select onChange={e => {
            setError(current => {
              return { ...current, model: e.target.value }
            })
            setModel(e.target.value)
          }
          } style={{ marginLeft: '50px' }} className="select sell gap">
            <option value="">Select</option>
            {allModel.map((use, index) => {
              console.log(use)
              return <option key={index} value={use}>{use}</option>
            })}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: '', gap: '50px' }}>

        <div className="options">
          <p className="text">Mileage</p>
          <input
            onChange={e => {
              setError(current => {
                return { ...current, mileage: e.target.value }
              })
            }}
            className="input-sell">
          </input>
        </div>
        <div className="options">
          <p className="text">Color</p>
          <input
            onChange={e => {
              setError(current => {
                return { ...current, color: e.target.value }
              })
            }}
            className="input-sell">
          </input>
        </div>
      </div>

      <div style={{ display: 'flex' }}>

        <div className="options" style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="text">Transmission</p>
          <select
            onChange={e => {
              setError(current => {
                return { ...current, transmission: e.target.value }
              })
            }}
            className="select sell">
            <option value="">Select</option>
            {transmission.map((use, index) => {
              return <option key={index} value={use}>{use}</option>
            })}
          </select>
        </div>
        <div className="options">
          <p className="text">Fuel Type</p>
          <select
            onChange={e => {
              setError(current => {
                return { ...current, fuelType: e.target.value }
              })
            }}
            className="select sell gap">
            <option value="">Select</option>
            {fuelType.map((use, index) => {
              return <option key={index} value={use}>{use}</option>
            })}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <div className="options">
          <p className="text">Vehicle Type</p>
          <select
            onChange={e => {
              setError(current => {
                return { ...current, vehicleType: e.target.value }
              })
            }}
            className="select-vehicle">
            <option value="">Select</option>
            {vehicleType.map((use, index) => {
              return <option key={index} value={use}>{use}</option>
            })}
          </select>
        </div>

      </div>
      <button type="btn" className='create'>Create</button>

    </div>


  );
}