import React from 'react';
import {Link} from "react-router-dom";
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Hotels(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'hotels'))

    return (
        <>
            <h3><b>Hotels.</b> Go to vacations — we’ll take care of your pet!</h3>
            <Posts posts={posts}/>
        </>
    )
}

export default Hotels;