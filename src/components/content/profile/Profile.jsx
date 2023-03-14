import React, {useState} from 'react';
import s from '../profile/profile.module.css'
import {profileAv} from "../../../utils/constants";
import {useFormik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faPencil, faFloppyDisk as save} from '@fortawesome/free-solid-svg-icons'

function Profile(props) {

    const [profile, setProfile] = useState(true)
    const [changeName, setChangeName] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: 'Anna Smith',
            email: 'fromDB',
            fb: '',
            photo: '',
            phone: ''
        },
        onSubmit(values) {
        },
        validate: (values) => {
            const errors = {};

            return errors;
        },
        validateOnBlur: false,
        validateOnChange: true,
    })

    return (
        <>
            <h3>Your profile. Change, edit and manage your data.</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.window}>
                    <div className={s.header}>
                        <button style={{backgroundColor: profile ? '#8DBFAC47' : '#8DBFACFF'}}
                                onClick={() => setProfile(true)}>My profile
                        </button>
                        <button style={{backgroundColor: !profile ? '#8DBFAC47' : '#8DBFACFF'}}
                                onClick={() => setProfile(false)}>Activities
                        </button>
                    </div>
                    <div className={s.main}>
                        <div className={s.mainInfo}>
                            <div className={s.avatar}>
                                <img src={profileAv} alt={'profile photo'}/>
                                <button className={s.camera}><FontAwesomeIcon icon={faCamera}/></button>
                            </div>
                            { changeName
                                ? <input
                                    id={'name'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={'My Name'}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className={s.name}
                                />
                                : <h3>Anna Smith</h3>
                            }
                            <button className={s.pencil} type={'submit'} onClick={()=>setChangeName(!changeName)}>
                                <FontAwesomeIcon icon={faPencil }/>
                            </button>
                        </div>
                        <div className={s.data}>
                            <p>
                                <label htmlFor={'email'}>Email:</label>
                                <input
                                    id={'email'}
                                    name={'email'}
                                    type={'text'}
                                    placeholder={'My Email in db'}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email &&
                                    <span className={s.error}> {formik.errors.email} </span>}
                            </p>
                            <p>
                                <label htmlFor={'phone'}>Phone:</label>
                                <input
                                    id={'phone'}
                                    name={'phone'}
                                    type="text"
                                    placeholder={'Phone*'}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone &&
                                    <span className={s.error}> {formik.errors.phone} </span>}
                            </p>
                            <p>
                                <label htmlFor={'fb'}>FBLink:</label>
                                <input
                                    id={'fb'}
                                    name={'fb'}
                                    type={'text'}
                                    placeholder={'My link'}
                                    onChange={formik.handleChange}
                                    value={formik.values.fb}
                                />
                                {formik.touched.fb && formik.errors.fb &&
                                    <span className={s.error}> {formik.errors.fb} </span>}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={s.btns}>
                    <button className={s.btnCancel}>Cancel</button>
                    <button className={s.btnSave} type={"submit"}>
                        <span className={s.saveIcon}><FontAwesomeIcon icon={save}/></span>
                        Save changes
                    </button>
                </div>
            </form>
        </>
    );
}

export default Profile;