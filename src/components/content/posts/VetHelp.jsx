import React from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";
import Posts from "./Posts";

function VetHelp(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'vethelp'))

    return (
        <>
            <h3><b>VetHelp.</b> They deserve it</h3>
            <Posts posts={posts}/>
        </>
    )
}

export default VetHelp;