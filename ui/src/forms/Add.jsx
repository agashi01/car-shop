/* eslint-disable react/jsx-key */
import {React,useEffect,useState} from "react";
import axios from 'axios'

export default function Add({id}) {

  const [allMake,setAllMake]=useState([])
  const [allModel,setAllModel]=useState([])
  const [make,setMake]=useState("")
  const [model,setModel]=useState("")
  // const [color]=useState([])
  // const []=useState([])
  // const []=useState([])
  // const []=useState([])
  // const []=useState([])


useEffect(()=>{
  axios.get('http://localhost:3000/dealerMake',{params:{model}})
  .then(res=>{
    setAllMake(res.data)
  })

},[model])

useEffect(()=>{
  axios.get('http://localhost:3000/dealerModel',{params:{make}})
  .then(res=>{
    console.log(res)
    setAllModel(res.data)
  })

  

},[make])

  return (

    <div className="sell-menu">
      {/* <h3 style={{color:'white'}}>Form</h3> */}
      <div style={{display:'flex'}}>

        <div className="options">
          <p className="text">make:</p>
          <select onChange={e=>setMake(e.target.value)}className="select sell">
          <option value="">Select</option>
            {allMake.map((use,index)=>{
              return <option key={index} value={use.make}>{use.make}</option>
            })}
        
          </select>
        </div>
        <div className="options">
          <p className="text">model:</p>
          <select onChange={e=>setModel(e.target.value)} className="select sell">
            <option value="">Select</option>
            {allModel.map((use,index)=>{
              return <option key={index} value={use.make}>{use.make}</option>
            })}
          </select>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'flex-end',gap:'50px'}}>

        <div className="options">
          <p className="text">mileage:</p>
          <input className="input-sell">
          </input>
        </div>
        <div className="options">
          <p className="text">color:</p>
          <input className="input-sell">
          </input>
        </div>
      </div>

      <div style={{display:'flex'}}>

        <div className="options">
          <p className="text">transmission:</p>
          <select className="select sell">
            <option value="">Select</option>
            <option value=""></option>
          </select>
        </div>
        <div className="options">
          <p className="text">fuel_type:</p>
          <select className="select sell">
            <option value="">Select</option>
            <option value=""></option>
          </select>
        </div>
      </div>

      <div style={{display:'flex'}}>

        <div className="options">
          <p className="text">vehicle_type:</p>
          <select className="select sell">
            <option value="">Select</option>
            <option value=""></option>
          </select>
        </div>
        <div className="options">
          <p className="text">dealer_id:</p>
          <select className="select sell">
            <option value="">Select</option>
            <option value=""></option>
          </select>
        </div>
      </div>

    </div>


  );
}