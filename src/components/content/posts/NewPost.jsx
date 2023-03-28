import React, {useState} from 'react';
import {db} from "../../../firebaseConfig";
import {useSelector} from "react-redux";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {nanoid} from "@reduxjs/toolkit";
import {useNavigate} from "react-router";
import s from './newPost.module.css'
import formStyle from '../LostFound/lostFoundForm/lostFoundForm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faPaw} from "@fortawesome/free-solid-svg-icons";

function NewPost(props) {
    const [image, setImage] = useState(null)
    const [text, setText] = useState('')
    const user = useSelector(state => state.user)

    const storage = getStorage();
    const postImageRef = ref(storage, `posts/image_${nanoid()}`);

    const navigate = useNavigate()
    const createNewPost = () => {
        if (!user) {
            alert('Please login')
            return
        }

        uploadBytes(postImageRef, image)
            .then((snapshot) => {
                db.collection('posts').add({
                    createdAt: new Date(),
                    image: snapshot.metadata.fullPath,
                    text,
                    type: 'home',
                    userId: user.userId,
                    userName: user.displayName,
                    userPicUrl: user.photoUrl,
                })
            })
            .then(() => {
                alert('Post created!')
                navigate('/content/home')
            })
            .catch((e) => alert(e.message()))
    }

    return (
        <div className={s.newPost}>
            <h3 className={s.title}><b>Your new post!</b> Simply add text, photo, and publish!</h3>
            <div className='shadow'>
                <div className={s.text}>
                    <div className={s.labelContainer}>
                        <label>Text: </label>
                        <span>up to 1500 char</span>
                    </div>
                    <textarea value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ' +
                                  '\n\nWhy do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). ' +
                                  '\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'}
                    />
                </div>

                <div className={s.photo}>
                    <label htmlFor="lf_image" className={formStyle.download}>
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                        <input type="file" id={'lf_image'}
                               style={{display: 'none'}}
                               onChange={(e) => setImage(e.target.files[0])}/>
                    </label>
                    <p>Upload a photo</p>
                    <div className={formStyle.files}>
                        {image && [image].map((file, index) => (
                            <div key={index} className={formStyle.file}>
                                <span>{file.name || '1. '}</span>
                                <span className={s.cross} onClick={() => setImage(null)}>❌</span>
                            </div>
                        ))}
                    </div>
                    <span className={s.publishButton} onClick={createNewPost}>
                        <FontAwesomeIcon icon={faPaw}/> Publish
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NewPost;