import React from 'react';

// eslint-disable-next-line react/prop-types
export default function AfterRegister({page}) {

    return (
        <div >
            <div >
                <p>You have been registered successfully!</p>
            </div>
            <div className='can-signIn'>
                <p>You can sign in now</p>
                <button type='btn' className='btn-after' onClick={e=>{
                    e.preventDefault()
                    page('signIn')}}>Ok</button>


            </div>


        </div>
    )



}