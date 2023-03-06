import {useFormik} from "formik";
import React from "react";

function SignUpForm(props) {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeat_password: '',
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
        },
        validate: (values) => {
            const errors = {};

            return errors;
        },
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor={'name'}> Name: </label>
            <input
                id={'name'}
                name={'name'}
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && <div> {formik.errors.name} </div>}

            <label htmlFor={'email'}> Email: </label>
            <input
                id={'email'}
                name={'email'}
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div> {formik.errors.email} </div>}

            <label htmlFor={'password'}> Password: </label>
            <input
                id={'password'}
                name={'password'}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <div> {formik.errors.password} </div>}
            <div>Password has to be at least 8 characters long</div>

            <label htmlFor={'repeat_password'}> Repeat the password: </label>
            <input
                id={'repeat_password'}
                name={'repeat_password'}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.repeat_password}
            />
            {formik.touched.repeat_password && formik.errors.repeat_password &&
                <div> {formik.errors.repeat_password} </div>}
            <div>Please re-enter the password</div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default SignUpForm