import React from 'react';

import car_logo from './car_logo.png';

export default function Logo() {
  return (
    <div className='logo-container'>
      <img className='logo' src={car_logo} alt='logo' />
    </div>
  )
}