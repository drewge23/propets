import React from 'react';
import s from "./content/lostFound/lostFound.module.css";

function Select({formik, label, options = [], placeholder}) {
    return (
        <div className={s.input}>
            {formik.touched[label] && formik.errors[label] && <span className={s.error}> {formik.errors[label]} </span>}
            <label htmlFor={label}> {label[0].toUpperCase() + label.substring(1)} </label>
            <select
                id={label}
                name={label}
                onChange={formik.handleChange}
                value={formik.values[label]}
            >
                {options.map(option => (
                    <option value={option} key={option}>
                        {option[0].toUpperCase() + option.substring(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;