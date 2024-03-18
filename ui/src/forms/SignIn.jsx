/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';


export default function SignInForm() {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });
    const [backendError, setBackendError] = useState(false)


    const email = useRef(null);
    const password = useRef(null);

    const arrowUp = (ref) => {
        ref.focus()
    }



    const arrowDown = (ref) => {
        ref.focus()
    }

    useEffect(() => {
        const array = Object.values(error)

        // console.log(array)

        for (let key of array) {
            if (key !== 'Correct' && key !== '') {
                setBackendError(true)

                break;
            }
        }

        console.log(error)

    }, [error])

    useEffect(() => {
        const arrowHandler = (ref1, ref2) => (event) => {

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




        const emailRef = email.current;
        const passwordRef = password.current;


        emailRef.addEventListener('keydown', arrowHandler(passwordRef, passwordRef));
        passwordRef.addEventListener('keydown', arrowHandler(emailRef, emailRef));

        return () => {

            emailRef.removeEventListener('keydown', arrowHandler(passwordRef, passwordRef));
            passwordRef.removeEventListener('keydown', arrowHandler(emailRef, emailRef));
        };
    }, []);




    function signInEmail(text) {
        setSignIn((current) => {
            return { ...current, email: text }
        })
    }

    function signInPassword(text) {
        setSignIn((current) => {
            return { ...current, password: text }
        })
    }




    async function signInConfirm(e) {
        setError((current) => {
            return { ...current, email: '', password: '' }
        }
        )



        e.preventDefault()



        setError((current) => {
            if (signIn.email.length === 0) {
                return { ...current, email: 'Enter your email !' };
            } else if (!signIn.email.includes('@')) {
                return { ...current, email: 'Invalid form of email !' };
            } else {
                return { ...current, email: 'Correct' };
            }
        });

        setError((current) => {


            if (signIn.password.length === 0) {
                return { ...current, password: 'Enter your password !' };
            } else {
                return { ...current, password: 'Correct' };
            }

        });




        if (backendError) {

            console.log('hi')
            await axios
                .post('http://localhost:3000/log-in', {
                    email: signIn.email,
                    password: signIn.password
                })
                .then(res => {
                    console.log(res.response)
                    setBackendError(false)

                }).catch(err => {
                    if (err.response.data === 'wrong email' || err.response.data === 'wrong password') {
                        setBackendError(true)
                    }

                })

        }
    }


    return (
        <>
            <form id='sign-in'>
                <h2>Sign In</h2>
                <label htmlFor='email'>
                    <input
                        className={backendError === true ? 'wrong-prezantimi-register' :
                            error.email === 'Enter your email !' ? 'wrong-prezantimi-register' :
                                error.email === 'Invalid form of email !' ? 'wrong-prezantimi-register' :
                                    error.email === 'Correct' ? 'good-prezantimi-register' : 'prezantimi-register'}
                        type='text'
                        onChange={(e) => signInEmail(e.target.value)}
                        value={signIn.email}
                        id='email'
                        placeholder='Enter your email'
                        ref={email}
                    ></input>
                </label>
                <div className='error'>
                    {backendError === true ? (
                        null
                    ) : error.email === 'Enter your email !' ? (
                        <p className='wrong-sign-in'>{error.email}</p>
                    ) : error.email === 'Invalid form of email !' ? (
                        <p className='wrong-sign-in'>{error.email}</p>
                    ) : error.email === 'Correct' ? (
                        <p className='good-sign-in'>correct</p>
                    ) : null}
                </div>
                <label htmlFor='password'>
                    <input
                        className={backendError === true ? 'wrong-prezantimi-register' :
                            error.password === 'Enter your password !' ? 'wrong-prezantimi-register' :
                                error.password === 'Correct' ? 'good-prezantimi-register' : 'prezantimi-register'}
                        type='password'
                        onChange={(e) => signInPassword(e.target.value)}
                        value={signIn.password}
                        id='password'
                        placeholder='Enter your password'
                        ref={password}
                    ></input>
                </label >
                <div className='error'>
                    {backendError === true ? (
                        <p className='wrong-sign-in'>Wrong email or password</p>
                    ) : error.password === 'Enter your password !' ? (
                        <p className='wrong-sign-in'>{error.password}</p>
                    ) : error.password === 'Correct' ? (
                        <p className='good-sign-in'>correct</p>
                    ) : null}
                </div>
                <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
            </form >
        </>
    )
}