import React from 'react';
import {Link} from "react-router-dom";
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";

function Home(props) {
    const [posts] = useCollection(db.collection('posts').where('type', '==', 'home'))

    return (
        <>
            <Link to={'./newpost'}>
                <span style={{backgroundColor: 'lightblue', padding: 10}}>New post</span>
            </Link>
            <Posts title={''} posts={posts}/>
        </>
    )
}

export default Home;