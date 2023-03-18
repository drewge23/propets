import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {useFormik} from "formik";
import s from './lostFoundForm.module.css'
import Input from "../../../Input";
import Select from "../../../Select";
import Textarea from "../../../Textarea";
import DragDrop from "../../../../utils/DragDrop";
import LostFoundFormDnD from "./LostFoundFormDnD";

import LOST_FOUND from '../../../../images/lostFound.png'
import {db} from "../../../../firebaseConfig";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {nanoid} from "@reduxjs/toolkit";

function LostFoundForm() {
    const location = useLocation()
    // const [files, setFiles] = useState()
    // const [filesArray, setFilesArray] = useState([])
    // useEffect(() => {
    //     if (!files) return
    //     let temp = []
    //     for (let file of files) {
    //         temp.push(file)
    //     }
    //     setFilesArray([...filesArray, ...temp])
    // }, [files])
    // const spliceArray = (index) => {
    //     let temp = [...filesArray]
    //     temp.splice(index, 1)
    //     setFilesArray(temp)
    // }

    const [image, setImage] = useState(null)
    const storage = getStorage()
    const lostFoundImageRef = ref(storage, `lost_and_found/image_${nanoid()}`);

    const formik = useFormik({
            initialValues: {
                breed: "",
                color: "",
                description: "",
                distinctive_features: "",
                email: "",
                facebook: "",
                height: "",
                location: "",
                phone: "",
                sex: "",
            },
            onSubmit: (values) => {
                uploadBytes(lostFoundImageRef, image)
                    .then((snapshot) => {
                        db.collection('lost_and_found').add({
                            ...values,
                            status: location.state.isLost ? 'lost' : 'found',
                            image: snapshot.metadata.fullPath
                        })
                        console.log({...values, image: snapshot.metadata.fullPath})
                    })
            },
            validate: (values) => {
                const errors = {};

                return errors;
            },
            validateOnBlur: false,
            validateOnChange: false,
            validateOnMount: false,
        }
    )

    return (
        <>
            <h3> {location.state.isLost ? 'Lost your buddy?' : 'Found your buddy?'} </h3>

            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div className={s.upperForm}>
                    <div className={s.left}>
                        <Select formik={formik} label={'type'}
                                options={['Dog', 'Cat', 'Bunny', 'Snake', 'Parrot', 'Other']}/>
                        <Select formik={formik} label={'sex'}
                                options={['Male', 'Female', 'Other']}/>
                        <Input formik={formik} label={'breed'} placeholder={'Golden Retriever'}/>
                        <Input formik={formik} label={'color'} placeholder={'Beige'}/>
                        <Select formik={formik} label={'height'}
                                options={['< 45 cm', '45-70 cm', '> 70 cm']}/>
                        <Textarea formik={formik} label={'distinctive_features'}
                                  placeholder={'blue collar with stars, no left ear, damaged tail.'}
                                  upTo={60}/>
                        <Textarea formik={formik} label={'description'}
                                  placeholder={'brown fox jumps over a lazy dog. DJs flock by when jhkjk jhgMTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.'}
                                  upTo={150}/>
                        <Textarea formik={formik} label={'location'}
                                  placeholder={'Florentin Street, Tel Aviv'}/>
                    </div>
                    <div className={s.right}>
                        <img src={LOST_FOUND} alt=""/>
                        <div>
                            {/*<DragDrop setFile={setImage}>*/}
                            {/*    <LostFoundFormDnD/>*/}
                            {/*</DragDrop>*/}
                            <label htmlFor="lf_image" style={{
                                backgroundColor: '#179be3',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                Select a file please
                                <input type="file" id={'lf_image'}
                                       style={{display: 'none'}}
                                       onChange={(e) => setImage(e.target.files[0])}/>
                            </label>
                            <div className={s.files}>
                                {image && [image].map((file, index) => (
                                    <div key={index} className={s.file}>
                                        <span>{file.name || '1. '}</span>
                                        <span className={s.cross} onClick={() => setImage(null)}>❌</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomForm}>
                    <label className={s.contacts}>Contacts: </label>
                    <div className={s.input}>
                        {formik.touched.phone && formik.errors.phone &&
                            <span className={s.error}> {formik.errors.phone} </span>}
                        <input
                            id={'phone'}
                            name={'phone'}
                            type="text"
                            placeholder={'Phone*'}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                    </div>
                    <div className={s.input}>
                        {formik.touched.email && formik.errors.email &&
                            <span className={s.error}> {formik.errors.email} </span>}
                        <input
                            id={'email'}
                            name={'email'}
                            type="text"
                            placeholder={'Email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div className={s.input}>
                        {formik.touched.facebook && formik.errors.facebook &&
                            <span className={s.error}> {formik.errors.facebook} </span>}
                        <input
                            id={'facebook'}
                            name={'facebook'}
                            type="text"
                            placeholder={'Facebook profile'}
                            onChange={formik.handleChange}
                            value={formik.values.facebook}
                        />
                    </div>
                </div>
                <div className={s.footer}>
                    <div>
                        <img src={LOST_FOUND} alt=""/>
                        <span>{'Anna Smith'}</span>
                    </div>
                    <button type={'submit'} className={'filledBtn'}> Publish</button>
                </div>
            </form>
        </>
    );
}

export default LostFoundForm;