import React from 'react';
import Post from "./Post";

function Posts({posts, type}) {
    return (
        <div>
            {posts && posts.docs
                .sort((a, b) => b.data().createdAt.seconds - a.data().createdAt.seconds)
                .map(post => (
                        <Post {...post.data()} key={post.id} postId={post.id}/>
                    )
                )}
        </div>
    );
}

export default Posts;