/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'


export default function SignInForm({ register }) {

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

    async function signInConfirm(e) {


        e.preventDefault()


        if (signIn.email.length === 0) {
            setError((current) => {

                return { ...current, email: 'Enter your email!' }
            })
        } else if (!signIn.email.includes('@')) {


            setError((current) => {
                return { ...current, email: 'Invalid form of email!' }
            })
        } else {
            setError((current) => {
                return { ...current, email: 'correct' }
            })

        }

        if (signIn.password.length === 0) {
            setError((current) => {

                return { ...current, password: 'Enter your password!' }
            })
        } else {
            setError((current) => {

                return { ...current, password: 'correct' }
            })
        }
        const array = Object.values(error)
        let hasErrors = false
        for (key of array) {
            if (key === true) {
                hasErrors = true
            }
        }
        if (hasErrors === false) {
        await axios
            .post('http://localhost:3000/log-in', {
                email: signIn.email,
                password: signIn.password
            })
            .then(res => {
                console.log(res.response)

            }).catch(err => {
                setError(err.response.data);
            })

        }
    }

   





    return (

        <form>
            <div className='box'>

                <p className='improved-h2'>Sign In</p>
                <label htmlFor='email'>
                    <input
                        className={error.email === 'Enter your email!' ? 'wrong-prezantimi-register' :
                            error.email === 'Invalid form of email!' ? 'wrong-prezantimi-register' :
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
                    {error.email === 'Enter your email!' && <p className='wrong-sign-in'>{error.email}</p>}
                    {error.email === 'Invalid form of email!' && <p className='wrong-sign-in'>{error.email}</p>}
                    {error.email === 'correct' && <p className='good-sign-in'>{error.email}</p>}
                </div>
                <label htmlFor='password'>
                    <input
                        className={error.password === 'Enter your password!' ? 'wrong-prezantimi-register' :
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
                    {error.password === 'Enter your password!' && <p className='wrong-sign-in'>{error.password}</p>}
                    {error.password === 'correct' && <p className='good-sign-in'>{error.password}</p>}
                </div>
                <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
                <div className='register'>
                    <p className='text' style={{
                        fontSize: 13,
                        marginRight: 5,

                    }}>Do not have an account? </p>
                    <button onClick={register} type='btn'>Register</button>
                </div>
            </div>
        </form>
    )
}

SignInForm.propTypes = {
    // home: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

// warning: in the working copy of 'package.json', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'ui/src/forms/Home.jsx', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'node_modules/.bin/loose-envify.cmd', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'node_modules/.package-lock.json', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'package-lock.json', CRLF will be replaced by LF the next time Git touches it 