import React, {useEffect, useState} from 'react';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Link} from "react-router-dom";

function LostFoundPost({post, postId, editable, deleteActivity}) {
    const storage = getStorage();
    const imageRef = ref(storage, post.image);

    const [imageUrl, setImageUrl] = useState(null)
    useEffect(() => {
        if (!storage || !imageRef) return
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

    return (
        <div style={{marginBottom: '2rem'}}>
            <p>{post.breed}</p>
            <p>{post.color}</p>
            <p>{post.description}</p>
            <p>{post.distinctive_features}</p>
            <p>{post.email}</p>
            <p>{post.facebook}</p>
            <p>{post.height}</p>
            <p>{post.location}</p>
            <p>{post.phone}</p>
            <p>{post.sex}</p>
            <p>{post.status}</p>
            <p>{post.userId}</p>
            {imageUrl && <img src={imageUrl} alt=""/>}

            {editable && <div>
                <Link to={'/content/lost&foundform'}
                    state={{
                        isLost: post.status === 'lost',
                        postInfo: post,
                        postId,
                    }}
                >
                    <button>Edit</button>
                </Link>
                <p></p>
                <button onClick={() => deleteActivity(postId)}>Delete</button>
            </div>}
        </div>
    );
}

export default LostFoundPost;