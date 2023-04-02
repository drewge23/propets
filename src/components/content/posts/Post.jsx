import React, {useEffect, useState} from 'react';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import s from "./post.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import {faUserXmark, faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import {getPostTime, profilePhoto} from "../../../utils/constants";
import {auth, db} from "../../../firebaseConfig";
import {collection, doc, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {useDocument, useDocumentData} from "react-firebase-hooks/firestore";

function Post({createdAt, image, text, type, userId, userName, userPicUrl, postId}) {
    const storage = getStorage();
    const imageRef = ref(storage, image);

    if (!userPicUrl) userPicUrl = profilePhoto

    const [openMenu, setOpenMenu] = useState(false)
    const [showFullText, setShowFullText] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const currentUserId = auth.currentUser.uid
    const [currentUsersSubs] = useDocument(db.collection('subscriptions').doc(currentUserId))

    const fav = currentUsersSubs && currentUsersSubs.data()?.favorites.includes(postId)

    const [userInfo] = useDocumentData(db.collection('users').doc(userId))

    const updateFavorites = () => {
        console.log(postId)
        const favPostId = postId
        const usersSubsRef = db.collection('subscriptions').doc(currentUserId)
        const subsRef = collection(db, 'subscriptions')

        console.log(currentUsersSubs)
        if (currentUsersSubs.exists()) {
            if (fav) {
                updateDoc(usersSubsRef, {
                    'favorites': arrayRemove(favPostId)
                })
            } else {
                updateDoc(usersSubsRef, {
                    'favorites': arrayUnion(favPostId)
                })
            }
        } else {
            console.log({
                'favorites': [favPostId],
                'userId': currentUserId,
            })
            setDoc(doc(subsRef, currentUserId), {
                'favorites': [favPostId],
                'userId': currentUserId,
            }, {merge: true})
                .then(() => alert('Post added'))
        }
    }

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

    return (
        <>
            <div className={s.post} key={postId}>
                {userInfo &&
                    <>
                        <img src={userInfo?.photoUrl || userPicUrl} alt={'avatar'} className={s.avatar}/>
                        <div className={s.name}>
                            <h3>{userInfo?.displayName || userName}</h3>
                            <span className={s.time}>{getPostTime(createdAt)}</span>
                        </div>
                    </>
                }
                <div className={s.main}>
                    {imageUrl && <img src={imageUrl} alt={''} className={s.imageInPost}/>}
                    <p className={s.text}>{text}</p>
                    {showFullText && <span className={s.more}>...more</span>}
                </div>
                <span className={s.menu} onClick={() => {
                    setOpenMenu(!openMenu)
                }}>•••</span>
                {openMenu && <div className={s.settings}>
                    <button>
                        <FontAwesomeIcon icon={faEyeSlash}/> Hide from feed
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faUserXmark}/> Unfollow
                    </button>
                </div>}
                <div className={s.favField}>
                    <button className={s.fav} onClick={updateFavorites}
                            style={{color: fav ? '#84B6A3' : '#BABABA'}}>
                        <FontAwesomeIcon icon={fav ? fullStar : faStar}/>
                    </button>
                </div>

            </div>
        </>
    );
}

export default Post;