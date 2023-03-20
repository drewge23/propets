import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";
import LostFoundPost from "../LostFound/LostFoundPost";
import {doc, deleteDoc} from "firebase/firestore";

function Activities(props) {
    const [activities] = useCollection(db.collection('lost_and_found')
        .where('userId', '==', auth.currentUser.uid))

    const deleteActivity = (postId) => {
        deleteDoc(doc(db, 'lost_and_found', postId))
    }

    return (
        <div>
            <h2>Activities</h2>
            {activities && activities.docs.map(post => (
                <div key={post.id}>
                    <h3>{new Date(post.data().createdAt.seconds).toString()}</h3>
                    <LostFoundPost post={post.data()}
                                   postId={post.id}
                                   editable
                                   deleteActivity={deleteActivity}/>
                </div>
            ))}
        </div>
    );
}

export default Activities;