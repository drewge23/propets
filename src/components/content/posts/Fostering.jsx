import React from 'react';
import {Link} from "react-router-dom";
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Fostering(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'fostering'))

    return (
        <>
            <h3><b>Fostering.</b> In adoption we trust</h3>
            <Posts posts={posts}/>
        </>
    )
}

export default Fostering;