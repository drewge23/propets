import React, {useEffect, useState} from 'react';
import s from '../profile/profile.module.css'
import {USER_PICTURE_PLACEHOLDER} from "../../../utils/constants";
import {useFormik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faFloppyDisk as save, faPencil} from '@fortawesome/free-solid-svg-icons'
import {db} from "../../../firebaseConfig";
import {updateEmail, updateFacebook, updateName, updatePhone, updatePhoto} from "../../../BLL/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {nanoid} from "@reduxjs/toolkit";
import Activities from "./Activities";
import {useLocation} from "react-router";

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const PHONE_REGEXP = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

function Profile(props) {
    const location = useLocation()

    const [profile, setProfile] = useState(true)
    useEffect(() => {
        if (!location) return
        if (!location.state) return
        setProfile(!location.state.activities)
    }, [location])
    const [changeName, setChangeName] = useState(false)

    const user = useSelector(state => state.user)
    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch()

    const [photo, setPhoto] = useState(null)
    const storage = getStorage();
    const photoRef = ref(storage, `users/photo_${nanoid()}`);

    const uploadPhoto = () => {
        uploadBytes(photoRef, photo)
            .then((snapshot) => {
                getDownloadURL(photoRef)
                    .then((url) => {
                        db.collection('users').doc(userId).update({
                            photoUrl: url,
                        })
                            .then(() => dispatch(updatePhoto(url)))
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                // File doesn't exist
                                break;
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;
                            case 'storage/unknown':
                                // Unknown error occurred, inspect the server response
                                break;
                            default:
                                alert('Something went wrong')
                        }
                    });
            })
            .catch((e) => alert(e.message()))
    }

    const formik = useFormik({
        initialValues: {
            name: user?.displayName || '',
            email: user?.email || '',
            fb: user?.facebook || '',
            phone: user?.phone || '',
        },
        onSubmit(values) {
            db.collection('users').doc(userId).update({
                displayName: values.name,
                email: values.email,
                phone: values.phone,
                facebook: values.fb
            })
                .then(() => {
                    dispatch(updateName(values.name))
                    dispatch(updateEmail(values.email))
                    dispatch(updatePhone(values.phone))
                    dispatch(updateFacebook(values.fb))
                    alert('Profile updated!')
                })
                .catch((err) => {
                    console.log(err)
                    alert(err.message())
                })

            if (photo) uploadPhoto()
        },
        validate:
            (values) => {
                const errors = {};

                if (!values.name || values.name.trim() === '') {
                    errors.name = 'Required';
                }
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!EMAIL_REGEXP.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (values.phone && !PHONE_REGEXP.test(values.phone)) {
                    errors.phone = 'Invalid phone format';
                }

                return errors;
            },
        validateOnBlur: true,
        validateOnChange: false,
        validateOnMount: false,
    })

    return (
        <>
            <h3><b>Your profile.</b> Change, edit and manage your data.</h3>
            <form onSubmit={formik.handleSubmit} name={'profile'} id={'profile'}>
                <div className={s.window}>
                    <div className={s.header}>
                        <button style={{backgroundColor: profile ? '#8DBFAC47' : '#8DBFACFF'}} type={'button'}
                                onClick={() => setProfile(true)}>My profile
                        </button>
                        <button style={{backgroundColor: !profile ? '#8DBFAC47' : '#8DBFACFF'}} type={'button'}
                                onClick={() => setProfile(false)}>Activities
                        </button>
                    </div>
                    {profile && <div className={s.main}>
                        <div className={s.mainInfo}>
                            <div className={s.avatar}>
                                <img src={user?.photoUrl || USER_PICTURE_PLACEHOLDER} alt={'profile photo'}/>
                                <label htmlFor="photo" className={s.camera}>
                                    <FontAwesomeIcon icon={faCamera}/>
                                    <input
                                        id={'photo'}
                                        name={'photo'}
                                        type={'file'}
                                        onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                            formik.submitForm()
                                        }}
                                        style={{display: "none"}}
                                    />
                                </label>
                            </div>
                            {changeName
                                ? <input
                                    id={'name'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={'My Name'}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className={s.name}
                                />
                                : <h3>{user?.displayName || ''}</h3>
                            }
                            <button className={s.pencil} type={'button'} onClick={() => setChangeName(!changeName)}>
                                <FontAwesomeIcon icon={faPencil}/>
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
                    </div>}
                    {!profile && <Activities/>}
                </div>
                {profile && <div className={s.btns}>
                    <button className={s.btnCancel} type={'button'}>Cancel</button>
                    <button className={s.btnSave} type={"submit"} form={'profile'}>
                        <span className={s.saveIcon}><FontAwesomeIcon icon={save}/></span>
                        Save changes
                    </button>
                </div>}
            </form>
        </>
    );
}

export default Profile;