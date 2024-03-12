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

            if (event.key.startsWith("Arrow")) {
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
        } else {
            setError((current) => {

                return { ...current, emri: 'good' }
            })
        }

        if (value.mbiemri.length === 0) {
            setError((current) => {

                return { ...current, mbiemri: 'Enter your surname' }
            })
        } else {
            setError((current) => {

                return { ...current, mbiemri: 'good' }
            })
        }

        if (value.email.length === 0) {
            setError((current) => {

                return { ...current, email: 'Enter your email' }
            })
        } else if (!value.email.includes('@')) {

            setError((current) => {
                return { ...current, email: 'Invalid form of email' }
            })
        } else {
            setError((current) => {
                return { ...current, email: 'good' }
            })

        }

        if (value.password.length === 0) {
            setError((current) => {

                return { ...current, password: 'Enter your password' }
            })
        } else {
            setError((current) => {

                return { ...current, password: 'good' }
            })
        }



    }

    





    return (
        <form className='box register-box'>
            <p className='improved-h2'>Register</p>
            <div className='prezantimi'>
                <label htmlFor="emri"
                    <input
                        type='text'
                        ref={emri}
                        id='emri'
                        value={value.emri}
                        onChange={setEmri}
                        placeholder='Enter your name'
                        autoComplete='off'></input>
                </label>
                <div className="error">
                    {error.emri && <p className='wrongSignIn'>{error.emri}</p>}
                </div>
                <label htmlFor="mbiemri"
                    <input
                        ref={mbiemri}
                        type='text'
                        value={value.mbiemri}
                        onChange={setMbiemri}
                        placeholder='Enter your surname'
                        autoComplete='off'></input>
                </label>
                <div className="error">
                    {error.mbiemri && <p className='wrongSignIn'>{error.mbiemri}</p>}
                </div>

                    htmlFor='email'>
                    <input
                        type='text'
                        ref={email}
                        id='email'
                        onChange={setEmail}
                        placeholder='Enter your email'
                    ></input>
                </label>
                <div className="error">
                    {error.email && <p className='wrongSignIn'>{error.email}</p>}
                </div>
                 htmlFor='password'>
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

