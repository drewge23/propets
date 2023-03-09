import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {useFormik} from "formik";
import s from './lostFound.module.css'
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import DragDrop from "../../../utils/DragDrop";
import LostFoundDnD from "./LostFoundDnD";

import LOST_FOUND from '../../../images/lostFound.png'

function LostFound() {
    const location = useLocation()
    const [files, setFiles] = useState()
    const [filesArray, setFilesArray] = useState([])
    useEffect(() => {
        if (!files) return
        let temp = []
        for (let file of files) {
            temp.push(file)
        }
        setFilesArray([...filesArray, ...temp])
    }, [files])
    const spliceArray = (index) => {
        let temp = [...filesArray]
        temp.splice(index, 1)
        setFilesArray(temp)
    }

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
                type: "",
            },
            onSubmit: (values) => {
                console.log({...values, images: filesArray})
            },
            validate: (values) => {
                const errors = {};

                return errors;
            },
            validateOnBlur: false,
            validateOnChange: false,
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
                            <DragDrop setFile={setFiles}>
                                <LostFoundDnD/>
                            </DragDrop>
                            <div className={s.files}>
                                {filesArray.map((file, index) => (
                                    <div key={index} className={s.file}>
                                        <span>{file.name}</span>
                                        <span className={s.cross} onClick={() => spliceArray(index)}>❌</span>
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

export default LostFound;