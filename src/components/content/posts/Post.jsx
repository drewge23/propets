import React, {useState} from 'react';
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import s from "../post/post.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {getPostTime} from "../../../utils/constants";


function Post({createdAt, image, text, type, userId, userName, userPicUrl}) {
    const storage = getStorage();
    const imageRef = ref(storage, image);




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
                    {imageUrl && <img src={imageUrl} alt={'pic'}/>}
                    <p>{text}</p>
                    <button className={s.more}>...more</button>
                </div>
                <span className={s.menu}>•••</span>
                {/*<div className={s.settings}>*/}
                {/*    <button>*/}
                {/*        Hide from feed*/}
                {/*    </button>*/}
                {/*    <button>*/}
                {/*        Unfollow*/}
                {/*    </button>*/}
                {/*</div>*/}
                <button className={s.fav}>
                    <FontAwesomeIcon icon={faStar} />
                </button>
            </div>
    </>
    );
}

export default Post;