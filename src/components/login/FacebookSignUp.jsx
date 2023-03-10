import React from 'react';
import {auth} from "../../firebaseConfig";
import {FacebookAuthProvider,} from "firebase/auth";

function FacebookSignUp(props) {
    const provider = new FacebookAuthProvider();
    const facebookSignUp = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = FacebookAuthProvider.credentialFromError(error);
            });
    }
    return (
        <button onClick={() => facebookSignUp()}>
            Enter with Facebook
        </button>
    );
}

export default FacebookSignUp;