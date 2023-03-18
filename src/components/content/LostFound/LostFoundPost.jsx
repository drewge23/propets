import React, {useState} from 'react';
import {getDownloadURL, getStorage, ref} from "firebase/storage";

function LostFoundPost({
                           breed, color, description, distinctive_features,
                           email, facebook, height, image, location, phone,
                           sex, status
                       }) {

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
        <div>
            <p>{breed}</p>
            <p>{color}</p>
            <p>{description}</p>
            <p>{distinctive_features}</p>
            <p>{email}</p>
            <p>{facebook}</p>
            <p>{height}</p>
            <p>{location}</p>
            <p>{phone}</p>
            <p>{sex}</p>
            <p>{status}</p>
            {imageUrl && <img src={imageUrl} alt=""/>}
        </div>
    );
}

export default LostFoundPost;