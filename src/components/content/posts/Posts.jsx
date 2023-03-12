import React from 'react';
import Post from "./Post";

function Posts({posts, title, type}) {
    return (
        <div>
            <h2>{title}</h2>
            {posts && posts.docs
                // .filter(post => post.data().type === 'home')
                .map(post => (
                        <Post {...post.data()} key={post.id}/>
                    )
                )}
        </div>
    );
}

export default Posts;