import React, {useState} from 'react';
import DragDrop from "../../../utils/DragDrop";
import {db} from "../../../firebaseConfig";
import {useSelector} from "react-redux";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {nanoid} from "@reduxjs/toolkit";

function NewPost(props) {
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')
    const user = useSelector(state => state.user)

    const storage = getStorage();
    const postImageRef = ref(storage, `posts/image_${nanoid()}`);

    const createNewPost = () => {
        if (!user) {
            alert('Please login')
            return
        }

        uploadBytes(postImageRef, file)
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
            .then(() => alert('Post created!'))
            .catch((e) => alert(e.message()))
    }

    return (
        <div>
            <h2>Your new post! Simply add text, photo, and publish!</h2>
            <label>Text: </label>
            <span>up to 1500 char</span>
            <textarea value={text}
                      onChange={(e) => setText(e.target.value)}
            />
            <p>Photo:</p>
            <DragDrop setFile={setFile}/>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={createNewPost}>Done!</button>
        </div>
    );
}

export default NewPost;