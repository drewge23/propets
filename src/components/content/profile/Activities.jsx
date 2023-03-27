import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";
import LostFoundPost from "../LostFound/LostFoundPost";
import {doc, deleteDoc} from "firebase/firestore";
import {Link} from "react-router-dom";

const DEACTIVATION_TIME = 1000 * 60 * 60 * 24 * 10

function Activities(props) {
    const [activities] = useCollection(db.collection('lost_and_found')
        .where('userId', '==', auth.currentUser.uid))

    const deleteActivity = (postId) => {
        deleteDoc(doc(db, 'lost_and_found', postId))
    }

    const deactivationCheck = (createdAtMs) => {
        return Date.now() - createdAtMs > DEACTIVATION_TIME
            ? new Date(createdAtMs + DEACTIVATION_TIME)
            : null
    }

    return (
        <div>
            {!activities && <h3>You don't have any activities yet</h3>}
            {activities && activities.docs
                .sort((a, b) => b.data().createdAt.seconds - a.data().createdAt.seconds)
                .map(post => {
                const createdAtMs = post.data().createdAt.seconds * 1000
                const deactivationDate = deactivationCheck(createdAtMs)
                return (
                    <div key={post.id}>
                        {deactivationDate
                            && <>
                                <p>Post was deactivated on {deactivationDate.toString()}</p>
                                <Link to={'/content/lost&foundform'}
                                      state={{
                                          isLost: post.data().status === 'lost',
                                          postInfo: post.data(),
                                          postId: post.id,
                                      }}
                                >
                                    <button>Reactivate</button>
                                </Link>
                            </>}

                        <LostFoundPost post={post.data()}
                                       postId={post.id}
                                       editable
                                       deleteActivity={deleteActivity}/>
                    </div>
                )
            })}
        </div>
    );
}

export default Activities;