import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function LoginPage(props) {
    const [signUp, setSignUp] = useState(true)

    return (
        <div>
            <button onClick={() => setSignUp(true)}>Sign up</button>
            <button onClick={() => setSignUp(false)}>Sign in</button>
            {signUp && <SignUpForm />}
            {!signUp && <SignInForm />}
        </div>
    )
}

export default LoginPage;