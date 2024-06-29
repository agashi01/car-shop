
import { React } from 'react';

// import axios from 'axios'


// eslint-disable-next-line react/prop-types
export default function CarCard( {car} ) {

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

            if (num % 3 === 0 && num != 0 && !i + 1 === string.length) {
                final += ","
            }
            num++
        }
        return final
    }

    return (
        // eslint-disable-next-line react/prop-types
        <li className='carCard'>
            <div className="card-png"></div>
            <div>{car.make}</div>
            <div className="card-features">
                <div>{modelUpdate(car.model)}</div>
                <div>{mileageUpdate(car.mileage)}</div>
            </div>


        </li>



    )
}