import {useFormik} from "formik";
import React from "react";
import s from './login.module.css'
import {auth, db} from "../../firebaseConfig";
import {setUser} from "../../BLL/userSlice";
import {useDispatch} from "react-redux";

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

function SignInForm(props) {
    const dispatch = useDispatch()

    const formik = useFormik({
                initialValues: {
                    email: '',
                    password: '',
                },
                onSubmit: (values, {resetForm}) => {
                    auth.signInWithEmailAndPassword(values.email, values.password)
                        .then((userCredential) => {
                            db.collection('users').doc(userCredential.user.uid).get()
                                .then(response => {
                                    dispatch(setUser({...response.data()}))
                                })
                        })
                        .catch((error) => {
                            console.log(error.code);
                            console.log(error.message);
                        });
                },
                validate: (values) => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!EMAIL_REGEXP.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                },
                validateOnBlur: false,
                validateOnChange: false,
            }
        )
    ;

    return (
        <form onSubmit={formik.handleSubmit} className={s.form} id={'signIn'}>
            <div className={s.formFields}>
                <div>
                    {formik.touched.email && formik.errors.email &&
                        <span className={s.error}> {formik.errors.email} </span>}
                    <label htmlFor={'email'}> Email: </label>
                    <input
                        id={'email'}
                        name={'email'}
                        type="text"
                        placeholder={'johndoe@gmail.com'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>

                <div>
                    {formik.touched.password && formik.errors.password &&
                        <span className={s.error}> {formik.errors.password} </span>}
                    <label htmlFor={'password'}> Password: </label>
                    <input
                        id={'password'}
                        name={'password'}
                        type="password"
                        placeholder={'********'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>

                <div className={s.forgot}>
                    Forgot your password?
                </div>
            </div>

            <div className={s.formNotes}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </form>
    )
}

export default SignInForm