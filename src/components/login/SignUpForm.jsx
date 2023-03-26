import {useFormik} from "formik";
import React from "react";
import s from './login.module.css'
import {auth, db} from "../../firebaseConfig";
import {setUser} from "../../BLL/userSlice";
import {useDispatch} from "react-redux";

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,}$/

function SignUpForm(props) {
    const dispatch = useDispatch()

    const formik = useFormik({
                initialValues: {
                    name: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                },
                onSubmit: (values) => {
                    auth.createUserWithEmailAndPassword(values.email, values.password)
                        .then((userCredential) => {
                            auth.currentUser.updateProfile({
                                displayName: values.name,
                            })
                            db.collection('users').doc(userCredential.user.uid).set({
                                displayName: values.name,
                                photoUrl: userCredential.user.photoURL,
                                userId: userCredential.user.uid,
                                email: userCredential.user.email,
                                facebook: null,
                                phone: null,
                            })
                                .then(response => {
                                    db.collection('users').doc(response.id).get()
                                        .then(response => {
                                            dispatch(setUser({...response.data()}))
                                        })
                                })
                        })
                        .catch((error) => {
                            console.log(error.code);
                            console.log(error.message);
                        });
                },
                validate: (values) => {
                    const errors = {};

                    if (!values.name || values.name.trim() === '') {
                        errors.name = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!EMAIL_REGEXP.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (!PASSWORD_REGEXP.test(values.password)) {
                        errors.password = 'Invalid password';
                    }
                    if (values.repeat_password !== values.password) {
                        errors.repeat_password = 'Passwords do not match';
                    }

                    return errors;
                },
                validateOnBlur: false,
                validateOnChange: false,
            }
        )
    ;

    return (
        <form onSubmit={formik.handleSubmit} className={s.form} id={'signUp'}>
            <div className={s.formFields}>

                <div>
                    {formik.touched.name && formik.errors.name &&
                        <span className={s.error}> {formik.errors.name} </span>}
                    <label htmlFor={'name'}> Name: </label>
                    <input
                        id={'name'}
                        name={'name'}
                        type="text"
                        placeholder={'John Doe'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>

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

                <div>
                    {formik.touched.repeat_password && formik.errors.repeat_password &&
                        <span className={s.error}> {formik.errors.repeat_password} </span>}
                    <label htmlFor={'repeat_password'}> Password: </label>
                    <input
                        id={'repeat_password'}
                        name={'repeat_password'}
                        type="password"
                        placeholder={'********'}
                        onChange={formik.handleChange}
                        value={formik.values.repeat_password}
                    />
                </div>
            </div>

            <div className={s.formNotes}>
                <div></div>
                <div></div>
                <div>Password must have at least 8 characters with at least one Capital letter, at least one lower case
                    letter and at least one number or special character.
                </div>
                <div>Please re-enter the password</div>
            </div>
        </form>
    )
}

export default SignUpForm