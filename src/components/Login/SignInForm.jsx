import {useFormik} from "formik";
import React from "react";

function SignInForm(props) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            <div> Forgot your password? </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default SignInForm