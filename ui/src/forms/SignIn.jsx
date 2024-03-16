/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function SignInForm() {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });


    const email = useRef(null);
    const password = useRef(null);

    const arrowUp = (ref) => {
        ref.focus()
    }



    const arrowDown = (ref) => {
        ref.focus()
    }

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
    }, [arrowDown, arrowUp]);




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

    function resetErrors() {
        setError({ email: 'correct', password: 'correct' })
    }
    async function signInConfirm(e) {
        resetErrors();

        console.log(signIn)
        e.preventDefault()


        if (signIn.email.length === 0) {
            setError((current) => {

                return { ...current, email: 'Enter your email !' }
            })
        } else if (!signIn.email.includes('@')) {

            setError((current) => {
                return { ...current, email: 'Invalid form of email !' }
            })
        } else {

            setError((current) => {
                console.log('email correct')
                return { ...current, email: 'correct' }
            })

        }

        if (signIn.password.length === 0) {
            setError((current) => {

                return { ...current, password: 'Enter your password !' }
            })
        } else {
            setError((current) => {

                return { ...current, password: 'correct' }
            })
        }
        const array = Object.values(error)

        let hasErrors = false
        console.log(array)
        for (let key of array) {
            if (key !== 'correct') {
                hasErrors = true
                break;
            }
        }

        if (!hasErrors) {
            await axios
                .post('http://localhost:3000/log-in', {
                    email: signIn.email,
                    password: signIn.password
                })
                .then(res => {
                    console.log(res.response)

                }).catch(err => {
                    if (err.response.data === 'wrong email' || err.response.data === 'wrong password') {
                        setError({ password: 'wrong', email: 'wrong' })
                    }

                })

        }
    }







    return (

        <form id='sign-in'>
            <h2>Sign In</h2>
            <label htmlFor='email'>
                <input
                    className={error.email === 'Enter your email !' ? 'wrong-prezantimi-register' :
                        error.email === 'wrong' ? 'wrong-prezantimi-register' :
                            error.email === 'Invalid form of email !' ? 'wrong-prezantimi-register' :
                                error.email === 'correct' ? 'good-prezantimi-register' : 'prezantimi-register'}
                    type='text'
                    onChange={(e) => signInEmail(e.target.value)}
                    value={signIn.email}
                    id='email'
                    placeholder='Enter your email'
                    ref={email}
                ></input>
            </label>
            <div className='error'>
                {error.email === 'Enter your email !' && <p className='wrong-sign-in'>{error.email}</p>}
                {error.email === 'Invalid form of email !' && <p className='wrong-sign-in'>{error.email}</p>}
                {error.email === 'correct' && <p className='good-sign-in'>{error.email}</p>}
            </div>
            <label htmlFor='password'>
                <input
                    className={error.password === 'Enter your password !' ? 'wrong-prezantimi-register' :
                        error.password === "wrong" ? 'wrong-prezantimi-register' :
                            error.password === 'correct' ? 'good-prezantimi-register' : 'prezantimi-register'}
                    type='password'
                    onChange={(e) => signInPassword(e.target.value)}
                    value={signIn.password}
                    id='password'
                    placeholder='Enter your password'
                    ref={password}
                ></input>
            </label >
            <div className='error'>
                {(error.password === 'wrong' || error.email === 'wrong') && <p className='wrong-sign-in'>Wrong email or password !</p>}
                {error.password === 'Enter your password !' && <p className='wrong-sign-in'>{error.password}</p>}
                {error.password === 'correct' && <p className='good-sign-in'>{error.password}</p>}
            </div>
            <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
        </form >
    )
}
