/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'


export default function SignInForm({ register }) {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [error, setError] = useState({
       
        email: '',
        password: ''
    });

   
 

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


        e.preventDefault()
      

        if (signIn.email.length === 0) {
            setError((current) => {

                return { ...current, email: 'Enter your email!' }
            })
        } else if (!signIn.email.includes('@')) {


            setError((current) => {
                return { ...current, email: 'Invalid form of email' }
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

    const hasAnyError = (input) => {


        if (input !== "correct" && input.length > 0) {
            if(input===error.email&& !input.includes('@')){
                return 'meh'
            }
            console.log('babi')
            return "bad"
        } else if (input === "correct") {
            return 'correct'
        } else {
            return 'normal'
        }
    }

    const hasAnyErrorEmail = () => {
        if (error.email === "Enter your email") {


            return "Enter your email!"
        } else if (error.email === "Invalid form of email") {

            return "invalid form of email"
        } else if (error.email.length > 0) {

            return "correct"
        } else {

            return ""

        }
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
    register: PropTypes.func.isRequired
}

// warning: in the working copy of 'package.json', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'ui/src/forms/Home.jsx', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'node_modules/.bin/loose-envify.cmd', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'node_modules/.package-lock.json', CRLF will be replaced by LF the next time Git touches it
// warning: in the working copy of 'package-lock.json', CRLF will be replaced by LF the next time Git touches it 