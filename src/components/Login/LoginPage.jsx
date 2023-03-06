import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import s from './login.module.css'
import {Link} from "react-router-dom";

function LoginPage(props) {
    const [signUp, setSignUp] = useState(true)

    return (
        <div className={s.container}>
            <div className={s.window}>
                <div className={s.header}>
                    <img src="" alt="logo"/>
                    <Link to={'/landing'}><button> x </button></Link>
                    <h3>Welcome! Please sign in / sign up to continue or</h3>
                    <button>Enter with Facebook</button>
                    <div className={s.signBtns}>
                        <button onClick={() => setSignUp(true)}>Sign up</button>
                        <button onClick={() => setSignUp(false)}>Sign in</button>
                    </div>
                </div>
                <div className={s.formContainer}>
                    {signUp && <SignUpForm/>}
                    {!signUp && <SignInForm/>}
                </div>
                <div className={s.footer}>
                    <p>By clicking “Submit”, you agree to us processing your information in accordance with these
                        terms.</p>
                    <Link to={'/landing'}><button>Cansel</button></Link>
                    <button type={'submit'} form={signUp ? 'signUp' : 'signIn'}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;