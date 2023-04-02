import React, {useEffect, useState} from 'react';
import {auth, db} from "../../../firebaseConfig";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {useDocument, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, doc, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import {faUserXmark, faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import s from "./post.module.css";
import {getPostTime, profilePhoto} from "../../../utils/constants";

function Post({createdAt, image, text, type, userId, userName, userPicUrl, postId}) {
    const storage = getStorage();
    const imageRef = ref(storage, image);

    if (!userPicUrl) userPicUrl = profilePhoto

    const [openMenu, setOpenMenu] = useState(false)
    const [displayedText, setDisplayedText] = useState('')
    const [showFullText, setShowFullText] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const currentUserId = auth.currentUser.uid
    const [currentUsersSubs] = useDocument(db.collection('subscriptions').doc(currentUserId))
    const [userInfo] = useDocumentData(db.collection('users').doc(userId))

    const smallText = text?.slice(0,200)
    useEffect(()=>{
        if (text && text.length > smallText.length){
            setDisplayedText(smallText)
        }
        else {
            setDisplayedText(text)
        }
    }, [text])

    const showMore = () => {
        if(!showFullText){
            setDisplayedText(text)
        }
        else{
            setDisplayedText(smallText)
        }
        setShowFullText(!showFullText)
    }

    const fav = currentUsersSubs && currentUsersSubs.data()?.favorites?.includes(postId)
    const updateFavorites = () => {
        const favPostId = postId
        const usersSubsRef = db.collection('subscriptions').doc(currentUserId)
        const subsRef = collection(db, 'subscriptions')

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
            setDoc(doc(subsRef, currentUserId), {
                'favorites': [favPostId],
                'userId': currentUserId,
            }, {merge: true})
                .then(() => alert('Post added'))
        }
    }

    const hide = currentUsersSubs && currentUsersSubs.data()?.hidden?.includes(postId)
    const updateHidden = () => {
        const hidePostId = postId
        const usersSubsRef = db.collection('subscriptions').doc(currentUserId)
        const subsRef = collection(db, 'subscriptions')

        if (currentUsersSubs.exists()) {
            if (hide) {
                updateDoc(usersSubsRef, {
                    'hidden': arrayRemove(hidePostId)
                })
            } else {
                updateDoc(usersSubsRef, {
                    'hidden': arrayUnion(hidePostId)
                })
            }
        } else {
            setDoc(doc(subsRef, currentUserId), {
                'hidden': [hidePostId],
                'userId': currentUserId,
            }, {merge: true})
                .then(() => alert('Subscriptions updated!'))
        }
    }

    const unfollowed = currentUsersSubs && currentUsersSubs.data()?.unfollowed?.includes(userId)
    const updateUnfollowed = () => {
        const unfollowUserId = userId
        const usersSubsRef = db.collection('subscriptions').doc(currentUserId)
        const subsRef = collection(db, 'subscriptions')

        if (currentUsersSubs.exists()) {
            if (unfollowed) {
                updateDoc(usersSubsRef, {
                    'unfollowed': arrayRemove(unfollowUserId)
                })
            } else {
                updateDoc(usersSubsRef, {
                    'unfollowed': arrayUnion(unfollowUserId)
                })
            }
        } else {
            setDoc(doc(subsRef, currentUserId), {
                'unfollowed': [unfollowUserId],
                'userId': currentUserId,
            }, {merge: true})
                .then(() => alert('Subscriptions updated!'))
        }
    }

    if (image) {
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
    }

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
                    <p className={s.text}>{displayedText}
                    {
                        text.length <= smallText.length
                            ? <span style={{display: 'none'}}>...more</span>
                            : text.length > displayedText.length
                                ? <span className={s.more} onClick={showMore}> ...more</span>
                                : <span className={s.more} onClick={showMore}> ...hide</span>
                    }
                    </p>
                </div>
                <span className={s.menu} onClick={() => {
                    setOpenMenu(!openMenu)
                }}>•••</span>
                {openMenu && <div className={s.settings}>
                    <button onClick={updateHidden}>
                        <FontAwesomeIcon icon={faEyeSlash}/> Hide from feed
                    </button>
                    <button onClick={updateUnfollowed}>
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