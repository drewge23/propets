import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";
import Posts from "./Posts";

function Walking(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'walking'))

    return (
        <>
            <h3><b>Walking.</b> No time tonight? We have a solution!</h3>
            <Posts posts={posts}/>
        </>
    )
}

export default Walking;