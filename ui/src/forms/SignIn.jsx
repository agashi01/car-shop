/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'


export default function SignInForm({ register }) {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

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
            setError("Email is empty")
            return;
        } else if (!signIn.email.includes('@')) {
            setError("Email is invalid");
            return;
        }

        if (signIn.password.length === 0) {
            setError("Password is empty")
            return
        }

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

    return (

        <form>
            <div className='box'>

                <p className='improved-h2'>Sign In</p>
                <label htmlFor='email'>
                    <input 
                    type='text' 
                    onChange={(e) => signInEmail(e.target.value)} 
                    value={signIn.email} 
                    id='email' 
                    placeholder='Enter your email'
                    ref={email}
                    ></input>
                </label>
                <label htmlFor='password'>
                    <input 
                    type='password' 
                    onChange={(e) => signInPassword(e.target.value)} 
                    value={signIn.password} 
                    id='password' 
                    placeholder='Enter your password'
                    ref={password}
                    ></input>
                </label >
                {error && <p className='wrongSignIn'>{error}</p>}
                <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
                <div className='register'>
                    <p className='text' style={{
                        marginRight: 5,
                    }}>Do not have an account? </p>
                    <button onClick={register} type='btn'>Register</button>
                </div>
            </div>
        </form>
    )
}

SignInForm.propTypes = {
    home: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};