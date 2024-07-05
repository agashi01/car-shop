/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { React, useEffect, useState } from 'react';

import axios from 'axios'


// eslint-disable-next-line react/prop-types
export default function CarCard({ id, isit, guest, car }) {

    const[purchased,setPurchased]=useState(false)
    const [flip, setFlip] = useState(false)
    const carObj = Object.keys(car)

    const transmission=(e)=>{
        if(e==="automatic_transmission")
            return "automatic"
        return e
    }   

    useEffect(()=>{

    },[])

    const purchasing=(carId)=>(e)=>{
        console.log(id)

        e.stopPropagation()
        if(guest){
            isit(true)
            return
        }
        
        axios.put("http://localhost:3000/cars",{id,carId})
        .then((res)=>{
            setPurchased(true);
            console.log(purchased)
            console.log(res)
        })
        .catch(err=>console.log(err))

    }

    const mileageUpdate = (km) => {
        let string = km.toString().split("")
        let final = ""

        let num = 1;
        for (let i = 0; i < string.length; i++) {
            final += string[i]

            if (num % 3 === 0 && num != 0 && !(i + 1 === string.length)) {
                final += ","
            }
            num++
        }
        // console.log(final)   
        return final + " km"
    }

    return (
        // eslint-disable-next-line react/prop-types
        
        <div onClick={() => setFlip(!flip)}
            className={flip ? 'car-card flip' : "car-card"}>
            <div className="front">
                <div className="card-png"></div>
                <div className="marka">{car.make}</div>
                <div className="card-features">
                    <div className="car-model">{car.model}</div>
                    <div className="car-mileage">{mileageUpdate(car.mileage)}</div>
                </div>
            </div>
            <div className="back">

                <div className="specification" >{carObj[3]}: {car.make}</div>
                <div className="specification" >{carObj[4]}: {car.model}</div>
                <div className="specification" >{carObj[5]}: {mileageUpdate(car.mileage)}</div>
                <div className="specification" >{carObj[8]}: {car.fuel_type}</div>
                <div className="specification" >{carObj[9]}: {car.vehicle_type}</div>
                <div className="specification" >{carObj[7]}: {transmission(car.transmission)}</div>
                <div className="specification" >{carObj[6]}: {car.color}</div>
                {(purchased || (car.owner_id!=null &&id!=null&&car.owner_id===id)) ?<button className="purchased">owned</button> :
                 car.owner_id ? <button className="purchased">Out of stock</button>:
                <button className='purchase' onClick={purchasing(car.id)} type='btn' >Purchase</button>}




            </div>


        </div >



    )
}