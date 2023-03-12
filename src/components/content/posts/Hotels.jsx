import React from 'react';
import {Link} from "react-router-dom";
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Hotels(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'hotels'))

    return (
        <Posts title={'Hotels'} posts={posts}/>
    )
}

export default Hotels;