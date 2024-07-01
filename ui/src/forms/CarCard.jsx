/* eslint-disable react/prop-types */

import { React, useState } from 'react';

// import axios from 'axios'


// eslint-disable-next-line react/prop-types
export default function CarCard({ car }) {

    const [flip, setFlip] = useState(false)
    const carObj = Object.keys(car)


    const modelUpdate = (s) => {

        if ("12345678".includes(s)) {
            return s + "-Series";
        } else if ("SEC".includes(s)) {
            return s + "-Class"
        }
        return s;

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
                    <div className="car-model">{modelUpdate(car.model)}</div>
                    <div className="car-mileage">{mileageUpdate(car.mileage)}</div>
                </div>
            </div>
            <div className="back">

                <div>{carObj[0]}:{car.make}</div>
                <div>{carObj[1]}:{car.model}</div>
                <div>{carObj[2]}:{car.mileage}</div>
                <div>{carObj[3]}:{car.transmission}</div>
                <div>{carObj[4]}:{car.fuel_type}</div>
                <div>{carObj[5]}:{car.vehicle_type}</div>



            </div>


        </div >



    )
}