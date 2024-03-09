import React from 'react';

export default function SignInForm() {

    const [signIn, setSignIn] = useState({});
    const [register, setRegister] = useState({});



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

    function signInConfirm() {
        fetch('http://localhost:3000', {
            method: 'GET',
            header: { 'Content-type': 'application/json' },
        })
    }
    return (
        <div className='box'>
            <label htmlFor='email'>
                <input onChange={(e) => signInEmail(e.target.value)} type='text' id='email' placeholder='Enter your email'></input>
            </label>
            <label htmlFor='password'>
                <input onChange={(e) => signInPassword(e.target.value)} type='text' id='' placeholder='Enter your pasasword'></input>
            </label >
            <button onClick={signInConfirm}>Sign in</button>
            <div className='account'>
                <p className='text'>Do not have an account ?</p>
                <button>Register</button>
            </div>
        </div>
    )
}