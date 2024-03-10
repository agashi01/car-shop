import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

export default function Register({ signIn }) {

    const [register, setRegister] = useState({})

    const emri = useRef('');
    const mbiemri = useRef('');
    const email = useRef('');
    const password = useRef('');
    const [error, setError] = useState({
        emri: '',
        mbiemri: '',
        email: '',
        password: ''
    });
    const [value, setValue] = useState({
        emri: '',
        mbiemri: '',
        email: '',
        password: ''

    })

    const setEmri = (e) => {
        setValue((current) => {

            return { ...current, emri: e.target.value }
        })
    }

    const setMbiemri = (e) => {
        setValue((current) => {

            return { ...current, mbiemri: e.target.value }
        })
    }

    const setEmail = (e) => {
        setValue((current) => {

            return { ...current, email: e.target.value }
        })
    }

    const setPassword = (e) => {
        setValue((current) => {

            return { ...current, password: e.target.value }
        })
    }

    const registerConfirm = () => {
        if (value.emri.length === 0) {
            setError((current) => {

                return { ...current, emri: 'Enter your name' }
            })
        }

        if (value.mbiemri.length === 0) {
            setError((current) => {

                return { ...current, mbiemri: 'Enter your surname' }
            })
        }

        if (value.email.length === 0) {
            setError((current) => {

                return { ...current, email: 'Enter your email' }
            })
        } else if (!value.emri.includes('@')) {

            setError((current) => {
                return { ...current, email: 'Invalid form of email' }
            })
        }

        if (value.password.length === 0) {
            setError((current) => {

                return { ...current, password: 'Enter your password' }
            })
        }
        const arrayError = Object.values(error)

        for (let i = 0; i < arrayError.length; i++) {
            if (arrayError[i] !== '') {
                return
            }
        }

    }


    return (
        <form className='box register-box'>
            <p className='improved-h2'>Register</p>
            <div className='prezantimi'>
                <label className='emri'>
                    <input type='text' ref={emri} id='emri' value={value.emri} onChange={setEmri} placeholder='name'></input>
                </label>
                {error.emri && <p className='wrongSignIn'>{error.emri}</p>}
                <label className='prezantimi mbiemri'>
                    <input ref={mbiemri} type='text' value={value.mbiemri} onChange={setMbiemri} placeholder='surname'></input>
                </label>
                {error.mbiemri && <p className='wrongSignIn'>{error.mbiemri}</p>}
            </div>
            <label htmlFor='email'>
                <input type='text' ref={email} id='email' onChange={setEmail} placeholder='Enter your email'></input>
            </label>
            {error.email && <p className='wrongSignIn'>{error.mbiemri}</p>}
            <label htmlFor='password'>
                <input type='password' ref={password} id='password' onChange={setPassword} placeholder='Enter your password'></input>
            </label >
            {error.password && <p className='wrongSignIn'>{error.password}</p>}
            <button type='btn' onClick={registerConfirm}>Register</button>
            <div className='register'>
                <p className='text' style={{
                    marginRight: 5,
                }}>Already have an account? </p>
                <button onClick={signIn} type='button'>Sign In</button>
            </div>
        </form>
    )
}