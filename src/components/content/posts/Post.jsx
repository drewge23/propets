import React, {useState} from 'react';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import s from "./post.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import {faUserXmark, faX} from "@fortawesome/free-solid-svg-icons";
import {getPostTime, profilePhoto} from "../../../utils/constants";


function Post({createdAt, image, text, type, userId, userName, userPicUrl}) {
    const storage = getStorage();
    const imageRef = ref(storage, image);

    if (!userPicUrl) userPicUrl = profilePhoto

    const [openMenu, setOpenMenu] = useState(false)
    const [showFullText, setShowFullText] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
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
            <div className={s.post}>
                <img src={userPicUrl} alt={'avatar'} className={s.avatar}/>
                <div className={s.name}>
                    <h3>{userName}</h3>
                    <span className={s.time}>{getPostTime(createdAt)}</span>
                </div>
                <div className={s.main}>
                    {imageUrl && <img src={imageUrl} alt={'pic'} className={s.imageInPost}/>}
                    <p className={s.text} numberOfLines={2}>{text}</p>
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
                <button className={s.fav}>
                    <FontAwesomeIcon icon={faStar} />
                </button>
            </div>
    </>
    );
}

export default Post;