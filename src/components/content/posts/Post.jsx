import React, {useEffect, useState} from 'react';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import s from "./post.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import {faUserXmark, faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import {getPostTime, profilePhoto} from "../../../utils/constants";
import {auth, db} from "../../../firebaseConfig";
import {setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {useDocument} from "react-firebase-hooks/firestore";

function Post({createdAt, image, text, type, userId, userName, userPicUrl, postId}) {
    const storage = getStorage();
    const imageRef = ref(storage, image);

    if (!userPicUrl) userPicUrl = profilePhoto

    const [openMenu, setOpenMenu] = useState(false)
    const [showFullText, setShowFullText] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const currentUserId = auth.currentUser.uid
    const [currentUsersSubs] = useDocument(db.collection('subscriptions').doc(currentUserId))

    const fav = currentUsersSubs && currentUsersSubs.data().favorites.includes(postId)

    const updateFavorites = () =>{
        const favPostId = postId
        const usersSubsRef = db.collection('subscriptions').doc(currentUserId)

        if (currentUsersSubs){
            if (fav){
                updateDoc(usersSubsRef,{
                    'favorites' : arrayRemove(favPostId)
                })
            }
            else{
                updateDoc(usersSubsRef,{
                    'favorites' : arrayUnion(favPostId)
                })
            }
        }
        else{
            setDoc(currentUsersSubs, {
                'favorites' : [favPostId],
                'userId' : currentUserId,
            }, {merge: true})
                .then(alert('post added'))
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
                <img src={userPicUrl} alt={'avatar'} className={s.avatar}/>
                <div className={s.name}>
                    <h3>{userName}</h3>
                    <span className={s.time}>{getPostTime(createdAt)}</span>
                </div>
                <div className={s.main}>
                    {imageUrl && <img src={imageUrl} alt={'pic'} className={s.imageInPost}/>}
                    <p className={s.text}>{text}</p>
                    {showFullText && <span className={s.more}>...more</span>}
                </div>
                <span className={s.menu} onClick={()=>{setOpenMenu(!openMenu)}}>•••</span>
                { openMenu && <div className={s.settings}>
                    <button>
                        <FontAwesomeIcon icon={faEyeSlash}/> Hide from feed
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faUserXmark}/> Unfollow
                    </button>
                </div>}
                <button className={s.fav} onClick={updateFavorites}
                        style={{color: fav ? '#84B6A3' : '#BABABA' }}>
                     <FontAwesomeIcon icon={fav ? fullStar : faStar} />
                </button>
            </div>
        </>
    );
}

export default Post;