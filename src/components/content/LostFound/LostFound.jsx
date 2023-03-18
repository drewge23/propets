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
    const [posts] = useCollection(db.collection('lost_and_found').where('status', '==', lastParam))

    console.log(posts?.docs[0]?.data() || '')

    return (
        <div>
            <h2>Lost and Found</h2>
            {posts && posts.docs.map(post => <LostFoundPost {...post.data()} key={post.id}/>)}
        </div>
    );
}

export default LostFound;