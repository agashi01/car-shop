/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react'
import PropTypes from 'prop-types';

Register.propTypes = {
    signIn: PropTypes.func.isRequired,
    home: PropTypes.func.isRequired,

};

export default function Register({ signIn }) {

    // const [register, setRegister] = useState({})

    const emri = useRef(null);
    const mbiemri = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [ HasAnyError ,setHasAnyError]=useState(false)

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




    const arrowUp = (ref) => {


        ref.focus()

    }



    const arrowDown = (ref) => {


        ref.focus()

    }



    useEffect(() => {
        const arrowHandler = (ref1, ref2) => (event) => {

            if(event.key.startsWith("Arrow")){
                event.preventDefault()
            }

            switch (event.key) {



                case "ArrowUp":

                    arrowUp(ref1)
                    break;

                case "ArrowDown":

                    arrowDown(ref2)
                    break;

                default:
                    break;
            }
        }



        const emriRef = emri.current;
        const mbiemriRef = mbiemri.current;
        const emailRef = email.current;
        const passwordRef = password.current;

        emriRef.addEventListener('keydown', arrowHandler(passwordRef, mbiemriRef));
        mbiemriRef.addEventListener('keydown', arrowHandler(emriRef, emailRef));
        emailRef.addEventListener('keydown', arrowHandler(mbiemriRef, passwordRef));
        passwordRef.addEventListener('keydown', arrowHandler(emailRef, emriRef));

        return () => {
            emriRef.removeEventListener('keydown', arrowHandler(passwordRef, mbiemriRef));
            mbiemriRef.removeEventListener('keydown', arrowHandler(emriRef, emailRef));
            emailRef.removeEventListener('keydown', arrowHandler(mbiemriRef, passwordRef));
            passwordRef.removeEventListener('keydown', arrowHandler(emailRef, emriRef));
        };
    }, [arrowDown, arrowUp]);




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

    const registerConfirm = (e) => {
        e.preventDefault()
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


   
        const errorArr=Object.keys(error)

        for(let i=0;i<errorArr.length;i++){
            if(error[errorArr[i]]!==""){
                
                setHasAnyError(true)
            }
            
        }
    




    return (
        <form className='box register-box'>
            <p className='improved-h2'>Register</p>
            <div className='prezantimi'>
                <label htmlFor="emri"className={hasAnyError ?"wrong-prezantimi-register":"prezantimi-register"}>
                    <input
                        type='text'
                        ref={emri}
                        id='emri'
                        value={value.emri}
                        onChange={setEmri}
                        placeholder='name'
                        autoComplete='off'></input>
                </label>
                {error.emri && <p className='wrongSignIn'>{error.emri}</p>}
                <label htmlFor="mbiemri"className={hasAnyError ?"wrong-prezantimi-register":"prezantimi-register"}>
                    <input
                        ref={mbiemri}
                        type='text'
                        value={value.mbiemri}
                        onChange={setMbiemri}
                        placeholder='surname'
                        autoComplete='off'></input>
                </label>
                {error.mbiemri && <p className='wrongSignIn'>{error.mbiemri}</p>}
            
            <label className={hasAnyError?"wrong-prezantimi-register":"prezantimi-register"} htmlFor='email'>
                <input
                    type='text'
                    ref={email}
                    id='email'
                    onChange={setEmail}
                    placeholder='Enter your email'
                    ></input>
            </label>
            {error.email && <p className='wrongSignIn'>{error.email}</p>}
            <label className={hasAnyError ?"wrong-prezantimi-register":"prezantimi-register"} htmlFor='password'>
                <input
                    type='password'
                    ref={password}
                    id='password'
                    onChange={setPassword}
                    placeholder='Enter your password'
                    autoComplete='off'
                ></input>
            </label >
            {error.password && <p className='wrongSignIn'>{error.password}</p>}
            <button type='btn' onClick={registerConfirm}>Register</button>
            </div>
            <div className='register'>
                <p className='text' style={{
                    marginRight: 5,
                }}>Already have an account? </p>
                <button
                    onClick={signIn}
                    type='button'>Sign In</button>
            </div>
        </form>
    )
}

