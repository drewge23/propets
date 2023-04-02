import React from 'react';
import Posts from "./Posts";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../../firebaseConfig";
import Loading from "../../Loading";

function Home() {
    const [posts, loading] = useCollection(db.collection('posts').where('type', '==', 'home'))

    return (
        <>
            {
                loading
                    ? <Loading />
                    : posts.docs.length
                        ? <Posts title={''} posts={posts}/>
                        : <p>No posts</p>
            }
        </>
    )
}

export default Home;