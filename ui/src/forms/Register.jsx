/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react'
import axios from 'axios';


export default function Register(changePage) {

    const emri = useRef(null);
    const mbiemri = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [backendError, setBackendError] = useState()
    const [backendMessage, setBackendMessage] = useState()

    const [error, setError] = useState({ emri: "", mbiemri: "", email: "", password: "" })

    const [register, setRegister] = useState({
        emri: '',
        mbiemri: '',
        email: '',
        password: ''
    });

    const arrowUp = (ref) => {
        ref.focus()
    }

    const arrowDown = (ref) => {
        ref.focus()
    }

    useEffect(() => {
        // console.log('fesf',backendError)
        if (backendError) {
            // console.log('i got ')

            axios
                .post('http://localhost:3000/sign-up', {
                    name: register.emri,
                    surname: register.mbiemri,
                    email: register.email,
                    password: register.password
                })
                .then(res => {

                    // console.log('good')
                    setBackendError(false)
                    changePage('home')
                    console.log(res)
                })
                .catch(err => {

                    // console.log('bad')

                    if (err?.response?.data === 'email is already in use') {
                        setBackendMessage(err.response.data)

                    } else {
                        setBackendMessage('')
                    }
                })


        }
    }, [error,backendError])

    useEffect(() => {
        const array = Object.values(error)

        // console.log(array, 'halo')
        let hasErrors = false
        for (let key of array) {
            if (key !== 'correct') {
                console.log('oops')
                hasErrors = true
                setBackendError(false)

                break;
            }
        }
        if (!hasErrors) {
            
            setBackendError(true)
        }
         console.log('fesf',backendError,hasErrors)




    }, [error])

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
        setRegister((current) => {
            return { ...current, emri: e.target.value }
        })
    }

    const setMbiemri = (e) => {
        setRegister((current) => {
            return { ...current, mbiemri: e.target.value }
        })
    }

    const setEmail = (e) => {
        setRegister((current) => {
            return { ...current, email: e.target.value }
        })
    }

    const setPassword = (e) => {
        setRegister((current) => {
            return { ...current, password: e.target.value }
        })
    }

    const registerConfirm = async (e) => {
        e.preventDefault()

        e.preventDefault()
        let bufferEmri = ''
        let bufferMbiemri = ''
        let bufferEmail = ''
        let bufferPassword = ''
        setError((current) => {
            if (register.emri.length === 0) {


                bufferEmri = 'Enter your name!';

            } else {

                bufferEmri = 'correct';

            }

            if (register.mbiemri.length === 0) {


                bufferMbiemri = 'Enter your surname!';
            } else {

                bufferMbiemri = 'correct';

            }



            if (register.email.length === 0) {

                bufferEmail = 'Enter your email!';

            } else if (!register.email.includes('@')) {

                bufferEmail = 'Invalid form of email!';

            } else {

                bufferEmail = 'correct';

            }

            if (register.password.length === 0) {

                bufferPassword = 'Enter your password!';
            } else {

                bufferPassword = 'correct';

            }
            return { ...current, email: bufferEmail, emri: bufferEmri, mbiemri: bufferMbiemri, password: bufferPassword }
        })





    }


    return (
        <form id='register'>
            <h2>Register</h2>
            <div className='prezantimi'>
                <label htmlFor='emri'>
                    <input
                        className={backendError ? "wrong-prezantimi-register" :
                            error.emri === 'Enter your name!' ? "wrong-prezantimi-register" :
                                error.emri === 'correct' ? "good-prezantimi-register" : "prezantimi-register"}
                        type='text'
                        ref={emri}
                        id='emri'
                        value={register.emri}
                        onChange={setEmri}
                        placeholder='Enter your name'
                        autoComplete='off'></input>
                </label>
                <div className="error">
                    {backendError ? (
                        null
                    ) : error.emri === 'Enter your name!' ? (
                        <p className='wrong-sign-in'>{error.emri}</p>
                    ) : error.emri === 'correct' ? (
                        <p className='good-sign-in'>{error.emri}</p>
                    ) : null}
                </div>
                <label htmlFor="mbiemri">
                    <input
                        className={backendError ? "wrong-prezantimi-register" :
                            error.mbiemri === 'Enter your surname!' ? "wrong-prezantimi-register" :
                                error.mbiemri === 'correct' ? "good-prezantimi-register" : "prezantimi-register"}
                        ref={mbiemri}
                        type='text'
                        value={register.mbiemri}
                        onChange={setMbiemri}
                        placeholder='Enter your surname'
                        autoComplete='off'></input>
                </label>
                <div className="error">
                    {backendError ? (
                        null
                    ) : error.mbiemri === 'Enter your surname!' ? (
                        <p className='wrong-sign-in'>{error.mbiemri}</p>
                    ) : error.mbiemri === 'correct' ? (
                        <p className='good-sign-in'>{error.mbiemri}</p>
                    ) : null}
                </div>
                <label htmlFor='email'>
                    <input
                        className={backendError ? "wrong-prezantimi-register" :
                            error.email === "Enter your email!" ? "wrong-prezantimi-register" :
                                error.email === "Invalid form of email!" ? "wrong-prezantimi-register" :
                                    error.email === "correct" ? "good-prezantimi-register" : "prezantimi-register"}
                        type='text'
                        ref={email}
                        id='email'
                        value={register.email}
                        onChange={setEmail}
                        placeholder='Enter your email'
                    ></input>
                </label>
                <div className="error">
                    {backendError ? (null
                    ) : error.email === "Enter your email!" ? (<p className='wrong-sign-in'>{error.email}</p>
                    ) : error.email === "Invalid form of email!" ? (<p className='wrong-sign-in'>{error.email}</p>
                    ) : error.email === 'correct' ? (<p className='good-sign-in'>{error.email}</p>) : null}
                </div>
                <label htmlFor='password'>
                    <input
                        className={backendError ? "wrong-prezantimi-register" :
                            error.password === 'Enter your password!' ? "wrong-prezantimi-register" :
                                error.password === 'correct' ? "good-prezantimi-register" : "prezantimi-register"}
                        type='password'
                        ref={password}
                        id='password'
                        value={register.password}
                        onChange={setPassword}
                        placeholder='Enter your password'
                        autoComplete='off'
                    ></input>
                </label >
                <div className="error">
                    {backendError ? (<p className='wrong-sign-in'>{backendMessage?backendMessage:null}</p>
                    ) : error.password === 'Enter your password!' ? (<p className='wrong-sign-in'>{error.password}</p>
                    ) : error.password === 'correct' ? (<p className='good-sign-in'>{error.password}</p>
                    ) : null
                    }
                </div>
                <button className='absolute-btn' type='btn' onClick={registerConfirm}>Register</button>
            </div>
        </form>
    )
}