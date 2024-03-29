import React, {useEffect, useState} from 'react';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Link} from "react-router-dom";
import {db} from "../../../firebaseConfig";
import s from './lostFoundPost.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapMarker, faPencil, faPhone, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {copyToBuffer, getPostTime, USER_PICTURE_PLACEHOLDER} from "../../../utils/constants";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons";

function LostFoundPost({post, postId, editable, deleteActivity, deactivated}) {
    const storage = getStorage();
    const imageRef = ref(storage, post.image);

    const [imageUrl, setImageUrl] = useState(null)
    useEffect(() => {
        if (!post.image || !storage || !imageRef) return
        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url)
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
    }, [storage, imageRef])

    const [userInfo, setUserInfo] = useState(null)
    db.collection('users').doc(post.userId).get()
        .then(doc => setUserInfo({
            photoUrl: doc.data().photoUrl,
            displayName: doc.data().displayName,
        }))

    return (
        <div className={s.lostFoundPost} style={{opacity: deactivated ? 0.5 : 1}}>
            {imageUrl && <img src={imageUrl} alt=""/>}
            <div className={s.right}>
                <div className={s.header}>
                    <h3>{post.type + (post.breed ? ', ' + post.breed : '')}</h3>
                    {editable && <div>
                        <Link to={'/content/lost&foundform'}
                              state={{
                                  isLost: post.status === 'lost',
                                  postInfo: post,
                                  postId,
                              }}
                        >
                            <button type={'button'}>
                                <FontAwesomeIcon icon={faPencil}/>
                            </button>
                        </Link>
                        <button onClick={() => deleteActivity(postId)} type={'button'}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>}
                </div>
                <div className={s.features}>
                    <div className={s.colorSexHeight}>
                        <p><span className={s.label}>Color: </span><span className={s.text}>{post.color || '—'}</span></p>
                        <p><span className={s.label}>Sex: </span><span className={s.text}>{post.sex}</span></p>
                        <p><span className={s.label}>Height: </span><span className={s.text}>{post.height}</span></p>
                    </div>
                    <div>
                        <p>
                            <span className={s.label}>Distinctive features: </span>
                            <span className={s.text}>{post.distinctive_features || '—'}</span>
                        </p>
                    </div>
                </div>
                <div>
                    <p><span className={s.label}>Description: </span><span className={s.text}>{post.description || '—'}</span>
                    </p>
                </div>
                <div>
                    <hr/>
                    <p>
                        <span className={s.label}><FontAwesomeIcon icon={faMapMarker}/></span>
                        <span className={s.text}>{post.location || 'Unknown'}</span>
                    </p>
                </div>
                <div className={s.userInfo}>
                    <div className={s.avatarName}>
                        <img src={userInfo?.photoUrl || USER_PICTURE_PLACEHOLDER} alt=''/>
                        <div>
                            <p className={s.name}>{userInfo?.displayName}</p>
                            <p className={s.date}>{getPostTime(post.createdAt)}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => copyToBuffer(post.phone)} type={'button'}>
                            <FontAwesomeIcon icon={faPhone}/>
                        </button>
                        <button onClick={() => copyToBuffer(post.facebook)} type={'button'}>
                            <FontAwesomeIcon icon={faFacebookSquare}/>
                        </button>
                        <button onClick={() => copyToBuffer(post.email)} type={'button'}>
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </button>
                    </div>
                </div>
                {/*<p>{post.status}</p>*/}
            </div>
        </div>
    );
}

export default LostFoundPost;