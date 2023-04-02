import React, {useEffect, useState} from 'react';
import Posts from "./Posts";
import {useCollection, useDocument} from "react-firebase-hooks/firestore";
import {auth, db} from "../../../firebaseConfig";

function Home() {
    const [posts, loading] = useCollection(db.collection('posts').where('type', '==', 'home'))

    return (
        <>
            {
                loading
                    ? <p>Paw...Paw...</p>
                    : posts.docs.length
                        ? <Posts title={''} posts={posts}/>
                        : <p>No posts</p>
            }
        </>
    )
}

export default Home;