import React from 'react';
import {Link} from "react-router-dom";
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Fostering(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'fostering'))

    return (
        <Posts title={'Fostering'} posts={posts}/>
    )
}

export default Fostering;