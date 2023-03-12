import React from 'react';
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Favorites(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'home'))

    return (
        <Posts title={''} posts={posts}/>
    )
}

export default Favorites;