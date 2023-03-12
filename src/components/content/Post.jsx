import React, {useState} from 'react';
import {getStorage, ref, getDownloadURL} from "firebase/storage";

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
        <div style={{margin: 50}}>
            <p>{createdAt.toString()}</p>
            <p>{image}</p>
            {imageUrl && <img src={imageUrl} alt={'pic'}/>}
            <p>{text}</p>
            <p>{type}</p>
            <p>{userId}</p>
            <p>{userName}</p>
            <p>{userPicUrl}</p>
        </div>
    );
}

export default Post;