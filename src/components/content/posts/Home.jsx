import React from 'react';
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Home(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'home'))

    return (
        <Posts title={''} posts={posts}/>
    )
}

export default Home;