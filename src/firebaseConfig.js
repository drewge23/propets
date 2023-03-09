import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDBIc0O0scUcMykXXY3LBfl_l_orNumMJk",
    authDomain: "propets-app.firebaseapp.com",
    projectId: "propets-app",
    storageBucket: "propets-app.appspot.com",
    messagingSenderId: "408052009692",
    appId: "1:408052009692:web:9e2b9b1bc59b82df408219"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app)
export const db = firebase.firestore(app)