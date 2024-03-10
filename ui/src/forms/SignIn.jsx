import React, { useState } from 'react';
import axios from 'axios';


export default function SignInForm() {

    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

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

                <h2>Sign In</h2>
                <label htmlFor='email'>
                    <input type='text' onChange={(e) => signInEmail(e.target.value)} value={signIn.email} id='email' placeholder='Enter your email'></input>
                </label>
                <label htmlFor='password'>
                    <input type='password' onChange={(e) => signInPassword(e.target.value)} value={signIn.password} id='' placeholder='Enter your password'></input>
                </label >
                {error && <p className='wrongSignIn'>{error}</p>}
                <button type='btn' onClick={e => signInConfirm(e)}>Sign in</button>
                <div className='register'>
                    <p className='text' style={{
                        marginRight: 5,
                    }}>Do not have an account? </p>
                    <button type='button'>Register</button>
                </div>
            </div>
        </form>
    )
}