import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";
import LostFoundPost from "./LostFoundPost";
import {useLocation} from "react-router";

function LostFound(props) {
    const location = useLocation()
    const lastParam = function () {
        let tempArr = location.pathname.split('/')
        return tempArr[tempArr.length - 1]
    }()

    const [posts] = useCollection(
        db.collection('lost_and_found').where('status', '==', lastParam)
    )

    return (
        <div>
            <h2>Lost and Found</h2>
            {posts && posts.docs.map(post => <LostFoundPost post={post.data()}
                                                            postId={post.id}
                                                            key={post.id}/>)}
        </div>
    );
}

export default LostFound;