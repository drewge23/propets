import {useFormik} from "formik";
import React from "react";
import s from './login.module.css'

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,}$/

function SignUpForm(props) {
    const formik = useFormik({
                initialValues: {
                    name: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                },
                onSubmit: (values, {resetForm}) => {
                    //Firebase auth goes here
                    console.log(values)
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
                    <label htmlFor={'name'}> Name: </label>
                    <input
                        id={'name'}
                        name={'name'}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && <span> {formik.errors.name} </span>}
                </div>

                <div>
                    <label htmlFor={'email'}> Email: </label>
                    <input
                        id={'email'}
                        name={'email'}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && <span> {formik.errors.email} </span>}
                </div>

                <div>
                    <label htmlFor={'password'}> Password: </label>
                    <input
                        id={'password'}
                        name={'password'}
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <span> {formik.errors.password} </span>}
                </div>

                <div>
                    <label htmlFor={'repeat_password'}> Password: </label>
                    <input
                        id={'repeat_password'}
                        name={'repeat_password'}
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.repeat_password}
                    />
                    {formik.touched.repeat_password && formik.errors.repeat_password &&
                        <span> {formik.errors.repeat_password} </span>}
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