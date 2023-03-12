import React from 'react';
import s from "./content/lostFoundForm/lostFoundForm.module.css";

function Textarea({formik, label, placeholder, upTo = null}) {
    const labelStr = label.split('_').join(' ')
    return (
        <div className={s.input}>
            {formik.touched[label] && formik.errors[label] && <span className={s.error}> {formik.errors[label]} </span>}
            <label htmlFor={label}>
                {labelStr[0].toUpperCase() + labelStr.substring(1)}
                {upTo && <p className={s.upTo}>up to {upTo} char</p>}
            </label>
            <textarea
                maxLength={upTo}
                id={label}
                name={label}
                placeholder={placeholder}
                onChange={formik.handleChange}
                value={formik.values[label]}
                style={{height: upTo + 'px', maxHeight: '120px'}}
            />
        </div>
    );
}

export default Textarea;