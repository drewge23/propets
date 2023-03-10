import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import s from './login.module.css'
import {Link, Navigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseConfig";

import logo from './../../images/proPetsGreen.png'
import FacebookSignUp from "./FacebookSignUp";

function LoginPage(props) {
    const [signUp, setSignUp] = useState(true)
    const [user] = useAuthState(auth)

    return (
        <>
            {!user && <div className={s.container}>
                <div className={s.window}>
                    <div className={s.header}>
                        <div className={s.logo}>
                            <img src={logo} alt="logo"/>
                            <Link to={'/landing'}> ❌ </Link>
                        </div>
                        <div className={s.welcome}>
                            <p><b>Welcome!</b> Please sign in / sign up to continue or</p>
                            <FacebookSignUp />
                        </div>
                        <div className={s.signBtns}>
                            <button style={{backgroundColor: signUp ? '#8DBFAC47' : '#8DBFACFF'}}
                                    onClick={() => setSignUp(true)}>Sign up
                            </button>
                            <button style={{backgroundColor: !signUp ? '#8DBFAC47' : '#8DBFACFF'}}
                                    onClick={() => setSignUp(false)}>Sign in
                            </button>
                        </div>
                    </div>
                    <div className={s.formContainer}>
                        {signUp && <SignUpForm/>}
                        {!signUp && <SignInForm/>}
                    </div>
                    <div className={s.footer}>
                        <p>By clicking “Submit”, you agree to us processing your information in accordance with these
                            terms.</p>
                        <div>
                            <Link to={'/landing'}>
                                <button className={s.cansel}>Cansel</button>
                            </Link>
                            <button type={'submit'} form={signUp ? 'signUp' : 'signIn'}
                                    className={s.submit}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
            {user && <Navigate to={'/content'}/>}
        </>
    )
}

export default LoginPage;
