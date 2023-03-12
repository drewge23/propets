import React from 'react';
import {Link} from "react-router-dom";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../firebaseConfig";
import Post from "./Post";

function Home(props) {
    const [posts] = useCollection(db.collection('posts'))

    return (
        <div>
            <h2>Home</h2>
            <Link to={'./newpost'}>
                <span style={{backgroundColor: 'lightblue', padding: 10}}>New post</span>
            </Link>
            {posts && posts.docs
                .filter(post => post.data().type === 'home')
                .map(post => (
                    <Post {...post.data()} key={post.id}/>
                )
             )}
        </div>
    );
}

export default Home;