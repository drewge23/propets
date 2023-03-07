import React from 'react';
import s from "./lostFound.module.css";

function Input({formik, label, type = 'text', placeholder}) {
    return (
        <div className={s.input}>
            {formik.touched[label] && formik.errors[label] && <span className={s.error}> {formik.errors[label]} </span>}
            <label htmlFor={label}> {label[0].toUpperCase() + label.substring(1)} </label>
            <input
                id={label}
                name={label}
                type="text"
                placeholder={placeholder}
                onChange={formik.handleChange}
                value={formik.values[label]}
            />
        </div>
    );
}

export default Input;