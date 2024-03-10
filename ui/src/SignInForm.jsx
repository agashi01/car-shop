import React, { useState } from 'react';
import axios from 'axios';


export default function SignInForm() {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [register, setRegister] = useState({});
    const [isCorrect, setIsCorrect] = useState('');



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

    function signInConfirm(e) {
        e.preventDefault()
        if (!signIn.email.includes('@')) {
            setIsCorrect("invalid form of email!")
            console.log('sfs')
            return
        }
        if (!signIn.password.length < 8) {
            setIsCorrect("write something")
            return
        }
        axios
            .post('http://localhost:3000/log-in', {

                email: signIn.email,
                password: signIn.password

            })
            .then(res => {
                console.log(res.response)

            }).catch(err => {
                if (err.response.data === 'wrong email') {
                    setIsCorrect("wrong email")
                } else if (err.response.data === 'wrong password') {
                    setIsCorrect('wrong password')
                } else {
                    setIsCorrect('')
                }

            })
    }
    return (
        <div className='box'>
            <label htmlFor='email'>
                <input type='text' onChange={(e) => signInEmail(e.target.value)} value={signIn.email} id='email' placeholder='Enter your email'></input>
            </label>
            <p className='wrongSignIn'>{isCorrect === 'invalid form of email!' && isCorrect}||{isCorrect === 'wrong email' && "The email address you entered isn't connected to an account."}</p>
            <label htmlFor='password'>
                <input type='password' onChange={(e) => signInPassword(e.target.value)} value={signIn.password} id='' placeholder='Enter your password'></input>
            </label >
            <p className='wrongSignIn'>{(signIn.password === "write something" && signIn.password) || (isCorrect === 'wrong password' && "The password you entered is wrong.")}</p>
            <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
            <div className='account'>
                <p className='text'>Do not have an account ?</p>
                <button type='button'>Register</button>
            </div>
        </div>
    )
}