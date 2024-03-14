/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

Register.propTypes = {
    signIn: PropTypes.func.isRequired,
    home: PropTypes.func.isRequired,
};

export default function Register({ signIn }) {

    const emri = useRef(null);
    const mbiemri = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [isError, setIsError] = useState({
        emri: false,
        mbiemri: false,
        email: false,
        password: false

    })

    const [error, setError] = useState({
        emri: false,
        mbiemri: false,
        email: false,
        password: false

    })

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

    const registerConfirm = (e) => {
        e.preventDefault()
        if (register.emri.length === 0) {
            setIsError((current) => {
                return { ...current, emri: true }
            })
            setError((current) => {

                return { ...current, emri: 'Enter your name!' }
            })
        } else {
            setIsError((current) => {
                return { ...current, emri: false }
            })
            setError((current) => {

                return { ...current, emri: 'correct' }
            })
        }
        if (register.mbiemri.length === 0) {
            setIsError((current) => {
                return { ...current, mbiemri: true }
            })
            setError((current) => {

                return { ...current, mbiemri: 'Enter your surname!' }
            })
        } else {
            setIsError((current) => {
                return { ...current, mbiemri: false }
            })
            setError((current) => {

                return { ...current, mbiemri: 'correct' }
            })
        }
        if (register.email.length === 0) {
            setIsError((current) => {
                return { ...current, email: true }
            })
            setError((current) => {

                return { ...current, email: 'Enter your email!' }
            })
        } else if (!register.email.includes('@')) {
            setIsError((current) => {
                return { ...current, email: true }
            })
            setError((current) => {
                return { ...current, email: 'Invalid form of email!' }
            })
        } else {
            setIsError((current) => {
                return { ...current, email: false }
            })
            setError((current) => {
                return { ...current, email: 'correct' }
            })

        }

        if (register.password.length === 0) {
            setIsError((current) => {
                return { ...current, password: true }
            })
            setError((current) => {

                return { ...current, password: 'Enter your password!' }
            })
        } else {
            setIsError((current) => {
                return { ...current, password: false }
            })
            setError((current) => {

                return { ...current, password: 'correct' }
            })
            const array = Object.values(isError)
            let hasErrors = false
            for (key of array) {
                if (key === true) {
                    hasErrors = true
                }
            }
            if (hasErrors === false) {
                axios
                    .post('http://localhost:3000/sign-up', {
                        name: register.emri,
                        surname: register.mbiemri,
                        email: register.email,
                        password: register.password
                    })
                    .then(res => {
                        console.log(res)
                    })
            }

        }





    }











    return (
        <form className='box register-box'>
            <p className='improved-h2'>Register</p>
            <div className='prezantimi'>
                <label htmlFor='emri'>

                    <input
                        className={error.emri === 'Enter your name!' ? "wrong-prezantimi-register" :
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
                    {error.emri === 'Enter your name!' && <p className='wrong-sign-in'>{error.emri}</p>}
                    {error.emri === 'correct' && <p className='good-sign-in'>{error.emri}</p>}
                </div>
                <label htmlFor="mbiemri"
                >
                    <input
                        className={error.mbiemri === 'Enter your surname!' ? "wrong-prezantimi-register" :
                            error.mbiemri === 'correct' ? "good-prezantimi-register" : "prezantimi-register"}
                        ref={mbiemri}
                        type='text'
                        value={register.mbiemri}
                        onChange={setMbiemri}
                        placeholder='Enter your surname'
                        autoComplete='off'></input>
                </label>
                <div className="error">
                    {error.mbiemri === 'Enter your surname!' && <p className='wrong-sign-in'>{error.mbiemri}</p>}
                    {error.mbiemri === 'correct' && <p className='good-sign-in'>{error.mbiemri}</p>}
                </div>

                <label
                    htmlFor='email'>
                    <input
                        className={error.email === "Enter your email!" ? "wrong-prezantimi-register" :
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
                    {error.email === "Enter your email!" && <p className='wrong-sign-in'>{error.email}</p>}
                    {error.email === "Invalid form of email!" && <p className='wrong-sign-in'>{error.email}</p>}
                    {error.email === 'correct' && <p className='good-sign-in'>{error.email}</p>}
                </div>
                <label
                    htmlFor='password'>
                    <input
                        className={error.password === 'Enter your password!' ? "wrong-prezantimi-register" :
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
                {error.password === 'Enter your password!' && <p className='wrong-sign-in'>{error.password}</p>}
                {error.password === 'correct' && <p className='good-sign-in'>{error.password}</p>}
                <button type='btn' onClick={registerConfirm}>Register</button>
            </div>
            <div className='register'>
                <p className='text' style={{
                    fontSize: 13,
                    marginRight: 5,
                }}>Already have an account? </p>
                <button
                    onClick={signIn}
                    type='button'>Sign In</button>
            </div>
        </form>
    )
}